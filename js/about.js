// about.js
document.addEventListener("DOMContentLoaded", () => {
    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("about-canvas"), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x38bdf8, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Add Geometry
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0x38bdf8,
        shininess: 100,
        transparent: true,
        opacity: 0.8,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Camera Position
    camera.position.z = 5;

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    };
    animate();

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

    // Handle Window Resize
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});