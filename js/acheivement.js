document.addEventListener("DOMContentLoaded", function () {
    const floatingImage = document.getElementById("floating-image");

    // ✅ Check if floatingImage exists before accessing it
    if (!floatingImage) {
        console.error("Error: Element with ID 'floating-image' not found.");
        return; // Exit script if element is missing
    }

    const floatingImgTag = floatingImage.querySelector("img");

    document.querySelectorAll(".achievement-card").forEach(card => {
        card.addEventListener("mouseenter", function () {
            const imageElement = card.querySelector(".achievement-image");
            if (!imageElement) return; // ✅ Prevent errors if .achievement-image is missing

            floatingImgTag.src = imageElement.src;
            floatingImage.style.display = "block";
            floatingImage.style.opacity = "0";

            anime({
                targets: floatingImage,
                opacity: [0, 1],
                scale: [0.5, 1],
                duration: 500,
                easing: "easeOutExpo"
            });
        });

        card.addEventListener("mousemove", function (e) {
            const offsetX = 30;
            const offsetY = 20;

            floatingImage.style.left = `${e.pageX + offsetX}px`;
            floatingImage.style.top = `${e.pageY + offsetY}px`;

            anime({
                targets: floatingImage,
                translateX: [e.movementX * 0.3],
                translateY: [e.movementY * 0.3],
                duration: 200,
                easing: "easeOutSine"
            });
        });

        card.addEventListener("mouseleave", function () {
            anime({
                targets: floatingImage,
                opacity: [1, 0],
                scale: [1, 0.8],
                duration: 400,
                easing: "easeInOutSine",
                complete: function () {
                    floatingImage.style.display = "none";
                }
            });
        });
    });
});
