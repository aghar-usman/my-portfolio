document.addEventListener("DOMContentLoaded", () => {
    const planets = document.querySelectorAll(".planet");
    const detailsBox = document.getElementById("detailsBox");
    const closeBtn = document.getElementById("closeBtn");
    const titleElement = document.getElementById("institutionTitle");
    const descriptionElement = document.getElementById("institutionDescription");

    let activePlanet = null; // Track currently active planet
    let longPressTimer = null; // Timer for detecting long press

    // Experience Data with Official Website URLs
    const experienceData = {
        2: { 
            title: "Team Thai", 
            description: `
                <p><strong>📅 Internship Duration:</strong> Feb 2025 - May 2025</p>
                <p><strong>💼 Role:</strong> AI Intern</p>
                <p>Working as an AI Intern, Developed an AI-powered internal support chatbot to automate employee queries using natural language.
                Improved response times and streamlined access to company data through a secure, scalable system.</p>
            `,
            website: "https://www.teamthai.in/" // 🔗 Official website
        }
    };

    // Show Details on Click (Planet Click)
    planets.forEach(planet => {
        planet.addEventListener("click", () => {
            const planetId = planet.getAttribute("data-planet");

            // Toggle: If same planet is clicked again, close the box
            if (activePlanet === planet) {
                closeDetailsBox();
                return;
            }

            // Set active planet
            activePlanet = planet;

            // Update content dynamically
            titleElement.innerHTML = `<span class="institution-name">${experienceData[planetId].title}</span>`;
            descriptionElement.innerHTML = experienceData[planetId].description;

            // Show details box (ensuring smooth appearance)
            detailsBox.style.display = "flex";
            setTimeout(() => {
                detailsBox.classList.add("visible");
            }, 10); // Small delay for visual smoothness

            // Remove highlight from all planets, highlight only selected one
            planets.forEach(p => p.classList.remove("selected"));
            planet.classList.add("selected");
        });

        // Open Website on Long Press (Mobile) or Double Click (Desktop)
        const logo = planet.querySelector(".planet-circle img");
        if (logo) {
            // Desktop: Open on Double Click
            logo.addEventListener("dblclick", (event) => {
                event.stopPropagation(); // Prevent click event from triggering planet click
                const planetId = planet.getAttribute("data-planet");
                if (experienceData[planetId]?.website) {
                    window.open(experienceData[planetId].website, "_blank"); // Open link in new tab
                }
            });

            // Mobile: Open on Long Press (Hold for 800ms)
            logo.addEventListener("touchstart", (event) => {
                longPressTimer = setTimeout(() => {
                    const planetId = planet.getAttribute("data-planet");
                    if (experienceData[planetId]?.website) {
                        window.open(experienceData[planetId].website, "_blank");
                    }
                }, 800); // 800ms hold opens the website
            });

            // Cancel long press if user lifts finger before 800ms
            logo.addEventListener("touchend", () => {
                clearTimeout(longPressTimer);
            });

            logo.addEventListener("touchmove", () => {
                clearTimeout(longPressTimer); // Cancels long press if user scrolls
            });
        }
    });

    // Close the Details Box when close button is clicked
    closeBtn.addEventListener("click", closeDetailsBox);

    // Close if Clicked Outside the Box
    window.addEventListener("click", (event) => {
        if (!detailsBox.contains(event.target) && !event.target.closest(".planet")) {
            closeDetailsBox();
        }
    });

    // Close on ESC Key Press
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeDetailsBox();
        }
    });

    // Function to Close the Details Box
    function closeDetailsBox() {
        detailsBox.classList.remove("visible");
        setTimeout(() => {
            detailsBox.style.display = "none";
        }, 200); // Small delay to match CSS transition
        planets.forEach(p => p.classList.remove("selected"));
        activePlanet = null; // Reset active planet
    }
});
