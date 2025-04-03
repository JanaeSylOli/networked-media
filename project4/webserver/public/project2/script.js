
function getImagePath(digit) {
    return `images/${digit}.jpg`; 
}


function updateClock() {
    let now = new Date();

    let hours = String(now.getHours()).padStart(2, "0"); // "05"
    let minutes = String(now.getMinutes()).padStart(2, "0"); // "07"
    let seconds = String(now.getSeconds()).padStart(2, "0"); // "34"

    console.log("Current Time:", hours, minutes, seconds); 
   
    document.getElementById("hoursTens").src = getImagePath(hours[0]);
    document.getElementById("hoursOnes").src = getImagePath(hours[1]);
    document.getElementById("minutesTens").src = getImagePath(minutes[0]);
    document.getElementById("minutesOnes").src = getImagePath(minutes[1]);
    document.getElementById("secondsTens").src = getImagePath(seconds[0]);
    document.getElementById("secondsOnes").src = getImagePath(seconds[1]);
}

// EVERY SECOND, CALL updateClock
setInterval(updateClock, 1000);
updateClock();
