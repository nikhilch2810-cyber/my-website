document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. SCROLL REVEAL ANIMATION
    ========================================= */
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.add('hidden');
        observer.observe(card);
    });


    /* =========================================
       2. 3D TILT EFFECT (DESKTOP ONLY)
    ========================================= */
    if (window.innerWidth > 900) {
        document.querySelectorAll('.product-card').forEach(card => {

            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -3;
                const rotateY = ((x - centerX) / centerX) * 3;

                card.style.transform =
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform =
                    'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }


    /* =========================================
       3. QUOTE MODAL
    ========================================= */
    const modal = document.getElementById("quoteModal");
    const openBtns = document.querySelectorAll(".open-quote");
    const closeBtn = document.querySelector(".close-modal");
    const productSelect = document.getElementById("productSelect");

    if (modal && productSelect) {
        openBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                modal.style.display = "flex";
                document.body.style.overflow = "hidden";

                const productName = btn.dataset.product;
                if (productName) {
                    const optionExists = [...productSelect.options]
                        .some(opt => opt.value === productName || opt.text === productName);

                    if (optionExists) {
                        productSelect.value = productName;
                    }
                }
            });
        });

        closeBtn?.addEventListener("click", closeModal);

        window.addEventListener("click", e => {
            if (e.target === modal) closeModal();
        });

        function closeModal() {
            modal.style.display = "none";
            document.body.style.overflow = "";
        }
    }


    /* =========================================
       4. MOBILE NAV TOGGLE
    ========================================= */
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const nav = document.querySelector(".main-nav");

    menuToggle?.addEventListener("click", () => {
        nav?.classList.toggle("active");
    });


    /* =========================================
       5. MOBILE DROPDOWN ACCORDION
    ========================================= */
    document.querySelectorAll(".mega-dropdown-parent > a")
        .forEach(link => {
            link.addEventListener("click", e => {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    link.parentElement.classList.toggle("active");
                }
            });
        });


    /* =========================================
       6. GET QUOTE FORM SUBMIT (AJAX → PHP → POSTGRES)
    ========================================= */
    const quoteForm = document.getElementById("quoteForm");

    if (quoteForm) {
        quoteForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(quoteForm);
            const submitBtn = quoteForm.querySelector("button[type='submit']");
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";

            try {
                const response = await fetch("quota.php", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (result.status === "success") {
                    alert("✅ Your request has been submitted successfully!");
                    quoteForm.reset();
                    modal.style.display = "none";
                    document.body.style.overflow = "";
                } 
                else if (result.status === "warning") {
                    alert("⚠️ Data saved, but email could not be sent.");
                } 
                else {
                    alert("❌ Failed to submit. Please try again.");
                }

            } catch (error) {
                console.error(error);
                alert("❌ Server error. Please try later.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "Submit";
            }
        });
    }

}); 
