document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll-container");
    const scrollContent = document.querySelector(".scroll-content");

    if (!scrollContainer || !scrollContent) return;

    let scrollSpeed = 1.25; // Auto-scrolling speed
    let isPaused = false;
    let animationFrame;
    let isCloned = false; // Prevents multiple cloning

    // Function to duplicate skill items for seamless infinite scrolling
    function duplicateItems() {
        if (isCloned) return;
        const skills = Array.from(scrollContent.children);
        skills.forEach((skill) => {
            const clone = skill.cloneNode(true);
            scrollContent.appendChild(clone);
        });
        isCloned = true;
    }

    duplicateItems(); // Clone items once

    // Function for automatic infinite scrolling
    function scrollSkills() {
        if (!isPaused) {
            scrollContainer.scrollLeft += scrollSpeed;

            // Reset scroll position for seamless looping
            if (scrollContainer.scrollLeft >= scrollContent.scrollWidth / 2) {
                scrollContainer.scrollLeft = 0;
            }
        }
        animationFrame = requestAnimationFrame(scrollSkills);
    }

    scrollSkills(); // Start infinite auto-scrolling

    // Pause auto-scroll on hover
    scrollContainer.addEventListener("mouseenter", () => (isPaused = true));
    scrollContainer.addEventListener("mouseleave", () => (isPaused = false));
});
