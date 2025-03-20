document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll-content");
    const scrollWrapper = document.querySelector(".scroll-wrapper");
    const nextButton = document.querySelector(".scroll-next");
    const prevButton = document.querySelector(".scroll-prev");

    if (scrollContainer) {
        const skills = Array.from(scrollContainer.children);

        // Duplicate elements for seamless scrolling
        skills.forEach((skill) => {
            const clone = skill.cloneNode(true);
            scrollContainer.appendChild(clone);
        });

        let scrollSpeed = 1; // Adjust speed for auto-scrolling
        let scrollStep = 80; // Adjust step size for Next/Prev buttons
        let isPaused = true; // Start in paused mode
        let animationFrame;
        let hideTimeout;

        // Auto-scrolling function
        function scrollSkills() {
            if (!isPaused) {
                scrollContainer.scrollLeft += scrollSpeed;

                // Seamless looping logic
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0; // Reset scroll position for a smooth loop
                }
            }
            animationFrame = requestAnimationFrame(scrollSkills);
        }

        // Show buttons when hovering
        function showButtons() {
            nextButton.style.display = "flex";
            prevButton.style.display = "flex";
            if (hideTimeout) clearTimeout(hideTimeout);
        }

        // Hide buttons after a delay
        function hideButtons() {
            hideTimeout = setTimeout(() => {
                nextButton.style.display = "none";
                prevButton.style.display = "none";
            }, 800); // Delay before hiding
        }

        // Start scrolling when hovered
        scrollWrapper.addEventListener("mouseenter", () => {
            isPaused = false;
            scrollSkills();
            showButtons();
        });

        // Pause scrolling and hide buttons when mouse leaves
        scrollWrapper.addEventListener("mouseleave", () => {
            isPaused = true;
            cancelAnimationFrame(animationFrame);
            hideButtons();
        });

        // Next Button Click Event
        nextButton.addEventListener("click", () => {
            scrollContainer.scrollLeft += scrollStep;
            showButtons();
        });

        // Previous Button Click Event
        prevButton.addEventListener("click", () => {
            scrollContainer.scrollLeft -= scrollStep;
            showButtons();
        });

        // Hide buttons initially
        nextButton.style.display = "none";
        prevButton.style.display = "none";
    }
});
