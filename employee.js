document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Gallery Dropdown Animation
    const buttons = document.querySelectorAll('.view-gallery-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the gallery wrapper next to the button
            const galleryWrapper = this.nextElementSibling;
            
            // Toggle open class
            galleryWrapper.classList.toggle('open');
            this.classList.toggle('btn-active');

            // Optional: Toggle text between "View" and "Hide"
            // You can uncomment lines below if you want text to change
            /*
            const textNode = this.childNodes[2]; // Index 2 usually captures the text after icon
            if(galleryWrapper.classList.contains('open')) {
                textNode.nodeValue = " Hide Photos";
            } else {
                textNode.nodeValue = " View Gallery";
            }
            */
        });
    });

    // 2. Full Screen Image Modal
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const galleryImages = document.querySelectorAll(".gallery-img");
    const closeBtn = document.getElementsByClassName("close")[0];

    // Add click event to all gallery images
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    // Close on X
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Close on clicking outside image
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
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