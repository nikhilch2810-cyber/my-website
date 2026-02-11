document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. SCROLL REVEAL ANIMATION --- */
    // This makes cards fade in nicely as you scroll down
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); 
                // Optional: Stop observing once shown
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Target all resource cards
    const hiddenElements = document.querySelectorAll('.resource-card');
    hiddenElements.forEach((el) => {
        el.classList.add('hidden'); // Add hidden class initially
        observer.observe(el);
    });


    /* --- 2. 3D TILT EFFECT FOR CARDS --- */
    // This gives the "Industrial/Tech" feel when hovering
    const cards = document.querySelectorAll('.resource-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on mouse position
            const rotateX = ((y - centerY) / centerY) * -5; // -5 deg max tilt
            const rotateY = ((x - centerX) / centerX) * 5;  // 5 deg max tilt

            // Apply style
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.borderColor = 'var(--primary-cyan)';
        });

        // Reset when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.borderColor = 'rgba(255,255,255,0.05)';
        });
    });

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