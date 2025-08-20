// Inicialización avanzada de AOS (Animate On Scroll) con configuración detallada
AOS.init({
    duration: 1400,
    once: true,
    offset: 100,
    easing: 'ease-in-out-cubic',
    mirror: false,
    anchorPlacement: 'top-bottom'
});

// Navbar scroll effect con animación y ocultamiento inteligente (más elaborado)
const navbar = document.getElementById('header');
let lastScroll = 0;
let scrollTimeout = null;
let ticking = false;

function updateNavbar() {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled', 'hidden');
        ticking = false;
        return;
    }

    if (currentScroll > lastScroll) {
        navbar.classList.add('scrolled', 'hidden');
    } else {
        navbar.classList.remove('hidden');
        navbar.classList.add('scrolled');
    }

    lastScroll = currentScroll;
    ticking = false;

    // Ocultar navbar tras 2s sin scroll
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (window.pageYOffset > 100) {
            navbar.classList.add('hidden');
        }
    }, 2000);
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// Smooth scroll avanzado para enlaces internos con enfoque y animación extra
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            target.classList.add('highlight-scroll');
            setTimeout(() => target.classList.remove('highlight-scroll'), 1200);
            target.focus({ preventScroll: true });
        }
    }, { passive: false });
});

// Formulario de contacto con validación avanzada y feedback visual
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Debounce para validación en tiempo real
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const validateField = debounce((field) => {
        if (field.required && !field.value.trim()) {
            field.classList.add('input-error');
            field.setAttribute('aria-invalid', 'true');
        } else {
            field.classList.remove('input-error');
            field.setAttribute('aria-invalid', 'false');
        }
    }, 300);

    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => validateField(field), { passive: true });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let valid = true;
        const fields = contactForm.querySelectorAll('input, textarea');
        fields.forEach(field => {
            if (field.required && !field.value.trim()) {
                field.classList.add('input-error');
                field.setAttribute('aria-invalid', 'true');
                valid = false;
            } else {
                field.classList.remove('input-error');
                field.setAttribute('aria-invalid', 'false');
            }
        });

        if (!valid) {
            showNotification('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }

        const formData = new FormData(contactForm);

        try {
            await new Promise(res => setTimeout(res, 1000));
            showNotification('¡Mensaje enviado con éxito!', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Error al enviar el mensaje. Por favor, intente nuevamente.', 'error');
        }
    });
}

// Sistema de notificaciones mejorado con iconos y animaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✔️' : '❌'}</span>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 400);
    }, 3500);
}

// Carrusel de clientes con animación de contador y transición personalizada
const carousel = document.getElementById('carouselClientes');
if (carousel) {
    const counter = carousel.querySelector('.carousel-counter');
    const totalSlides = carousel.querySelectorAll('.carousel-item').length;

    carousel.addEventListener('slide.bs.carousel', function(e) {
        counter.textContent = `${e.to + 1}/${totalSlides}`;
        counter.classList.add('counter-animate');
        setTimeout(() => counter.classList.remove('counter-animate'), 500);
    });

    new bootstrap.Carousel(carousel, {
        interval: 4000,
        pause: 'hover',
        wrap: true,
        touch: true,
        ride: false
    });
}

// Inicialización avanzada de tooltips y popovers (optimizado)
document.addEventListener('DOMContentLoaded', () => {
    const tooltipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-tooltip-initialized')) {
                new bootstrap.Tooltip(entry.target, { 
                    boundary: 'window', 
                    delay: { show: 200, hide: 100 } 
                });
                entry.target.setAttribute('data-tooltip-initialized', 'true');
                tooltipObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '50px' });

    const popoverObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-popover-initialized')) {
                new bootstrap.Popover(entry.target, { 
                    trigger: 'hover', 
                    placement: 'top' 
                });
                entry.target.setAttribute('data-popover-initialized', 'true');
                popoverObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '50px' });

    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => tooltipObserver.observe(el));
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => popoverObserver.observe(el));
});

// Actualizar contadores de carrusel en modales con animación
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.modal .carousel').forEach(carousel => {
        const counter = carousel.querySelector('.carousel-counter');
        const totalSlides = carousel.querySelectorAll('.carousel-item').length;

        carousel.addEventListener('slide.bs.carousel', function(e) {
            counter.textContent = `${e.to + 1}/${totalSlides}`;
            counter.classList.add('counter-animate');
            setTimeout(() => counter.classList.remove('counter-animate'), 500);
        });
    });
});

// Función para actualizar el contador del carrusel con animación
function updateCarouselCounter(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const activeSlide = carousel.querySelector('.carousel-item.active');
    const slides = carousel.querySelectorAll('.carousel-item');
    const currentIndex = Array.from(slides).indexOf(activeSlide) + 1;
    const counter = carousel.querySelector('.carousel-counter');
    if (counter) {
        counter.textContent = `${currentIndex}/${slides.length}`;
        counter.classList.add('counter-animate');
        setTimeout(() => counter.classList.remove('counter-animate'), 500);
    }
}

// Inicialización avanzada de carruseles de productos
document.addEventListener('DOMContentLoaded', function() {
    [
        { id: 'carouselFacturacion', total: 3 },
        { id: 'carouselIT', total: 3 },
        { id: 'carouselAsesoria', total: 3 }
    ].forEach(({ id, total }) => {
        const carouselEl = document.getElementById(id);
        if (carouselEl) {
            new bootstrap.Carousel(carouselEl, {
                interval: 3500,
                pause: 'hover',
                wrap: true,
                touch: true
            });
            carouselEl.addEventListener('slide.bs.carousel', function(e) {
                const counter = this.querySelector('.carousel-counter');
                counter.textContent = `${e.to + 1}/${total}`;
                counter.classList.add('counter-animate');
                setTimeout(() => counter.classList.remove('counter-animate'), 500);
            });
        }
    });
});

// Red interactiva en el fondo con color dinámico y partículas responsivas (más elaborado, menos cantidad)
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
        this.color = [255, 255, 255];
        this.animationId = null;
        this.isVisible = true;

        // Throttle para eventos de mouse y orientación
        this.throttledMouseMove = this.throttle(this.handleMouseMove.bind(this), 16);
        this.throttledResize = this.throttle(this.resize.bind(this), 250);

        this.init();
        this.handleEvents();
        this.animate();
        this.setupVisibilityOptimization();
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    setupVisibilityOptimization() {
        // Pausar animación cuando no es visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
                if (!this.isVisible) {
                    cancelAnimationFrame(this.animationId);
                } else {
                    this.animate();
                }
            });
        });
        observer.observe(this.canvas);
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles = [];
        this.createParticles();
    }

    createParticles() {
        // Optimización: Reducir partículas para mejor rendimiento
        const isMobile = window.innerWidth <= 768;
        const baseCount = isMobile ? 20 : 50; // Reducido de 40:120 a 20:50
        const particleCount = baseCount;

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2.5 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.6 + 0.3
            });
        }
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        // Cambia el color de la red según la posición del mouse
        this.color = [
            200 + Math.floor(55 * (e.clientX / window.innerWidth)),
            200 + Math.floor(55 * (e.clientY / window.innerHeight)),
            255
        ];
    }

    handleEvents() {
        window.addEventListener('resize', this.throttledResize, { passive: true });
        window.addEventListener('mousemove', this.throttledMouseMove, { passive: true });

        window.addEventListener('deviceorientation', (e) => {
            if (e.beta && e.gamma) {
                this.deviceOrientation = {
                    x: e.gamma / 45,
                    y: e.beta / 45
                };
            }
        }, { passive: true });
    }

    animate() {
        if (!this.isVisible) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Loop para partículas y conexiones
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];

            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Influencia del mouse
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared < 32400) { // 180^2
                const distance = Math.sqrt(distanceSquared);
                const force = (180 - distance) / 180;
                particle.x -= dx * force * 0.03;
                particle.y -= dy * force * 0.03;
            }

            // Influencia de la orientación del dispositivo
            if (window.innerWidth <= 768) {
                particle.x += this.deviceOrientation.x * 0.7;
                particle.y += this.deviceOrientation.y * 0.7;
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
            this.ctx.fillStyle = `rgba(${this.color.join(',')},${particle.opacity})`;
            this.ctx.shadowColor = `rgba(${this.color.join(',')},0.5)`;
            this.ctx.shadowBlur = 8;
            this.ctx.fill();

            // Dibujar conexiones (optimizado para evitar duplicados)
            for (let j = i + 1; j < this.particles.length; j++) {
                const otherParticle = this.particles[j];
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distanceSquared = dx * dx + dy * dy;

                if (distanceSquared < 14400) { // 120^2
                    const distance = Math.sqrt(distanceSquared);
                    const opacity = (1 - distance / 120) * 0.25;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(${this.color.join(',')},${opacity})`;
                    this.ctx.lineWidth = 1.2;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            }
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// Inicializar la red cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    new NetworkBackground();
});

// Función para cambiar la imagen principal en la galería con transición
function changeMainImage(mainId, newSrc) {
    const mainImage = document.getElementById(mainId);
    const placeholder = document.getElementById(mainId.replace('Main', 'Placeholder'));

    // Precargar imagen para evitar parpadeo
    const img = new Image();
    img.onload = () => {
        mainImage.classList.add('fade-out');
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.style.display = 'block';
            if (placeholder) placeholder.style.display = 'none';
            mainImage.classList.remove('fade-out');
            mainImage.classList.add('fade-in');
            setTimeout(() => mainImage.classList.remove('fade-in'), 600);
        }, 300);

        // Actualizar las miniaturas activas
        const gallery = mainImage.closest('.product-gallery');
        if (gallery) {
            const thumbs = gallery.querySelectorAll('.thumb');
            thumbs.forEach(thumb => {
                thumb.classList.toggle('active', thumb.src === newSrc);
            });
        }
    };
    img.src = newSrc;
}

// Manejo avanzado de mensajes del formulario de contacto con SweetAlert
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
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
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
            .catch(() => {
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
});

// Botón Volver Arriba con animación y accesibilidad (optimizado)
const backToTopButton = document.getElementById('backToTop');
let backToTopTicking = false;

function updateBackToTop() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
        backToTopButton.setAttribute('aria-hidden', 'false');
    } else {
        backToTopButton.classList.remove('visible');
        backToTopButton.setAttribute('aria-hidden', 'true');
    }
    backToTopTicking = false;
}

window.addEventListener('scroll', () => {
    if (!backToTopTicking) {
        requestAnimationFrame(updateBackToTop);
        backToTopTicking = true;
    }
}, { passive: true });

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    backToTopButton.blur();
});

// Animación suave para los enlaces del menú (evita duplicidad)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            target.classList.add('highlight-scroll');
            setTimeout(() => target.classList.remove('highlight-scroll'), 1200);
            target.focus({ preventScroll: true });
        }
    }, { passive: false });
});

// Efectos de hover optimizados con delegación de eventos
document.addEventListener('DOMContentLoaded', () => {
    // Efecto de hover en las tarjetas de productos con animación y color
    document.addEventListener('mouseenter', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('card')) {
            e.target.style.transform = 'translateY(-8px) scale(1.03)';
            e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
            e.target.classList.add('card-hovered');
        }
    }, true);

    document.addEventListener('mouseleave', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('card')) {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = 'none';
            e.target.classList.remove('card-hovered');
        }
    }, true);

    // Efecto de hover en las miniaturas de la galería con animación
    document.addEventListener('mouseenter', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('thumb') && e.target.closest('.gallery-thumbs')) {
            e.target.style.transform = 'scale(1.08)';
            e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.13)';
            e.target.classList.add('thumb-hovered');
        }
    }, true);

    document.addEventListener('mouseleave', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('thumb') && e.target.closest('.gallery-thumbs')) {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
            e.target.classList.remove('thumb-hovered');
        }
    }, true);

    // Efecto de hover en los enlaces sociales con animación y color
    document.addEventListener('mouseenter', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('social-link')) {
            e.target.style.transform = 'translateY(-4px) scale(1.07)';
            e.target.style.color = 'var(--primary-color)';
            e.target.classList.add('social-hovered');
        }
    }, true);

    document.addEventListener('mouseleave', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('social-link')) {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.color = '';
            e.target.classList.remove('social-hovered');
        }
    }, true);
});

// Accesibilidad: permite navegación con teclado en la galería y carruseles (optimizada)
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel);
            if (bsCarousel && carousel.matches(':focus-within, :hover')) {
                if (e.key === 'ArrowLeft') bsCarousel.prev();
                if (e.key === 'ArrowRight') bsCarousel.next();
                e.preventDefault();
            }
        });
    }
}, { passive: false });

// Contador animado para las estadísticas
class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('.counter[data-target]');
        this.hasAnimated = false;
        this.init();
    }

    init() {
        // Crear observer para detectar cuando la sección entra en vista
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animateCounters();
                }
            });
        }, {
            threshold: 0.3 // Se activa cuando 30% de la sección es visible
        });

        // Observar la sección de estadísticas
        const statsSection = document.getElementById('estadisticas');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateCounters() {
        this.counters.forEach(counter => {
            this.animateCounter(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000; // Duración de 2 segundos
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Función de easing para animación suave
            const easedProgress = this.easeOutQuart(progress);
            const currentValue = Math.floor(easedProgress * target);
            
            element.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Asegurar que muestre el valor final exacto
                element.textContent = target + suffix;
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // Función de easing para una animación más natural
    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
}

// Inicializar contador animado cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    new AnimatedCounter();
});

// --- Seguimiento de eventos para Google Analytics y notificaciones ---
// Throttle simple para evitar notificaciones repetidas en sucesos muy cercanos
const _eventTimestamps = {};
function _canSendEvent(key, cooldown = 3000) {
    const now = Date.now();
    if (!_eventTimestamps[key] || (now - _eventTimestamps[key]) > cooldown) {
        _eventTimestamps[key] = now;
        return true;
    }
    return false;
}

function sendGtagEvent(action, category = 'interaction', label = '') {
    try {
        if (typeof gtag === 'function') {
            gtag('event', action, { event_category: category, event_label: label });
        } else if (window.dataLayer && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({ event: action, event_category: category, event_label: label });
        }
    } catch (err) {
        // silencioso: analytics no disponible o bloqueado
        // console.debug('gtag send error', err);
    }
}

// Evento: interacción con cualquier galería de producto
document.addEventListener('click', function (e) {
    const gallery = e.target.closest('.product-gallery');
    if (!gallery) return;

    const key = 'gallery_click_' + (gallery.dataset.galleryName || 'generic');
    if (!_canSendEvent(key, 2000)) return;

    const label = gallery.dataset.galleryName || gallery.id || 'product-gallery';
    sendGtagEvent('gallery_click', 'gallery', label);
    showNotification('Interacción con galería registrada', 'success');
}, true);

// Evento: foco en inputs de tipo texto (formularios)
document.addEventListener('focusin', function (e) {
    const tgt = e.target;
    if (!tgt) return;
    if (tgt.tagName === 'INPUT' && (tgt.type === 'text' || tgt.type === 'email' || tgt.type === 'tel' || tgt.type === 'search')) {
        const label = tgt.name || tgt.id || tgt.placeholder || 'input-text';
        const key = 'input_focus_' + label;
        if (!_canSendEvent(key, 1500)) return;

        sendGtagEvent('form_input_focus', 'form', label);
        showNotification(`Campo enfocado: ${label}`, 'success');
    }
}, true);

// --- Fin de tracking enhancements ---
