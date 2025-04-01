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
        this.canvas.id = 'network-background';
        document.querySelector('.hero-section').prepend(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.deviceOrientation = { x: 0, y: 0 };
        
        this.init();
        this.handleEvents();
        this.animate();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    handleEvents() {
        window.addEventListener('resize', () => this.resize());
        
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        window.addEventListener('deviceorientation', (e) => {
            if (e.beta && e.gamma) {
                this.deviceOrientation = {
                    x: e.gamma / 45,
                    y: e.beta / 45
                };
            }
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Actualizar y dibujar partículas
        this.particles.forEach(particle => {
            // Movimiento suave
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Influencia del mouse
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const force = (200 - distance) / 200;
                particle.x -= dx * force * 0.02;
                particle.y -= dy * force * 0.02;
            }

            // Influencia de la orientación del dispositivo
            if (window.innerWidth <= 768) {
                particle.x += this.deviceOrientation.x * 0.5;
                particle.y += this.deviceOrientation.y * 0.5;
            }

            // Rebote suave en los bordes
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -0.8;
                particle.x = Math.max(0, Math.min(particle.x, this.canvas.width));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -0.8;
                particle.y = Math.max(0, Math.min(particle.y, this.canvas.height));
            }

            // Dibujar partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();

            // Dibujar conexiones
            this.particles.forEach(otherParticle => {
                if (particle === otherParticle) return;

                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.2;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
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
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar mensaje de carga
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Mostrar mensaje de éxito
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    form.reset();
                } else {
                    throw new Error('Error al enviar el mensaje');
                }
            })
            .catch(error => {
                // Mostrar mensaje de error
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            })
            .finally(() => {
                // Restaurar el botón
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
});

// Botón Volver Arriba
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animación suave para los enlaces del menú
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

// Efecto de hover en las tarjetas de productos
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Efecto de hover en las miniaturas de la galería
document.querySelectorAll('.gallery-thumbs .thumb').forEach(thumb => {
    thumb.addEventListener('mouseenter', () => {
        thumb.style.transform = 'scale(1.05)';
        thumb.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    });
    
    thumb.addEventListener('mouseleave', () => {
        thumb.style.transform = 'scale(1)';
        thumb.style.boxShadow = 'none';
    });
});

// Efecto de hover en los enlaces sociales
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px)';
        link.style.color = 'var(--primary-color)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
        link.style.color = '';
    });
});
