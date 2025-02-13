function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');   // Ensures 2 digits
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Function to get the correct image path for a digit
    function getImagePath(digit) {
        return `images/${digit}.jpg`; 
    }

    document.getElementById('hoursTens').src = getImagePath(hours[0]);
    document.getElementById('hoursOnes').src = getImagePath(hours[1]);
    document.getElementById('minutesTens').src = getImagePath(minutes[0]);
    document.getElementById('minutesOnes').src = getImagePath(minutes[1]);
    document.getElementById('secondsTens').src = getImagePath(seconds[0]);
    document.getElementById('secondsOnes').src = getImagePath(seconds[1]);
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock();
