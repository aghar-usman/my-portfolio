// Ensure Three.js is available globally
if (typeof THREE === "undefined") {
    console.error("Three.js is not loaded. Check your script tags.");
}

// Setup Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".hero").appendChild(renderer.domElement);

// Create floating neon particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 800;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

// Use a mix of green and blue particles for a dynamic neon effect
const colors = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount; i++) {
    const color = Math.random() > 0.5 ? new THREE.Color("#4ade80") : new THREE.Color("#38bdf8"); // Green & Blue mix
    colors.set(color.toArray(), i * 3);
}
particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleSystem);
camera.position.z = 5;

// Animation loop with continuous motion
function animateParticles() {
    particleSystem.rotation.y += 0.002; // Slow rotation
    particleSystem.rotation.x += 0.001; // Adds a slight wave effect
    renderer.render(scene, camera);
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Handle window resize for responsiveness
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Anime.js - Digital Glitch Effect on Hero Text
if (typeof anime === "undefined") {
    console.error("Anime.js is not loaded. Check your script tags.");
} else {
    anime.timeline({ loop: true })
        .add({
            targets: ".hero-content h1 span",
            translateY: [-10, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 800,
            color: "#4ade80" // Neon Green Effect
        })
        .add({
            targets: ".hero-content h1 span",
            opacity: [1, 0.7],
            easing: "easeInExpo",
            duration: 600,
            delay: 500,
            color: "#38bdf8" // Neon Blue Effect
        });
}
