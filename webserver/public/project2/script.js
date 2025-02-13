const handImages = {
    1: "1.jpg", 2: "2.jpg", 3: "3.jpg", 4: "4.jpg", 5: "5.jpg", 6: "6.jpg",
    7: "7.jpg", 8: "8.jpg", 9: "9.jpg"
};

function updateClock() {
    let now = new Date();
    let hours = now.getHours() % 9 || 9;
    let minutes = Math.floor(now.getMinutes() / 6) + 1;  // to fit 6 steps into 9 images
    let seconds = Math.floor(now.getSeconds() / 6) + 1;

    document.getElementById("hourHand").src = handImages[hours];
    document.getElementById("minuteHand").src = handImages[minutes];
    document.getElementById("secondHand").src = handImages[seconds];
}

// Update every second
setInterval(updateClock, 1000);
updateClock();
