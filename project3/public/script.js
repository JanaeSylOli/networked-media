document.addEventListener("mousemove", (e) => {
    let trail = document.createElement("div");
    trail.classList.add("cursor-trail");
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 500);
});

document.addEventListener("DOMContentLoaded", () => {
    // Easter Egg - Click the bottom-right corner for a scare
    const scareTrigger = document.createElement("div");
    scareTrigger.style.position = "fixed";
    scareTrigger.style.bottom = "10px";
    scareTrigger.style.right = "10px";
    scareTrigger.style.width = "50px";
    scareTrigger.style.height = "50px";
    scareTrigger.style.opacity = "0";
    scareTrigger.style.cursor = "pointer";

    document.body.appendChild(scareTrigger);

    scareTrigger.addEventListener("click", () => {
        let scareImage = document.createElement("img");
        scareImage.src = "/images/scare-face.png";  // Place a scary face in public/images/
        scareImage.style.position = "fixed";
        scareImage.style.top = "50%";
        scareImage.style.left = "50%";
        scareImage.style.transform = "translate(-50%, -50%)";
        scareImage.style.width = "300px";
        scareImage.style.opacity = "0";
        scareImage.style.transition = "opacity 0.5s ease-in-out";

        document.body.appendChild(scareImage);
        setTimeout(() => { scareImage.style.opacity = "1"; }, 100);

        let scareSound = new Audio("/sounds/screech.mp3"); // Add a scary sound to public/sounds/
        scareSound.play();

        setTimeout(() => { scareImage.remove(); }, 2000);
    });
});

setInterval(() => {
    let randomTime = Math.floor(Math.random() * (30000 - 15000)) + 15000; // Every 15-30 seconds
    setTimeout(() => {
        let whisperSound = new Audio("/sounds/whisper.mp3"); // Add a whisper sound in public/sounds/
        whisperSound.play();
    }, randomTime);
}, 30000);

let idleTime = 0;

document.addEventListener("mousemove", () => { idleTime = 0; });
document.addEventListener("keydown", () => { idleTime = 0; });

setInterval(() => {
    idleTime++;
    if (idleTime > 30) { // 30 seconds of inactivity
        let scareSound = new Audio("/sounds/growl.mp3");
        scareSound.play();

        let ghostImage = document.createElement("img");
        ghostImage.src = "/images/ghost.png";  // Add a ghost image in public/images/
        ghostImage.style.position = "fixed";
        ghostImage.style.top = "50%";
        ghostImage.style.left = "50%";
        ghostImage.style.transform = "translate(-50%, -50%)";
        ghostImage.style.width = "250px";
        ghostImage.style.opacity = "0";
        ghostImage.style.transition = "opacity 1s ease-in-out";

        document.body.appendChild(ghostImage);
        setTimeout(() => { ghostImage.style.opacity = "1"; }, 100);

        setTimeout(() => { ghostImage.remove(); }, 3000);
        idleTime = 0;
    }
}, 1000);

window.onload = () => {
    let ambience = new Audio("/sounds/ambience.mp3");  // Add ambient horror sound in public/sounds/
    ambience.loop = true;
    ambience.volume = 0.3;
    ambience.play();
};
