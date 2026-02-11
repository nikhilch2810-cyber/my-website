document.addEventListener('DOMContentLoaded', () => {
    // --- Card Reveal Logic (Talk to Sales & Technical Support) ---
    const salesBtn = document.getElementById('schedule-call-btn');
    const salesDetails = document.getElementById('sales-details');
    const supportBtn = document.getElementById('submit-ticket-btn');
    const supportDetails = document.getElementById('support-details');

    const toggleDetails = (button, detailsElement) => {
        detailsElement.classList.toggle('active');

        if (detailsElement.classList.contains('active')) {
            button.textContent = 'Hide Options';
            button.closest('.card').classList.add('active-card');
        } else {
            if (detailsElement.id === 'sales-details') {
                button.textContent = 'Schedule a Call';
            } else {
                button.textContent = 'Submit a Ticket';
            }
            button.closest('.card').classList.remove('active-card');
        }
    };

    salesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDetails(salesBtn, salesDetails);
        if (supportDetails.classList.contains('active')) {
            toggleDetails(supportBtn, supportDetails);
        }
    });

    supportBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDetails(supportBtn, supportDetails);
        if (salesDetails.classList.contains('active')) {
            toggleDetails(salesBtn, salesDetails);
        }
    });

    // --- Demo Request Modal Logic ---
    const demoBtn = document.getElementById('request-demo-btn');
    const modal = document.getElementById('demo-modal');
    const closeModalBtn = modal.querySelector('.close-btn');
    const demoForm = document.getElementById('demo-form');

    demoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // --- REAL FORM SUBMISSION (PostgreSQL + PHP) ---
    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(demoForm);

        fetch('submit_demo.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Demo Request Submitted Successfully!');
                modal.style.display = 'none';
                demoForm.reset();
            } else {
                alert('Submission failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Server error. Please try later.');
        });
    });
});

// --- GOOGLE MAP ---
function initMap() {
    const companyLocation = { lat: 28.6280, lng: 77.3649 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: companyLocation,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
    });

    new google.maps.Marker({
        position: companyLocation,
        map: map,
        title: "InnovateX Pvt Ltd - Head Office",
        animation: google.maps.Animation.DROP
    });
}

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