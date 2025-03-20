document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll-content");
    const scrollWrapper = document.querySelector(".scroll-wrapper");
    const nextButton = document.querySelector(".scroll-next");
    const prevButton = document.querySelector(".scroll-prev");

    if (scrollContainer) {
        const skills = Array.from(scrollContainer.children);

        // Duplicate elements for seamless scrolling effect
        skills.forEach((skill) => {
            const clone = skill.cloneNode(true);
            scrollContainer.appendChild(clone);
        });

        let scrollAmount = 0;
        let scrollSpeed = 1; // Adjust speed for smoother scrolling
        let scrollStep = 60; // Adjust step size for Next/Prev buttons
        let isPaused = true; // Start in paused mode until hover
        let animationFrame;

        // Function to enable smooth auto-scrolling
        function scrollSkills() {
            if (!isPaused) {
                scrollAmount += scrollSpeed;

                // Seamless looping logic
                if (scrollAmount >= scrollContainer.scrollWidth / 2) {
                    scrollAmount = 0; // Reset scroll position for a smooth loop
                }

                scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
            }

            animationFrame = requestAnimationFrame(scrollSkills);
        }

        // Start scrolling when hovered
        scrollWrapper.addEventListener("mouseenter", () => {
            isPaused = false;
            scrollSkills();
            nextButton.style.display = "flex"; // Show buttons
            prevButton.style.display = "flex";
        });

        // Pause scrolling when mouse leaves
        scrollWrapper.addEventListener("mouseleave", () => {
            isPaused = true;
            cancelAnimationFrame(animationFrame);
            nextButton.style.display = "none"; // Hide buttons
            prevButton.style.display = "none";
        });

        // Next Button Click Event
        nextButton.addEventListener("click", () => {
            scrollAmount += scrollStep;
            if (scrollAmount >= scrollContainer.scrollWidth / 2) {
                scrollAmount = 0; // Seamless reset when reaching the end
            }
            scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
        });

        // Previous Button Click Event
        prevButton.addEventListener("click", () => {
            scrollAmount -= scrollStep;
            if (scrollAmount < 0) {
                scrollAmount = scrollContainer.scrollWidth / 2 - scrollStep; // Seamless reset at start
            }
            scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
        });

        // Hide buttons initially
        nextButton.style.display = "none";
        prevButton.style.display = "none";
    }
});
