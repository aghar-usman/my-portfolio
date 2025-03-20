document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll-content");
    const scrollWrapper = document.querySelector(".scroll-wrapper");
    const nextButton = document.querySelector(".scroll-next");
    const prevButton = document.querySelector(".scroll-prev");

    if (scrollContainer) {
        let scrollSpeed = 1.2; // Adjust speed for auto-scrolling
        let scrollStep = 200; // Step size for Next/Prev buttons
        let isPaused = false;
        let animationFrame;

        // Duplicate elements for infinite loop effect
        function duplicateItems() {
            const skills = Array.from(scrollContainer.children);
            skills.forEach((skill) => {
                const clone = skill.cloneNode(true);
                scrollContainer.appendChild(clone);
            });
        }

        duplicateItems(); // Call function to duplicate skills

        // Auto-scroll function
        function scrollSkills() {
            if (!isPaused) {
                scrollContainer.scrollLeft += scrollSpeed;

                // Reset scroll position for seamless looping
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0;
                }
            }
            animationFrame = requestAnimationFrame(scrollSkills);
        }

        scrollSkills(); // Start infinite scrolling

        // Function to move to the next skill with seamless transition
        function scrollNext() {
            scrollContainer.scrollLeft += scrollStep;
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                scrollContainer.scrollLeft = 0;
            }
        }

        // Function to move to the previous skill with seamless transition
        function scrollPrev() {
            if (scrollContainer.scrollLeft === 0) {
                scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
            }
            scrollContainer.scrollLeft -= scrollStep;
        }

        // Pause auto-scroll on hover
        scrollWrapper.addEventListener("mouseenter", () => (isPaused = true));
        scrollWrapper.addEventListener("mouseleave", () => {
            isPaused = false;
            scrollSkills();
        });

        // Attach event listeners to buttons
        nextButton.addEventListener("click", scrollNext);
        prevButton.addEventListener("click", scrollPrev);
    }
});
