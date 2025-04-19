// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
let isDark = true;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) {
        root.style.setProperty('--primary-color', '#0a192f');
        root.style.setProperty('--secondary-color', '#112240');
        root.style.setProperty('--text-color', '#8892b0');
        root.style.setProperty('--heading-color', '#ffffff');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        document.body.removeAttribute('data-theme');
    } else {
        root.style.setProperty('--primary-color', '#f5f5f5');
        root.style.setProperty('--secondary-color', '#e5e5e5');
        root.style.setProperty('--text-color', '#333333');
        root.style.setProperty('--heading-color', '#000000');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.setAttribute('data-theme', 'light');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active navigation link highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
    
    // Show/hide social links based on current section
    const socialLinks = document.querySelector('.social-links');
    if (current === 'home') {
        socialLinks.style.opacity = '1';
        socialLinks.style.visibility = 'visible';
    } else {
        socialLinks.style.opacity = '0';
        socialLinks.style.visibility = 'hidden';
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    contactForm.reset();
});

// Project timeline positioning
function adjustProjectTimeline() {
    const projectsGrid = document.querySelector('.projects-grid');
    const projectCards = document.querySelectorAll('.project-card');
    const projectLine = document.querySelector('.project-line');
    const projectDots = document.querySelectorAll('.project-dot');
    
    if (!projectsGrid || !projectLine || projectCards.length === 0) return;
    
    // Set the height of the project line based on the last project card
    const lastCard = projectCards[projectCards.length - 1];
    const gridHeight = lastCard.offsetTop + lastCard.offsetHeight + 50;
    projectLine.style.height = `${gridHeight}px`;
    
    // Position each project dot based on the respective card
    projectCards.forEach((card, index) => {
        if (projectDots[index]) {
            projectDots[index].style.top = `${card.offsetTop + 30}px`;
        }
    });
    
    // Clear any floats
    projectsGrid.style.height = `${gridHeight}px`;
}

// Handle CV planet hover effect
const cvPlanet = document.querySelector('.cv-planet');
const downloadCv = document.querySelector('.download-cv');

if (cvPlanet && downloadCv) {
    cvPlanet.addEventListener('mouseenter', () => {
        downloadCv.classList.add('pulse');
    });
    
    cvPlanet.addEventListener('mouseleave', () => {
        downloadCv.classList.remove('pulse');
    });
}

// Initialize project timeline on load and resize
window.addEventListener('load', adjustProjectTimeline);
window.addEventListener('resize', adjustProjectTimeline);

// Add parallax effect to planets
document.addEventListener('mousemove', (e) => {
    const planets = document.querySelectorAll('.planet');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    planets.forEach((planet, index) => {
        const speed = 0.5 + (index * 0.1);
        const xOffset = (x - 0.5) * speed * 20;
        const yOffset = (y - 0.5) * speed * 20;
        
        planet.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
}); 