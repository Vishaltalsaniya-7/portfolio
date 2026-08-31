// ===========================
// SMOOTH SCROLLING & NAVIGATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
});

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll(
        '.skill-category, .voip-card, .project-card, .timeline-item, .stat, .devops-card, .learning-card, .expertise-card'
    );
    
    elements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// ===========================
// NAVBAR SCROLL EFFECTS
// ===========================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===========================
// SKILL TAG INTERACTIONS
// ===========================

const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===========================
// PROJECT CARD INTERACTIONS
// ===========================

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const badge = this.querySelector('.project-badge');
        if (badge) {
            badge.style.transform = 'translateY(-5px)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const badge = this.querySelector('.project-badge');
        if (badge) {
            badge.style.transform = 'translateY(0)';
        }
    });
});

// ===========================
// SMOOTH ANCHOR LINKS
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// ACTIVE SECTION HIGHLIGHTING
// ===========================

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===========================
// PARALLAX EFFECT
// ===========================

const hero = document.querySelector('.hero');
window.addEventListener('scroll', function() {
    if (hero) {
        const scrollTop = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollTop * 0.5}px`;
    }
});

// ===========================
// COUNTER ANIMATION FOR STATS
// ===========================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || 0;
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

const statElements = document.querySelectorAll('.stat-number');
statElements.forEach(stat => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Uncomment to enable counter animation
            // animateCounter(stat);
            observer.unobserve(stat);
        }
    });
    observer.observe(stat);
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// ===========================
// FORM INTERACTIONS (for future use)
// ===========================

const contactLinks = document.querySelectorAll('.contact-card');
contactLinks.forEach(card => {
    card.addEventListener('click', function(e) {
        if (this.getAttribute('href')) {
            // Let the browser handle mailto and external links
            return;
        }
        e.preventDefault();
    });
});

// ===========================
// TOOLTIP FUNCTIONALITY
// ===========================

document.addEventListener('mouseover', function(e) {
    if (e.target.hasAttribute('data-tooltip')) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = e.target.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.85rem;
            z-index: 1000;
            pointer-events: none;
        `;
        
        e.target.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.bottom = rect.height + 10 + 'px';
    }
});

document.addEventListener('mouseout', function(e) {
    const tooltip = e.target.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
});

// ===========================
// PERFORMANCE MONITORING
// ===========================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log('Page Load Time:', loadTime, 'ms');
        }, 0);
    });
}

// ===========================
// ACCESSIBILITY ENHANCEMENTS
// ===========================

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// Focus management
const focusableElements = document.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
);

focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #2563eb';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===========================
// PRELOAD OPTIMIZATION
// ===========================

// Preload critical resources
window.addEventListener('load', function() {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(function() {
            // Lazy load images if needed
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (!img.src && img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        });
    }
});

// ===========================
// LOGGING & DEBUGGING
// ===========================

// Enable detailed logging only in development
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';

function log(...args) {
    if (isDevelopment) {
        console.log('[Portfolio]', ...args);
    }
}

log('Portfolio loaded successfully');
log('User Agent:', navigator.userAgent);
log('Page dimensions:', window.innerWidth, 'x', window.innerHeight);
