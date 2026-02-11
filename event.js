// 1. DATA CONFIGURATION (Specific to Events Page)
const galleryData = {
    TownHall: {
        title: "Tata Tech Day 2025",
        text: "Showcasing innovative automation and IoT technologies at Tata Tech Day,engaging with industry experts and exploring future-ready digital solutions.",
        images: [
            "../images/tatata.jpeg",
            "../images/t.jpeg",
             "../images/Ta.jpeg",
              "../images/A.jpeg",
        ]
    },
    Webinar: {
        title:"Certificates & Recognitions",
        text: "A collection of Employee of the Year honors and certifications received from partner organizations, reflecting excellence, trust, and professional growth.",
        images: [
             "../images/employeecertificate.jpeg",
             "../images/employeeCert.jpeg",
              "../images/cert.jpeg",
              "../images/certificate.jpeg"
        ]
    },
    TeamMeet: {
        title: "Employee-Led Training Sessions",
        text:"Our team sharing technical expertise and practical insights through structured training programs delivered to partner organizations.",
        images: [
             "../images/train.jpeg",
             "../images/trainingg.jpeg",
              "../images/traininggg.jpeg"
        ]
    }
};

// 2. DOM ELEMENTS
const openButtons = document.querySelectorAll('.open-gallery');
const lightbox = document.getElementById('gallery-lightbox');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxText = document.getElementById('lightbox-text');
const lightboxStoryBox = document.getElementById('lightbox-story-box');
const carousel = document.getElementById('carousel');
const dotsWrap = document.getElementById('dots');
const closeBtn = document.getElementById('lightbox-close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const autoplayToggle = document.getElementById('autoplayToggle');

// 3. CAROUSEL STATE
let currentIndex = 0;
let currentImages = [];
let autoplay = false;
let autoplayTimer = null;
let panelRadius = 600;

// 4. ANIMATION OBSERVER (For Page Scroll Fade-In)
document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.hero-content, .event-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach((el) => observer.observe(el));
});

// 5. CAROUSEL LOGIC
function buildCarousel(images) {
    carousel.innerHTML = '';
    dotsWrap.innerHTML = '';
    currentImages = images.slice();
    const N = currentImages.length;
    
    if(N === 0) return;

    // Calculate dimensions based on screen size for responsiveness
    let panelW = 520;
    let panelH = 320;
    if (window.innerWidth < 1000) { panelW = 400; panelH = 250; }
    if (window.innerWidth < 768) { panelW = 300; panelH = 180; }

    const theta = 360 / N;
    panelRadius = Math.round((panelW/2) / Math.tan(Math.PI/N)) + 40;

    for (let i=0; i<N; i++){
        const img = currentImages[i];
        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.style.width = panelW + 'px';
        panel.style.height = panelH + 'px';
        const rot = i * theta;
        panel.style.transform = `translate(-50%,-50%) rotateY(${rot}deg) translateZ(${panelRadius}px)`;
        
        const imgele = document.createElement('img');
        imgele.src = img;
        panel.appendChild(imgele);
        carousel.appendChild(panel);

        const dot = document.createElement('button');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
    }

    currentIndex = 0;
    rotateCarousel();
}

function rotateCarousel(){
    const theta = 360 / currentImages.length;
    const angle = -currentIndex * theta;
    carousel.style.transform = `translateZ(-${panelRadius}px) rotateY(${angle}deg)`;
    updateDots();
}

function updateDots(){
    const dots = Array.from(dotsWrap.children);
    dots.forEach((d, i) => d.classList.toggle('active', i===currentIndex));
}

function goTo(i){
    currentIndex = (i + currentImages.length) % currentImages.length;
    rotateCarousel();
    resetAutoplayTimer();
}

function next(){
    currentIndex = (currentIndex + 1) % currentImages.length;
    rotateCarousel();
    resetAutoplayTimer();
}

function prev(){
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    rotateCarousel();
    resetAutoplayTimer();
}

function resetAutoplayTimer(){
    if(autoplay){
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(() => { next(); }, 2800);
    }
}

// 6. EVENT LISTENERS
openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetKey = btn.dataset.target; // Gets "TownHall", "Webinar", etc.
        const data = galleryData[targetKey];

        if(!data) return;

        // Set Text
        lightboxTitle.textContent = data.title;
        lightboxText.textContent = data.text;
        
        // Text Animation Reset
        lightboxStoryBox.classList.remove('fade-in');
        void lightboxStoryBox.offsetWidth; 
        lightboxStoryBox.classList.add('fade-in');

        // Build Carousel
        buildCarousel(data.images);

        // Show Lightbox
        lightbox.classList.remove('hidden');
        lightbox.setAttribute('aria-hidden','false');
        if(autoplay) resetAutoplayTimer();
    });
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

autoplayToggle.addEventListener('change', (e) => {
    autoplay = e.target.checked;
    if(autoplay) {
        autoplayTimer = setInterval(() => next(), 2800);
    } else {
        clearInterval(autoplayTimer);
    }
});

function closeLightbox(){
    lightbox.classList.add('hidden');
    lightbox.setAttribute('aria-hidden','true');
    clearInterval(autoplayTimer);
}

// Close on outside click
lightbox.addEventListener('click', (ev)=>{
    if(ev.target === lightbox) closeLightbox();
});

// Keyboard Nav
document.addEventListener('keydown', (ev) => {
    if(lightbox.classList.contains('hidden')) return;
    if(ev.key === 'ArrowLeft') prev();
    if(ev.key === 'ArrowRight') next();
    if(ev.key === 'Escape') closeLightbox();
});

/* =========================================
   7. MOBILE NAV TOGGLE
========================================= */
const menuToggle = document.querySelector(".mobile-menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}


/* =========================================
   8. MOBILE DROPDOWN ACCORDION
========================================= */
document.querySelectorAll(".mega-dropdown-parent > a")
    .forEach(link => {
        link.addEventListener("click", (e) => {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                link.parentElement.classList.toggle("active");
            }
        });
    });