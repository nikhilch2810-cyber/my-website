/* =========================================
   1. NAVBAR SCROLL EFFECT
========================================= */
window.addEventListener("scroll", () => {
    const header = document.querySelector(".main-header");
    if (!header) return;
    header.classList.toggle("sticky", window.scrollY > 50);
});


/* =========================================
   2. SCROLL TRIGGER ANIMATIONS
========================================= */
const scrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".scroll-trigger")
    .forEach(el => scrollObserver.observe(el));


/* =========================================
   3. STAT COUNTER ANIMATION
========================================= */
const statBoxes = document.querySelectorAll(".stat-box");

const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const box = entry.target;
            box.classList.add("active");

            const counter = box.querySelector(".counter");
            if (!counter) return;

            const target = +counter.dataset.target;
            let count = 0;
            const speed = 200;

            const updateCount = () => {
                const inc = target / speed;
                count += inc;

                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + (target > 5 ? "+" : "");
                }
            };
            updateCount();

            obs.unobserve(box);
        }
    });
}, { threshold: 0.3 });

statBoxes.forEach(box => statsObserver.observe(box));


/* =========================================
   4. SECTION DIVIDER ANIMATION
========================================= */
const dividerObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll(".section-divider")
    .forEach(divider => dividerObserver.observe(divider));


/* =========================================
   5. TIMELINE ANIMATION
========================================= */
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".timeline-item")
    .forEach(item => timelineObserver.observe(item));


// Timeline Line Fill
window.addEventListener("scroll", () => {
    const timeline = document.querySelector(".timeline");
    const line = document.querySelector(".timeline-line");
    if (!timeline || !line) return;

    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
        let percentage = ((windowHeight - rect.top) / rect.height) * 100;
        percentage = Math.max(0, Math.min(100, percentage));
        line.style.height = `${percentage}%`;
    }
});


/* =========================================
   6. PRELOADER
========================================= */
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add("hidden");
    }, 1500);
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
