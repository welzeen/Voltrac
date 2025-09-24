/**
 * VOLTRAC LANDING PAGE JAVASCRIPT
 * Created: 2025
 * Description: Interactive features and animations for Voltrac landing page
 */

// =================================================================
// DOM CONTENT LOADED EVENT
// =================================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏐 Voltrac Landing Page Loaded Successfully!');
    
    // Initialize all functions
    initLoadingAnimation();
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarScrollEffect();
    initFormHandling();
    initHeroFloatingAnimation();
});

// =================================================================
// LOADING ANIMATION
// =================================================================
function initLoadingAnimation() {
    window.addEventListener('load', function() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.classList.add('hide');
                // Remove loading element from DOM after animation
                setTimeout(() => {
                    loading.remove();
                }, 500);
            }, 1500);
        }
    });
}

// =================================================================
// SMOOTH SCROLLING
// =================================================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =================================================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// =================================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add stagger effect for multiple elements
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    // Observe all fade-in-up elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
}

// =================================================================
// NAVBAR SCROLL EFFECT
// =================================================================
function initNavbarScrollEffect() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;
        
        if (!navbar) return;
        
        // Change navbar background based on scroll
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// =================================================================
// FORM HANDLING
// =================================================================
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                nama: document.getElementById('nama').value.trim(),
                email: document.getElementById('email').value.trim(),
                subjek: document.getElementById('subjek').value,
                pesan: document.getElementById('pesan').value.trim()
            };
            
            // Validation
            if (!validateForm(formData)) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Mengirim...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form submission logic)
            setTimeout(() => {
                // Show success message
                showNotification('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// =================================================================
// FORM VALIDATION
// =================================================================
function validateForm(data) {
    // Check required fields
    if (!data.nama) {
        showNotification('Nama lengkap harus diisi!', 'error');
        return false;
    }
    
    if (!data.email) {
        showNotification('Email/WhatsApp harus diisi!', 'error');
        return false;
    }
    
    if (!data.pesan) {
        showNotification('Pesan harus diisi!', 'error');
        return false;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(\+62|62|0)[0-9]{9,13}$/;
    
    if (!emailPattern.test(data.email) && !phonePattern.test(data.email)) {
        showNotification('Format email atau nomor WhatsApp tidak valid!', 'error');
        return false;
    }
    
    return true;
}

// =================================================================
// NOTIFICATION SYSTEM
// =================================================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 10000; max-width: 400px;';
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// =================================================================
// HERO FLOATING ANIMATION
// =================================================================
function initHeroFloatingAnimation() {
    let animationId;
    
    function animate() {
        const heroElements = document.querySelectorAll('.hero h1, .hero .lead');
        const time = Date.now() * 0.001;
        
        heroElements.forEach((el, index) => {
            const offset = Math.sin(time + index * 0.5) * 3;
            el.style.transform = `translateY(${offset}px)`;
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Pause animation when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// =================================================================
// LAZY LOADING IMAGES
// =================================================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// =================================================================
// PERFORMANCE MONITORING
// =================================================================
function monitorPerformance() {
    // Monitor loading time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`🚀 Page loaded in ${Math.round(loadTime)}ms`);
        
        // Send to analytics (replace with your analytics service)
        // analytics.track('page_load_time', { duration: loadTime });
    });
}

// =================================================================
// ERROR HANDLING
// =================================================================
window.addEventListener('error', function(event) {
    console.error('🚨 JavaScript Error:', event.error);
    // You can send this to your error tracking service
});

// =================================================================
// UTILITY FUNCTIONS
// =================================================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// =================================================================
// INITIALIZE PERFORMANCE MONITORING
// =================================================================
monitorPerformance();