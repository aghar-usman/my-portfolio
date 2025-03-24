document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll(".project-card");

    // Toggle flip effect on click
    projectCards.forEach((card) => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });
});

// Function to open project link in a new tab
function openProject(url) {
    window.open(url, "_blank");
}
