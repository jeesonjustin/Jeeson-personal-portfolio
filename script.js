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
        header.style.background = 'rgba(15, 23, 42, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
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
const revealElements = document.querySelectorAll('.project-card, .skill-card, .service-item, .about-text');

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
