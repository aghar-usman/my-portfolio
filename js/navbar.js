document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Scroll Effect for Navbar (Optimized with debounce)
    let lastScrollY = 0;
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
    
    window.addEventListener("scroll", () => {
        if (Math.abs(window.scrollY - lastScrollY) > 10) { // Avoid frequent updates
            handleScroll();
            lastScrollY = window.scrollY;
        }
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
        document.body.classList.toggle("no-scroll"); // Prevent body scrolling when menu is open
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    });
});
