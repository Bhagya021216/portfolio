// Initialize EmailJS with your Public Key
(function(){
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS Public Key
})();

// Theme toggle functionality
let currentUserTheme = 'light';
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    const newTheme = currentUserTheme === 'light' ? 'dark' : 'light';
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(newTheme + '-mode');
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    themeText.textContent = newTheme === 'dark' ? 'Light' : 'Dark';
    currentUserTheme = newTheme;
    themeIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => { themeIcon.style.transform = 'rotate(0deg)'; }, 300);
    try { localStorage.setItem('theme', newTheme); } catch (e) { console.log('localStorage not available'); }
    adjustVideoPosition();
}
function initializeTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    let initialTheme = 'light';
    try { initialTheme = localStorage.getItem('theme') || 'light'; } catch (e) { console.log('localStorage not available'); }
    body.classList.add(initialTheme + '-mode');
    themeIcon.className = initialTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    themeText.textContent = initialTheme === 'dark' ? 'Light' : 'Dark';
    currentUserTheme = initialTheme;
    body.style.transition = 'all 0.3s ease';
}
// Profile title rotation
const titles = ['Full Stack Developer', 'Networking', 'Fast Learner', 'Cybersecurity Enthusiast'];
let titleIndex = 0;
function rotateTitle() {
    const profileTitle = document.querySelector('.profile-title');
    profileTitle.style.opacity = '0';
    setTimeout(() => {
        profileTitle.textContent = titles[titleIndex];
        profileTitle.style.opacity = '1';
        titleIndex = (titleIndex + 1) % titles.length;
    }, 500);
}
setInterval(rotateTitle, 3000);
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}
// Navbar active state management
function setActiveLink() {
    const sections = document.querySelectorAll('.section, .home-section');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}
// Video positioning
function adjustVideoPosition() {
    const video = document.querySelector('.home-section video');
    const profileImg = document.querySelector('.profile-img');
    const cvDownload = document.querySelector('.cv-download');
    if (video && profileImg && cvDownload) {
        const profileImgRect = profileImg.getBoundingClientRect();
        const cvDownloadRect = cvDownload.getBoundingClientRect();
        const topPosition = profileImgRect.top + (profileImgRect.height / 2);
        const bottomPosition = cvDownloadRect.bottom;
        const height = bottomPosition - topPosition;
        video.style.top = `${topPosition}px`;
        video.style.height = `${height}px`;
        video.style.left = '0';
        video.style.right = '0';
        video.style.width = '100%';
    }
}
// Certifications navigation
let currentCertIndex = 0;
const certsPerPage = 2;
const timelineItems = document.querySelectorAll('#certifications .timeline-item');
function updateCertifications() {
    timelineItems.forEach((item, index) => {
        item.classList.add('hidden');
        item.style.opacity = '0';
        if (index >= currentCertIndex && index < currentCertIndex + certsPerPage) {
            item.classList.remove('hidden');
            setTimeout(() => { item.style.opacity = '1'; }, 100);
        }
    });
    const prevBtn = document.querySelector('.cert-nav-btn[onclick="prevCertifications()"]');
    const nextBtn = document.querySelector('.cert-nav-btn[onclick="nextCertifications()"]');
    prevBtn.disabled = currentCertIndex === 0;
    nextBtn.disabled = currentCertIndex + certsPerPage >= timelineItems.length;
}
function nextCertifications() {
    if (currentCertIndex + certsPerPage < timelineItems.length) {
        currentCertIndex += certsPerPage;
        updateCertifications();
    }
}
function prevCertifications() {
    if (currentCertIndex > 0) {
        currentCertIndex -= certsPerPage;
        updateCertifications();
    }
}
// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}
// Intersection Observer for skills section
const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.remove('active');
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    // Send email via EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data)
        .then(function(response) {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#28a745';
            event.target.reset();
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2000);
        }, function(error) {
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
            submitBtn.style.background = '#dc3545';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2000);
        });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillBars = document.querySelectorAll('.skill-bar-item');
    const homeSection = document.querySelector('.home-section');
    [...timelineItems, ...skillBars, homeSection].forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    const skillsSection = document.querySelector('#skills');
    skillsObserver.observe(skillsSection);
    setActiveLink();
    adjustVideoPosition();
    updateCertifications();
});
window.addEventListener('scroll', setActiveLink);
window.addEventListener('resize', () => {
    adjustVideoPosition();
    updateCertifications();
});
function createParticles() {
    const particleCount = 50;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}
window.addEventListener('load', () => {
    initializeTheme();
    createParticles();
    rotateTitle();
    adjustVideoPosition();
    updateCertifications();
});
window.addEventListener('resize', () => {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('active');
    adjustVideoPosition();
});