document.addEventListener("DOMContentLoaded", function () {
    const floatingImage = document.getElementById("floating-image");
    const floatingImgTag = floatingImage.querySelector("img");

    document.querySelectorAll(".achievement-card").forEach(card => {
        card.addEventListener("mouseenter", function () {
            const imageUrl = card.querySelector(".achievement-image").src;
            floatingImgTag.src = imageUrl;
            floatingImage.style.display = "block";
            floatingImage.style.opacity = "0"; // Set opacity to 0 before animation

            anime({
                targets: floatingImage,
                opacity: [0, 1],
                scale: [0.5, 1],
                duration: 500,
                easing: "easeOutExpo"
            });
        });

        card.addEventListener("mousemove", function (e) {
            const offsetX = 30; // Offset so it doesn't cover the card
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
