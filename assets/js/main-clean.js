/**
 * CAD Foundation Website - Main JavaScript
 * Clean, modern, and responsive functionality
 */

class CADWebsite {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.initializeAnimations();
            });
        } else {
            this.setupEventListeners();
            this.initializeAnimations();
        }
    }

    setupEventListeners() {
        // Navbar scroll effect
        this.setupNavbarScroll();
        
        // Active navigation links
        this.setupActiveNavigation();
        
        // Smooth scrolling
        this.setupSmoothScroll();
        
        // Mobile menu handling
        this.setupMobileMenu();
        
        // Video player
        this.setupVideoPlayer();
        
        // Counter animations
        this.setupCounterAnimations();
    }

    setupNavbarScroll() {
        const navbar = document.getElementById('mainNavbar');
        let ticking = false;

        const updateNavbar = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    setupActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        let ticking = false;

        const updateActiveLink = () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateActiveLink);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });
    }

    setupMobileMenu() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }

    setupVideoPlayer() {
        window.loadVideo = () => {
            const container = document.getElementById('videoContainer');
            if (!container) return;

            // Replace with your actual YouTube video ID
            const videoId = 'dQw4w9WgXcQ'; // Placeholder - replace with actual video
            const videoUrl = `https://www.youtube.com/embed/${videoId}`;
            
            container.innerHTML = `
                <iframe 
                    src="${videoUrl}?autoplay=1&rel=0&modestbranding=1&playsinline=1" 
                    title="CAD Foundation - Cardiology at Doorsteps"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    loading="lazy">
                </iframe>
            `;

            // Add loading state
            container.style.opacity = '0.8';
            setTimeout(() => {
                container.style.opacity = '1';
            }, 500);
        };
    }

    setupCounterAnimations() {
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            let step = 0;
            
            const timer = setInterval(() => {
                step++;
                current = Math.min(current + increment, target);
                
                // Format the number display
                if (target >= 10000000) {
                    counter.textContent = (current / 10000000).toFixed(1) + ' Cr+';
                } else if (target >= 1000) {
                    counter.textContent = Math.floor(current).toLocaleString() + '+';
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
                
                if (step >= steps || current >= target) {
                    // Final formatting
                    if (target >= 10000000) {
                        counter.textContent = '1.0 Cr+';
                    } else {
                        counter.textContent = target.toLocaleString() + '+';
                    }
                    clearInterval(timer);
                }
            }, duration / steps);
        };

        // Use Intersection Observer for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach((counter, index) => {
                        setTimeout(() => {
                            animateCounter(counter);
                        }, index * 200); // Stagger the animations
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    initializeAnimations() {
        // Initialize AOS if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                delay: 0,
                disable: function() {
                    return window.innerWidth < 768; // Disable on mobile for performance
                }
            });
        }

        // Add entrance animations for hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s ease-out';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    // Utility methods
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
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
        };
    }
}

// Initialize the website functionality
new CADWebsite();

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CADWebsite;
}
