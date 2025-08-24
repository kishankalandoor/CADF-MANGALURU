// Awwwards-inspired JavaScript for CAD Foundation

// YouTube Player instance
let youtubePlayer;
let isVideoPlaying = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoadingScreen();
    initializeNavigation();
    initializeEnhancedNavigation(); // Add enhanced navbar
    initializeCleanNavigation(); // Add clean navigation
    initializeCursor();
    initializeScrollAnimations();
    initializeFormHandling();
    initializePageTransitions();
    initializeCounterAnimations();
});

// YouTube API Ready
function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('hero-youtube-player', {
        videoId: 'oZSL-m1dU54', // Extract video ID from URL
        playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: 'oZSL-m1dU54',
            controls: 0,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
    
    // Initialize video play button
    const playBtn = document.getElementById('video-play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', toggleVideoSound);
    }
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        event.target.playVideo();
    }
}

function toggleVideoSound() {
    // Open fullscreen video popup instead of just unmuting
    openVideoPopup();
}

function openVideoPopup() {
    // Create fullscreen video popup
    const popup = document.createElement('div');
    popup.className = 'video-popup';
    popup.innerHTML = `
        <div class="video-popup-overlay"></div>
        <div class="video-popup-container">
            <button class="video-popup-close" aria-label="Close video">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="video-popup-content">
                <div id="popup-youtube-player"></div>
            </div>
            <div class="video-popup-info">
                <h3>CAD Foundation - Our Story</h3>
                <p>Building a cardiac disease free society by helping the underprivileged</p>
            </div>
        </div>
    `;
    
    // Add popup styles
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    // Add CSS for popup elements
    const style = document.createElement('style');
    style.textContent = `
        .video-popup {
            backdrop-filter: blur(20px);
        }
        
        .video-popup-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
        }
        
        .video-popup-container {
            position: relative;
            width: 90%;
            max-width: 1200px;
            background: rgba(20, 20, 20, 0.95);
            border-radius: 20px;
            padding: 40px;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }
        
        .video-popup-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 10001;
        }
        
        .video-popup-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
        
        .video-popup-content {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            border-radius: 12px;
            overflow: hidden;
            background: #000;
        }
        
        #popup-youtube-player {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .video-popup-info {
            text-align: center;
            margin-top: 30px;
            color: white;
        }
        
        .video-popup-info h3 {
            font-family: var(--font-display);
            font-size: 2rem;
            margin-bottom: 12px;
            background: linear-gradient(45deg, #00d4aa, #0066cc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .video-popup-info p {
            font-size: 1.1rem;
            opacity: 0.8;
            line-height: 1.6;
        }
        
        @media (max-width: 768px) {
            .video-popup-container {
                width: 95%;
                padding: 20px;
                margin: 20px;
            }
            
            .video-popup-info h3 {
                font-size: 1.5rem;
            }
            
            .video-popup-info p {
                font-size: 1rem;
            }
            
            .video-popup-close {
                width: 40px;
                height: 40px;
                top: 15px;
                right: 15px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(popup);
    document.body.style.overflow = 'hidden';
    
    // Animate popup in
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.visibility = 'visible';
    }, 50);
    
    // Initialize YouTube player in popup
    const popupPlayer = new YT.Player('popup-youtube-player', {
        videoId: 'oZSL-m1dU54',
        playerVars: {
            autoplay: 1,
            controls: 1,
            showinfo: 1,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            fs: 1
        },
        events: {
            'onReady': function(event) {
                event.target.playVideo();
            }
        }
    });
    
    // Close popup functionality
    const closeBtn = popup.querySelector('.video-popup-close');
    const overlay = popup.querySelector('.video-popup-overlay');
    
    function closePopup() {
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
            // Destroy the popup player
            if (popupPlayer && typeof popupPlayer.destroy === 'function') {
                popupPlayer.destroy();
            }
        }, 300);
    }
    
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
    
    // Close on Escape key
    document.addEventListener('keydown', function handleEscape(e) {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', handleEscape);
        }
    });
}

// Loading Screen Animation
function initializeLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Animate loading bar
    setTimeout(() => {
        if (loadingProgress) {
            loadingProgress.style.width = '100%';
        }
    }, 500);
    
    // Hide loading screen after animation
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('loaded');
            document.body.style.overflow = 'auto';
        }
        
        // Initialize AOS after loading
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic'
            });
        }
    }, 2500);
}

// Navigation Functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navHamburger = document.getElementById('nav-hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navHamburger && navMenu) {
        navHamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navHamburger.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu) navMenu.classList.remove('active');
                    if (navHamburger) navHamburger.classList.remove('active');
                    
                    // Update active link
                    updateActiveNavLink(link);
                }
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Awwwards-Inspired Navigation
function initializeAwwwardsNavigation() {
    // Navigation elements
    const navbar = document.querySelector('.awwwards-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!navbar) return; // Exit if Awwwards nav not found
    
    // Scroll detection for navbar styling
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    function requestNavbarUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestNavbarUpdate);

    // Mobile menu toggle
    if (navToggle && mobileOverlay) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });

        // Close mobile menu when clicking overlay
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                toggleMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }

    function toggleMobileMenu() {
        const isActive = navToggle.classList.contains('active');
        
        if (isActive) {
            // Closing menu
            navToggle.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        } else {
            // Opening menu
            navToggle.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
        }
    }

    // Close mobile menu when clicking any mobile nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => {
                toggleMobileMenu();
            }, 300);
        });
    });

    // Enhanced nav link interactions
    navLinks.forEach(link => {
        // Add magnetic effect on mouse move
        link.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        // Reset position on mouse leave
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });

        // Smooth scroll to sections
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - (navbar.offsetHeight + 20);
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Update active state
                    updateActiveAwwwardsNavLink(href);
                }
            }
        });
    });

    // Active navigation state management
    function updateActiveAwwwardsNavLink(activeHref = null) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        if (activeHref) {
            const activeLink = document.querySelector(`.nav-link[href="${activeHref}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } else {
            // Auto-detect active section on scroll
            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = '#' + section.getAttribute('id');
                }
            });

            if (currentSection) {
                const activeLink = document.querySelector(`.nav-link[href="${currentSection}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        }
    }

    // Intersection Observer for active nav states
    const observerOptions = {
        root: null,
        rootMargin: `-${navbar.offsetHeight + 50}px 0px -50% 0px`,
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = '#' + entry.target.id;
                updateActiveAwwwardsNavLink(sectionId);
            }
        });
    }, observerOptions);

    // Observe all sections with IDs
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });

    // CTA button enhanced interactions
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });

        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Initialize navbar on page load
    updateNavbar();
    
    // Add body padding to account for fixed navbar
    document.body.style.paddingTop = navbar.offsetHeight + 'px';
    
    // Update body padding on window resize
    window.addEventListener('resize', function() {
        document.body.style.paddingTop = navbar.offsetHeight + 'px';
    });

    console.log('🎨 Awwwards-inspired navigation initialized successfully!');
}

// Simple Clean Navigation
function initializeCleanNavigation() {
    const navbar = document.querySelector('.clean-nav');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!navbar) return; // Exit if clean nav not found
    
    // Smooth scroll effect
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    
    // Mobile menu toggle
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function() {
            const isActive = mobileToggle.classList.contains('active');
            
            if (isActive) {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                mobileToggle.classList.add('active');
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Close mobile menu when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling and active states
    [...navLinks, ...mobileLinks].forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active state
                    updateActiveState(href);
                }
            }
        });
    });
    
    // Active state management
    function updateActiveState(activeHref = null) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        if (activeHref) {
            const activeLink = document.querySelector(`.nav-link[href="${activeHref}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } else {
            // Auto-detect active section
            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = '#' + section.getAttribute('id');
                }
            });
            
            if (currentSection) {
                const activeLink = document.querySelector(`.nav-link[href="${currentSection}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        }
    }
    
    // Update active state on scroll
    window.addEventListener('scroll', updateActiveState);
    
    // Initialize
    updateNavbar();
    updateActiveState();
    
    console.log('✨ Clean Awwwards-inspired navigation ready!');
}

// Custom Cursor
function initializeCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower || window.innerWidth <= 768) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Animate follower
    function animateFollower() {
        const speed = 0.2;
        
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .doctor-card, .gallery-item, .stat-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.opacity = '0.8';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.opacity = '0.5';
        });
    });
}

// Counter Animations
function initializeCounterAnimations() {
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16); // ~60fps
}

// Scroll Animations
function initializeScrollAnimations() {
    // Parallax effect for hero section
    const heroWrapper = document.querySelector('.hero-wrapper');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        if (heroWrapper && window.innerWidth > 768) {
            heroWrapper.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Initialize counter animations
    initializeCounterAnimations();
}

// Form Handling
function initializeFormHandling() {
    const appointmentForm = document.getElementById('appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmission);
    }
    
    // Add floating label effect
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

function handleAppointmentSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Booking...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Appointment request sent successfully! We will contact you soon.', 'success');
        e.target.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Remove focused classes
        document.querySelectorAll('.form-group.focused').forEach(group => {
            group.classList.remove('focused');
        });
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00d4aa' : '#0066cc'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Page Transition Effects
function initializePageTransitions() {
    // Smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        sectionObserver.observe(section);
    });
    
    // Add CSS for visible sections
    const style = document.createElement('style');
    style.textContent = `
        .section-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Gallery Lightbox
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
}

function openLightbox(index) {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${galleryItems[index].src}" alt="${galleryItems[index].alt}">
            <div class="lightbox-nav">
                <button class="lightbox-prev">&#8249;</button>
                <button class="lightbox-next">&#8250;</button>
            </div>
        </div>
    `;
    
    // Style the lightbox
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Close functionality
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    function closeLightbox() {
        lightbox.style.opacity = '0';
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        }, 300);
    }
    
    // Navigation functionality
    let currentIndex = index;
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const img = lightbox.querySelector('img');
    
    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
        img.src = galleryItems[currentIndex].src;
        img.alt = galleryItems[currentIndex].alt;
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
        img.src = galleryItems[currentIndex].src;
        img.alt = galleryItems[currentIndex].alt;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function handleKeyboard(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleKeyboard);
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', initializeGallery);

// Performance optimizations
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Utility functions
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

// Add optimized scroll listener
window.addEventListener('scroll', throttle(() => {
    // Handle scroll-based animations here
}, 16)); // ~60fps

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Reinitialize cursor for desktop/mobile switching
    if (window.innerWidth <= 768) {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
    } else {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursor) cursor.style.display = 'block';
        if (cursorFollower) cursorFollower.style.display = 'block';
    }
}, 250));

// Enhanced Navigation Functions - Bootstrap Compatible
function initializeEnhancedNavigation() {
    const navbar = document.querySelector('.navbar-professional');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Scroll effects for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open (Bootstrap collapse)
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse && navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
                
                // Calculate offset for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveLink(targetId);
            }
        });
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = navbar.offsetHeight;
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        updateActiveLink(current);
    });

    function updateActiveLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === activeId) {
                link.classList.add('active');
            }
        });
    }

    // Initialize navbar state
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // Handle CTA button clicks
    const ctaButtons = document.querySelectorAll('.navbar-cta .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}
