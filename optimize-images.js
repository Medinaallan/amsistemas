const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDirectory = 'images';
const outputDirectory = 'images/optimized';

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
}

// Configuración de optimización
const optimizationConfig = {
    jpeg: {
        quality: 80,
        progressive: true
    },
    png: {
        quality: 80,
        compressionLevel: 9
    },
    webp: {
        quality: 80
    }
};

// Función para optimizar una imagen
async function optimizeImage(inputPath, outputPath, format) {
    try {
        const image = sharp(inputPath);
        
        // Obtener metadatos de la imagen
        const metadata = await image.metadata();
        
        // Redimensionar si es necesario (mantener proporción)
        if (metadata.width > 1920) {
            image.resize(1920, null, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }
        
        // Aplicar optimizaciones según el formato
        switch (format) {
            case 'jpeg':
                await image
                    .jpeg(optimizationConfig.jpeg)
                    .toFile(outputPath);
                break;
            case 'png':
                await image
                    .png(optimizationConfig.png)
                    .toFile(outputPath);
                break;
            case 'webp':
                await image
                    .webp(optimizationConfig.webp)
                    .toFile(outputPath);
                break;
        }
        
        console.log(`✓ Optimizada: ${path.basename(inputPath)}`);
    } catch (error) {
        console.error(`✗ Error optimizando ${path.basename(inputPath)}:`, error);
    }
}

// Función principal
async function optimizeImages() {
    const files = fs.readdirSync(imageDirectory);
    
    for (const file of files) {
        const inputPath = path.join(imageDirectory, file);
        const ext = path.extname(file).toLowerCase();
        
        // Solo procesar archivos de imagen
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
        
        const filename = path.basename(file, ext);
        
        // Optimizar en formato original
        await optimizeImage(
            inputPath,
            path.join(outputDirectory, `${filename}${ext}`),
            ext === '.png' ? 'png' : 'jpeg'
        );
        
        // Crear versión WebP
        await optimizeImage(
            inputPath,
            path.join(outputDirectory, `${filename}.webp`),
            'webp'
        );
    }
}

// Ejecutar optimización
console.log('Iniciando optimización de imágenes...');
optimizeImages().then(() => {
    console.log('Optimización completada.');
}).catch(error => {
    console.error('Error durante la optimización:', error);
}); 