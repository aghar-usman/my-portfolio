document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll-container");
    const scrollContent = document.querySelector(".scroll-content");

    if (!scrollContainer || !scrollContent) return;

    let scrollSpeed = 1; // Adjust speed as needed
    let isPaused = false;

    // Duplicate items for seamless scrolling
    function duplicateItems() {
        const items = [...scrollContent.children];
        items.forEach((item) => {
            let clone = item.cloneNode(true);
            scrollContent.appendChild(clone);
        });
    }
    duplicateItems();

    // Start scrolling function
    function scrollSkills() {
        if (!isPaused) {
            scrollContainer.scrollLeft += scrollSpeed;

            // Reset scroll when first half is scrolled completely
            if (scrollContainer.scrollLeft >= scrollContent.scrollWidth / 2) {
                scrollContainer.scrollLeft = 0;
            }
        }
        requestAnimationFrame(scrollSkills);
    }

    scrollSkills(); // Start scrolling

    // Pause on hover
    scrollContainer.addEventListener("mouseenter", () => (isPaused = true));
    scrollContainer.addEventListener("mouseleave", () => (isPaused = false));
});
