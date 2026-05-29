// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Header on Scroll
const header = document.querySelector('#header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.7)';
        header.style.boxShadow = '0 4px 20px rgba(17, 19, 58, 0.1)';
        header.style.backdropFilter = 'blur(15px)';
        header.style.webkitBackdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.85)';
        header.style.boxShadow = 'none';
        header.style.backdropFilter = 'blur(12px)';
        header.style.webkitBackdropFilter = 'blur(12px)';
    }
});

// Smooth Scroll for Anchor Links (polifill for older browsers, though CSS smooth-scroll covers most)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Adjust for fixed header offset
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('.project-card, .skill-category, .service-item, .about-text, .timeline-content, .cert-card, .github-card, .explore-card, .testimonial-card');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
};

// Initial Style for Reveal Elements
revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(50px)";
    element.style.transition = "all 0.6s ease-out";
});

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Contact Form Submission Handling
let formSubmitted = false;
const iframe = document.getElementById('hidden_iframe');
const modal = document.getElementById('success-modal');
const closeModal = document.getElementById('close-modal');
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', () => {
        formSubmitted = true;
    });
}

if (iframe && modal) {
    iframe.onload = function () {
        if (formSubmitted) {
            modal.classList.add('active');
            contactForm.reset();
            formSubmitted = false;
        }
    };
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

// Close modal when clicking outside content
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Typing Animation
const typingText = document.querySelector('.typing-text');
const textArray = ["Web Developer", "UI/UX Designer", "AI/ML Enthusiast", "MCA Graduate"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingText) return;

    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end of text
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Pause before typing next text
    }

    setTimeout(type, typeSpeed);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
    if (typingText) {
        setTimeout(type, 1000);
    }
});

// Preloader
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Active Navbar Highlighting
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// 3D Card Tilt Effect
const tiltCards = document.querySelectorAll('.project-card, .service-item, .highlight-card, .skill-category, .cert-card, .github-card, .repo-card, .testimonial-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Max rotation 12 degrees
        const rotateX = ((y - centerY) / centerY) * -12; 
        const rotateY = ((x - centerX) / centerX) * 12;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateY(-5px)`;
        card.style.transition = 'transform 0.1s ease-out';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = ''; 
        card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.2s ease-out';
    });
});

