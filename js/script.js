// Inicialización de AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Navbar scroll effect
const navbar = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scrolled')) {
        navbar.classList.add('scrolled');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scrolled')) {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Aquí iría la lógica para enviar el formulario
            // Por ahora solo mostraremos un mensaje de éxito
            showNotification('¡Mensaje enviado con éxito!', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Error al enviar el mensaje. Por favor, intente nuevamente.', 'error');
        }
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Optimización del carrusel de clientes
const carousel = document.getElementById('carouselClientes');
if (carousel) {
    const counter = carousel.querySelector('.carousel-counter');
    const totalSlides = carousel.querySelectorAll('.carousel-item').length;
    
    carousel.addEventListener('slide.bs.carousel', function(e) {
        const currentSlide = e.to + 1;
        counter.textContent = `${currentSlide}/${totalSlides}`;
    });

    new bootstrap.Carousel(carousel, {
        interval: 5000,
        pause: 'hover',
        wrap: true
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Actualizar contadores de carrusel en modales
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.modal .carousel');
    
    carousels.forEach(carousel => {
        const counter = carousel.querySelector('.carousel-counter');
        const totalSlides = carousel.querySelectorAll('.carousel-item').length;
        
        carousel.addEventListener('slide.bs.carousel', function(e) {
            const currentSlide = e.to + 1;
            counter.textContent = `${currentSlide}/${totalSlides}`;
        });
    });
});

// Función para actualizar el contador del carrusel
function updateCarouselCounter(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const activeSlide = carousel.querySelector('.carousel-item.active');
    const slides = carousel.querySelectorAll('.carousel-item');
    const currentIndex = Array.from(slides).indexOf(activeSlide) + 1;
    const counter = carousel.querySelector('.carousel-counter');
    if (counter) {
        counter.textContent = `${currentIndex}/${slides.length}`;
    }
}

// Inicialización de los carruseles de productos
document.addEventListener('DOMContentLoaded', function() {
    // Carrusel de Facturación
    const carouselFacturacion = document.getElementById('carouselFacturacion');
    if (carouselFacturacion) {
        const carousel = new bootstrap.Carousel(carouselFacturacion, {
            interval: 3000,
            pause: 'hover',
            wrap: true
        });
        
        carouselFacturacion.addEventListener('slide.bs.carousel', function(e) {
            const counter = this.querySelector('.carousel-counter');
            counter.textContent = `${e.to + 1}/3`;
        });
    }

    // Carrusel de IT
    const carouselIT = document.getElementById('carouselIT');
    if (carouselIT) {
        const carousel = new bootstrap.Carousel(carouselIT, {
            interval: 3000,
            pause: 'hover',
            wrap: true
        });
        
        carouselIT.addEventListener('slide.bs.carousel', function(e) {
            const counter = this.querySelector('.carousel-counter');
            counter.textContent = `${e.to + 1}/3`;
        });
    }

    // Carrusel de Cámaras de Seguridad
    const carouselAsesoria = document.getElementById('carouselAsesoria');
    if (carouselAsesoria) {
        const carousel = new bootstrap.Carousel(carouselAsesoria, {
            interval: 3000,
            pause: 'hover',
            wrap: true
        });
        
        carouselAsesoria.addEventListener('slide.bs.carousel', function(e) {
            const counter = this.querySelector('.carousel-counter');
            counter.textContent = `${e.to + 1}/3`;
        });
    }
});

// Red interactiva en el fondo
class NetworkBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.deviceOrientation = { x: 0, y: 0 };
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        const container = document.getElementById('network-background');
        container.appendChild(this.canvas);
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 10000);
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25
            });
        }
    }

    setupEventListeners() {
        // Eventos del mouse
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Eventos de orientación del dispositivo
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                this.deviceOrientation.x = e.beta || 0;
                this.deviceOrientation.y = e.gamma || 0;
            });
        }

        // Evento de redimensionamiento
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Actualizar y dibujar partículas
        this.particles.forEach(particle => {
            // Mover partícula
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Rebote en los bordes
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            // Influencia del mouse/giroscopio
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                particle.speedX -= Math.cos(angle) * 0.1;
                particle.speedY -= Math.sin(angle) * 0.1;
            }

            // Influencia del giroscopio en móviles
            if (window.DeviceOrientationEvent) {
                particle.speedX += this.deviceOrientation.y * 0.01;
                particle.speedY += this.deviceOrientation.x * 0.01;
            }

            // Dibujar partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fill();
        });

        // Dibujar conexiones
        this.particles.forEach((particle1, i) => {
            this.particles.slice(i + 1).forEach(particle2 => {
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance/150)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle1.x, particle1.y);
                    this.ctx.lineTo(particle2.x, particle2.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar la red cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    new NetworkBackground();
});

// Función para cambiar la imagen principal en la galería
function changeMainImage(mainId, newSrc) {
    // Obtener la imagen principal y el placeholder
    const mainImage = document.getElementById(mainId);
    const placeholder = document.getElementById(mainId.replace('Main', 'Placeholder'));
    
    // Cambiar la imagen principal
    mainImage.src = newSrc;
    mainImage.style.display = 'block';
    placeholder.style.display = 'none';
    
    // Actualizar las miniaturas activas
    const thumbs = mainImage.closest('.product-gallery').querySelectorAll('.thumb');
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === newSrc) {
            thumb.classList.add('active');
        }
    });
}

// Manejo de mensajes del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'success') {
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
    } else if (status === 'error') {
        alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
    }
});
