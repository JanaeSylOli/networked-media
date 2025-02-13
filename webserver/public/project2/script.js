const emojiHands = {
    1: "🕐", 2: "🕑", 3: "🕒", 4: "🕓", 5: "🕔", 6: "🕕",
    7: "🕖", 8: "🕗", 9: "🕘"
};

function updateClock() {
    let now = new Date();
    let hours = now.getHours() % 9 || 9;
    let minutes = Math.floor(now.getMinutes() / 6) + 1;  // to fit 6 steps into 9 emojis
    let seconds = Math.floor(now.getSeconds() / 6) + 1;

    document.getElementById("hourHand").textContent = emojiHands[hours];
    document.getElementById("minuteHand").textContent = emojiHands[minutes];
    document.getElementById("secondHand").textContent = emojiHands[seconds];
}

// Update every second
setInterval(updateClock, 1000);
updateClock();