document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init('YOUR_EMAILJS_USER_ID'); // Replace with your actual EmailJS user ID

    // Mobile menu functionality
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');
    const menuBackdrop = document.getElementById('menu-backdrop');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!menuIcon || !navbar) {
        console.error("Menu elements not found!");
        return;
    }
    
    // Mobile menu toggle
    menuIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle classes
        this.classList.toggle('bx-x');
        this.classList.toggle('bx-menu');
        navbar.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close menu function
    function closeMenu() {
        menuIcon.classList.remove('bx-x');
        menuIcon.classList.add('bx-menu');
        navbar.classList.remove('active');
        menuBackdrop.classList.remove('active');
        body.classList.remove('menu-open');
    }
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking backdrop
    menuBackdrop.addEventListener('click', closeMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
            if (navbar.classList.contains('active')) {
                closeMenu();
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbar.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Close menu when scrolling
    window.addEventListener('scroll', () => {
        if (navbar.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send email via EmailJS
            emailjs.sendForm('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', this)
                .then(() => {
                    // Success message
                    alert('Message sent successfully!');
                    contactForm.reset();
                })
                .catch((error) => {
                    // Error message
                    alert('Failed to send message. Please try again later or email me directly at lethabomaredi@gmail.com');
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // CV download tracking
    const downloadBtn = document.querySelector('a[download]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            console.log('CV download initiated');
            // You could add analytics here if needed
        });
    }
});