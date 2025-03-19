document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.querySelector('.scroll-content');
    if (scrollContainer) {
        const skills = Array.from(scrollContainer.children);

        // Duplicate skills for seamless circular effect
        skills.forEach(skill => {
            const clone = skill.cloneNode(true);
            scrollContainer.appendChild(clone);
        });

        // Ensure smooth scrolling
        let scrollAmount = 0;
        let scrollSpeed = 1; // Adjusted speed for smoother scroll
        let scrollStep = 10; // The number of pixels to scroll for next/prev buttons
        let isPaused = false;

        // Set smooth transition for scrolling
        scrollContainer.style.transition = "transform 0.1s ease"; // Add smooth scrolling transition

        function scrollSkills() {
            if (!isPaused) {
                scrollAmount += scrollSpeed;

                // Seamless looping logic
                if (scrollAmount >= scrollContainer.scrollWidth / 2) {
                    scrollAmount = 0; // Reset scroll position for seamless loop
                }

                // Apply the transform property for smooth scroll
                scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
            }

            requestAnimationFrame(scrollSkills);
        }

        scrollSkills();

        // Pause scrolling when hovering for better UX
        scrollContainer.addEventListener('mouseenter', () => {
            isPaused = true; // Pause scrolling on hover
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isPaused = false; // Resume scrolling when hover ends
        });

        // Next and Previous button controls for fast forward and rewind
        const nextButton = document.querySelector('.scroll-next');
        const prevButton = document.querySelector('.scroll-prev');

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                scrollAmount += scrollStep;
                if (scrollAmount >= scrollContainer.scrollWidth / 2) {
                    scrollAmount = 0; // Seamless reset when reaching the end
                }
                scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                scrollAmount -= scrollStep;
                if (scrollAmount < 0) {
                    scrollAmount = scrollContainer.scrollWidth / 2 - scrollStep; // Seamless reset on reaching start
                }
                scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
            });
        }
    }
});
