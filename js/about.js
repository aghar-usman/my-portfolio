document.addEventListener("DOMContentLoaded", () => {
    // anime.js for Text Animation
    anime({
        targets: ".about-title",
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 1000,
        easing: "easeOutExpo",
        delay: 500,
    });

    anime({
        targets: ".about-intro, .about-details, .about-skills, .about-goal",
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: "easeOutExpo",
        delay: anime.stagger(200),
    });

    // Handle Window Resize (Optional - Only if needed for other elements)
    window.addEventListener("resize", () => {
        console.log("Window resized");
    });
});
