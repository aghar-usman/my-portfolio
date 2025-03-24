document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll(".project-card");
    let currentlyFlipped = null; // Track the currently flipped card

    projectCards.forEach((card) => {
        card.addEventListener("click", () => {
            // If there's a flipped card and it's not the one being clicked, flip it back
            if (currentlyFlipped && currentlyFlipped !== card) {
                currentlyFlipped.classList.remove("flipped");
            }

            // Toggle the clicked card and update the reference
            card.classList.toggle("flipped");
            currentlyFlipped = card.classList.contains("flipped") ? card : null;
        });
    });
});

// Function to open project link in a new tab on double-click
function openProject(url) {
    window.open(url, "_blank");
}
