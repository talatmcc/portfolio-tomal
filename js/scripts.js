/**
 * Professional Portfolio - Custom JavaScript
 * Handles smooth scrolling, navigation, and interactive elements
 */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    /**
     * Navbar Scroll Effect
     * Adds shadow and styling when scrolling
     */
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    }

    /**
     * Active Section Highlighting in Navigation
     * Updates active nav link based on scroll position
     */
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    /**
     * Smooth Scroll for Navigation Links
     * Enhances the default smooth scroll behavior
     */
    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Close mobile menu if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: true
                        });
                    }

                    // Smooth scroll to section
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Animate Elements on Scroll
     * Adds fade-in animation to elements as they enter viewport
     */
    function animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe cards and elements
        const animatedElements = document.querySelectorAll('.card, .publication-card, .contact-card');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Carousel Auto-pause on Modal Close
     * Resets carousel when modal is closed
     */
    function initCarouselControls() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            modal.addEventListener('hidden.bs.modal', function() {
                const carousel = this.querySelector('.carousel');
                if (carousel) {
                    const bsCarousel = bootstrap.Carousel.getInstance(carousel);
                    if (bsCarousel) {
                        bsCarousel.to(0);
                    }
                }
            });
        });
    }

    /**
     * Loading Animation for Images
     * Adds loading effect for images
     */
    function initImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '0';
                setTimeout(() => {
                    this.style.transition = 'opacity 0.3s ease';
                    this.style.opacity = '1';
                }, 50);
            });
        });
    }

    /**
     * Form Validation (if contact form is added)
     * Can be extended for future contact form implementation
     */
    function initFormValidation() {
        const forms = document.querySelectorAll('.needs-validation');
        
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }

    /**
     * Back to Top Button (Optional Enhancement)
     * Adds smooth scroll to top functionality
     */
    function initBackToTop() {
        // Create back to top button
        const backToTopButton = document.createElement('button');
        backToTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
        backToTopButton.className = 'btn-back-to-top';
        backToTopButton.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTopButton);

        // Add styles
        backToTopButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.5);
            z-index: 1000;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-size: 1.2rem;
            animation: fadeInUp 0.3s ease;
        `;

        // Show/hide based on scroll position with animation
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'flex';
                backToTopButton.style.animation = 'fadeInUp 0.3s ease';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // Scroll to top on click with feedback
        backToTopButton.addEventListener('click', () => {
            backToTopButton.style.transform = 'scale(0.9)';
            setTimeout(() => {
                backToTopButton.style.transform = 'scale(1)';
            }, 150);
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Enhanced hover effect
        backToTopButton.addEventListener('mouseenter', () => {
            backToTopButton.style.transform = 'scale(1.15) translateY(-3px)';
            backToTopButton.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.7)';
        });

        backToTopButton.addEventListener('mouseleave', () => {
            backToTopButton.style.transform = 'scale(1) translateY(0)';
            backToTopButton.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.5)';
        });
    }

    /**
     * Page Load Animation
     * Adds smooth fade-in effect when page loads
     */
    function initPageLoadAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }

    /**
     * Initialize Tooltips
     * Activates Bootstrap tooltips if present
     */
    function initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    /**
     * Language Toggle Functionality
     * Switches between English and Chinese
     */
    function initLanguageToggle() {
        const langToggleBtn = document.getElementById('langToggle');
        if (!langToggleBtn) return;

        // Get saved language preference or default to English
        let currentLang = localStorage.getItem('preferredLanguage') || 'en';

        // Set initial language
        setLanguage(currentLang);

        // Toggle language on button click
        langToggleBtn.addEventListener('click', function() {
            currentLang = currentLang === 'en' ? 'zh' : 'en';
            setLanguage(currentLang);
            localStorage.setItem('preferredLanguage', currentLang);
        });

        function setLanguage(lang) {
            // Update button text
            langToggleBtn.textContent = lang === 'en' ? '中文' : 'English';

            // Get all elements with language data attributes
            const elements = document.querySelectorAll('[data-en][data-zh]');
            
            elements.forEach(element => {
                const enText = element.getAttribute('data-en');
                const zhText = element.getAttribute('data-zh');
                
                if (enText && zhText) {
                    // Update text content
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = lang === 'en' ? enText : zhText;
                    } else {
                        element.textContent = lang === 'en' ? enText : zhText;
                    }
                }
            });

            // Update HTML lang attribute
            document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');

            // Add smooth transition effect
            document.body.style.transition = 'opacity 0.2s ease';
            document.body.style.opacity = '0.95';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 200);
        }
    }

    /**
     * Performance Optimization
     * Debounce function for scroll events
     */
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    /**
     * Event Listeners
     */
    function initEventListeners() {
        // Scroll events with debouncing
        window.addEventListener('scroll', debounce(handleNavbarScroll));
        window.addEventListener('scroll', debounce(highlightActiveSection));

        // Resize event
        window.addEventListener('resize', debounce(() => {
            // Handle any resize-specific logic here
        }, 250));

        // Page load event
        window.addEventListener('load', () => {
            // Highlight initial section
            highlightActiveSection();
        });
    }

    /**
     * Initialize All Functions
     */
    function init() {
        initPageLoadAnimation();
        initSmoothScroll();
        initEventListeners();
        animateOnScroll();
        initCarouselControls();
        initImageLoading();
        initFormValidation();
        initBackToTop();
        initTooltips();
        initLanguageToggle();

        // Set initial active section
        highlightActiveSection();

        console.log('✨ Portfolio initialized successfully!');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

