const handImages = {
    1: "1.jpg", 2: "2.jpg", 3: "3.jpg", 4: "4.jpg", 5: "5.jpg", 6: "6.jpg",
    7: "7.jpg", 8: "8.jpg", 9: "9.jpg", 10: "10.jpg", 11: "11.jpg", 12: "12.jpg"
};

function updateClock() {
    let now = new Date();
    let hours = now.getHours() % 12 || 12;
    let minutes = Math.floor(now.getMinutes() / 10) * 10;

    document.getElementById("hourHand").src = handImages[hours];
    document.getElementById("minuteHand").src = handImages[Math.floor(minutes / 10) + 1];
}

// Update every minute
setInterval(updateClock, 60000);
updateClock();
