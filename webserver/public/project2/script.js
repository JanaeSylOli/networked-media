function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('hoursTens').src = `images/${hours[0]}.jpg`;
    document.getElementById('hoursOnes').src = `images/${hours[1]}.jpg`;
    document.getElementById('minutesTens').src = `images/${minutes[0]}.jpg`;
    document.getElementById('minutesOnes').src = `images/${minutes[1]}.jpg`;
    document.getElementById('secondsTens').src = `images/${seconds[0]}.jpg`;
    document.getElementById('secondsOnes').src = `images/${seconds[1]}.jpg`;
}

setInterval(updateClock, 1000);
updateClock();
