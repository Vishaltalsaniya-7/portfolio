// ============================================
// VISHAL TALSANIYA | PORTFOLIO INTERACTIONS
// ============================================

// Smooth scroll behavior for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 60;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section, .project-card, .voip-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
        navbar.style.borderBottomColor = 'rgba(45, 55, 72, 0.8)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
        navbar.style.borderBottomColor = 'rgba(45, 55, 72, 0.4)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary)';
        }
    });
});

// Typewriter effect for hero subtitle (optional enhancement)
const typewriterElement = document.querySelector('.hero-subtitle');
if (typewriterElement) {
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    let index = 0;
    
    const typewriter = () => {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typewriter, 50);
        }
    };
    
    // Start after a delay
    setTimeout(typewriter, 500);
}

// Click handler for CTA buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Performance: Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Highlight code blocks if any
document.querySelectorAll('code').forEach(code => {
    code.style.fontFamily = 'var(--font-mono)';
    code.style.backgroundColor = 'rgba(0, 212, 255, 0.1)';
    code.style.padding = '2px 6px';
    code.style.borderRadius = '4px';
    code.style.color = 'var(--primary)';
});

// Log custom message
console.log('%c👋 Welcome to Vishal Talsaniya\'s Portfolio', 'font-size: 16px; color: #00d4ff; font-weight: bold;');
console.log('%cBuilt with ❤️ | Expertise: Backend Development & VoIP Infrastructure', 'font-size: 12px; color: #bdc3c7;');
