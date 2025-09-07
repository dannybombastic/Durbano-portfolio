// Modern Portfolio JavaScript - Daniel Urbano

/*==== DOM LOADED ====*/
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

/*==== MAIN INITIALIZATION ====*/
function initializePortfolio() {
    // Initialize all components
    initMobileMenu();
    initScrollEffects();
    initTypedText();
    initScrollReveal();
    initSmoothScrolling();
    initParallaxEffects();
    initAnimationOnScroll();
    initThemeToggle();
    initContactForm();
    initLoadingAnimation();
}

/*==== MOBILE MENU TOGGLE ====*/
function initMobileMenu() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function() {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking navbar link
        navbar.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

/*==== SCROLL EFFECTS ====*/
function initScrollEffects() {
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Sticky header with enhanced effects
        if (header) {
            if (scrollY > 100) {
                header.classList.add('sticky');
                header.style.background = 'rgba(26, 32, 44, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.classList.remove('sticky');
                header.style.background = 'rgba(26, 32, 44, 0.95)';
                header.style.boxShadow = 'none';
            }
        }

        // Active section highlighting
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const targetLink = document.querySelector(`.navbar a[href*="${id}"]`);
                    if (targetLink) {
                        targetLink.classList.add('active');
                    }
                });
            }
        });

        // Close mobile menu on scroll
        if (menuIcon && navbar) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
            document.body.classList.remove('menu-open');
        }

        // Floating elements parallax
        updateFloatingElements(scrollY);
    });
}

/*==== FLOATING ELEMENTS PARALLAX ====*/
function updateFloatingElements(scrollY) {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px) translateX(${Math.sin(scrollY * 0.01 + index) * 10}px)`;
    });
}

/*==== TYPED TEXT ANIMATION ====*/
function initTypedText() {
    const multipleTextElement = document.querySelector('.multiple-text');
    
    if (multipleTextElement && typeof Typed !== 'undefined') {
        new Typed('.multiple-text', {
            strings: [
                'DevOps Engineer',
                'Cloud Architect', 
                'CI/CD Specialist',
                'Infrastructure Automation Expert',
                'DevSecOps Developer',
                'Site Reliability Engineer'
            ],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }
}

/*==== SCROLL REVEAL ANIMATIONS ====*/
function initScrollReveal() {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '100px',
            duration: 2000,
            delay: 200,
            reset: false,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });

        // Hero section animations
        sr.reveal('.hero-text', { 
            origin: 'left',
            delay: 300,
            duration: 1000
        });
        
        sr.reveal('.hero-visual', { 
            origin: 'right',
            delay: 500,
            duration: 1000,
            distance: '0px',
            reset: false
        });

        // Section headers
        sr.reveal('.section-header', { 
            origin: 'top',
            delay: 200
        });

        // About section
        sr.reveal('.about-image', { 
            origin: 'left',
            delay: 300
        });
        
        sr.reveal('.about-text', { 
            origin: 'right',
            delay: 400
        });

        // Cards and grids
        sr.reveal('.expertise-card', { 
            origin: 'bottom',
            interval: 200
        });
        
        sr.reveal('.service-card', { 
            origin: 'bottom',
            interval: 250
        });
        
        sr.reveal('.portfolio-item', { 
            origin: 'bottom',
            interval: 200
        });

        // Contact section
        sr.reveal('.contact-card', { 
            origin: 'left',
            interval: 200
        });
        
        sr.reveal('.contact-visual', { 
            origin: 'right',
            delay: 400
        });

        // Stats animation
        sr.reveal('.stat-item', { 
            origin: 'bottom',
            interval: 100
        });
    }
}

/*==== SMOOTH SCROLLING ====*/
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/*==== PARALLAX EFFECTS ====*/
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/*==== ANIMATION ON SCROLL ====*/
function initAnimationOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate stats numbers
                if (entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }
                
                // Animate progress bars
                if (entry.target.classList.contains('progress-bar')) {
                    animateProgressBar(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.stat-number, .progress-bar, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/*==== ANIMATE NUMBERS ====*/
function animateNumber(element) {
    const finalNumber = parseInt(element.textContent);
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / finalNumber));
    
    let current = 0;
    const increment = finalNumber > stepTime ? finalNumber / stepTime : 1;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= finalNumber) {
            element.textContent = finalNumber;
            clearInterval(timer);
        }
    }, stepTime);
}

/*==== ANIMATE PROGRESS BARS ====*/
function animateProgressBar(element) {
    const width = element.dataset.width || '0%';
    element.style.width = '0%';
    
    setTimeout(() => {
        element.style.width = width;
    }, 200);
}

/*==== THEME TOGGLE ====*/
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            
            // Save preference
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Update icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = isLight ? 'bx bx-moon' : 'bx bx-sun';
            }
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            const icon = themeToggle.querySelector('i');
            if (icon) icon.className = 'bx bx-moon';
        }
    }
}

/*==== CONTACT FORM ====*/
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

/*==== SHOW NOTIFICATION ====*/
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/*==== LOADING ANIMATION ====*/
function initLoadingAnimation() {
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
        // Trigger entrance animations
        document.body.classList.add('loaded');
    });
}

/*==== UTILITY FUNCTIONS ====*/

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
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
    };
}

/*==== MODAL FUNCTIONALITY ====*/
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Close modal with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

/*==== PERFORMANCE OPTIMIZATIONS ====*/

// Optimize scroll events
const optimizedScrollHandler = throttle(function() {
    // Scroll-dependent code here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Optimize resize events
const optimizedResizeHandler = debounce(function() {
    // Resize-dependent code here
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

/*==== COOKIES MANAGEMENT ====*/
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;SameSite=Strict`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Set portfolio visit cookie
setCookie('portfolio_visit', 'true', 30);

/*==== ACCESSIBILITY ENHANCEMENTS ====*/

// Focus management for better keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// High contrast mode detection
if (window.matchMedia('(prefers-contrast: high)').matches) {
    document.body.classList.add('high-contrast');
}

// Reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
}

/*==== CONSOLE BRANDING ====*/
console.log('%c🚀 Welcome to Daniel Urbano\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cLike what you see? Let\'s connect!', 'color: #00f2fe; font-size: 14px;');
console.log('%c🔗 LinkedIn: https://www.linkedin.com/in/daniel-u-665a004b/', 'color: #f5576c; font-size: 12px;');

/*==== CHAT FUNCTIONALITY ====*/
function startChat() {
    const chatMessages = [
        "¡Hola! 👋 Me alegra que quieras conectar conmigo",
        "",
        "Puedes comunicarte conmigo através de:",
        "",
        "📧 Email: dannybombastic@gmail.com",
        "💼 LinkedIn: www.linkedin.com/in/daniel-u-665a004b", 
        "💻 GitHub: github.com/dannybombastic",
        "📱 Teléfono: +34 123 456 789",
        "",
        "¡Espero tener noticias tuyas pronto! 🚀"
    ];
    
    const message = chatMessages.join('\n');
    
    // Create custom modal for chat
    const modal = document.createElement('div');
    modal.className = 'chat-modal';
    modal.innerHTML = `
        <div class="chat-modal-content">
            <div class="chat-header">
                <h3>💬 Conectemos</h3>
                <button class="chat-close" onclick="closeChatModal()">&times;</button>
            </div>
            <div class="chat-body">
                <div class="chat-message">
                    ${chatMessages.map(line => line ? `<p>${line}</p>` : '<br>').join('')}
                </div>
                <div class="chat-actions">
                    <a href="mailto:dannybombastic@gmail.com" class="chat-btn email">
                        <i class='bx bx-envelope'></i> Email
                    </a>
                    <a href="https://www.linkedin.com/in/daniel-u-665a004b/" target="_blank" class="chat-btn linkedin">
                        <i class='bx bxl-linkedin'></i> LinkedIn
                    </a>
                    <a href="https://github.com/dannybombastic" target="_blank" class="chat-btn github">
                        <i class='bx bxl-github'></i> GitHub
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles for chat modal
    if (!document.querySelector('#chat-modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'chat-modal-styles';
        styles.textContent = `
            .chat-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                transition: all 0.3s ease;
            }
            .chat-modal.show {
                opacity: 1;
            }
            .chat-modal-content {
                background: linear-gradient(145deg, #1a202c, #2d3748);
                border-radius: 20px;
                padding: 0;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow: hidden;
                border: 2px solid rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                transform: scale(0.7) translateY(50px);
                transition: all 0.3s ease;
            }
            .chat-modal.show .chat-modal-content {
                transform: scale(1) translateY(0);
            }
            .chat-header {
                background: linear-gradient(135deg, #667eea, #764ba2);
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: white;
            }
            .chat-header h3 {
                margin: 0;
                font-size: 1.5rem;
            }
            .chat-close {
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            .chat-close:hover {
                transform: rotate(90deg);
            }
            .chat-body {
                padding: 30px;
                color: #e2e8f0;
            }
            .chat-message p {
                margin: 0.5rem 0;
                line-height: 1.6;
            }
            .chat-actions {
                display: flex;
                gap: 15px;
                margin-top: 25px;
                flex-wrap: wrap;
            }
            .chat-btn {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 12px 20px;
                border-radius: 10px;
                text-decoration: none;
                color: white;
                font-weight: 500;
                transition: all 0.3s ease;
                min-width: 120px;
            }
            .chat-btn.email {
                background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
            }
            .chat-btn.linkedin {
                background: linear-gradient(135deg, #0077b5, #00a0dc);
            }
            .chat-btn.github {
                background: linear-gradient(135deg, #333, #555);
            }
            .chat-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
            }
            @media (max-width: 768px) {
                .chat-actions {
                    flex-direction: column;
                }
                .chat-btn {
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeChatModal() {
    const modal = document.querySelector('.chat-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('chat-modal')) {
        closeChatModal();
    }
});