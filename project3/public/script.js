document.addEventListener("DOMContentLoaded", function() {
    // Auto-scrolling leaderboard
    const leaderboard = document.querySelector(".scrolling-leaderboard");
    let scrollSpeed = 1;
    function scrollLeaderboard() {
        if (leaderboard) {
            leaderboard.scrollTop += scrollSpeed;
            if (leaderboard.scrollTop + leaderboard.clientHeight >= leaderboard.scrollHeight || leaderboard.scrollTop === 0) {
                scrollSpeed *= -1; // Reverse direction at the top or bottom
            }
        }
    }
    setInterval(scrollLeaderboard, 50);
    
    // Button hover animation
    const buttons = document.querySelectorAll(".cta, .secondary-cta");
    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.boxShadow = "0 0 20px rgba(0, 255, 204, 0.7)";
        });
        button.addEventListener("mouseleave", () => {
            button.style.boxShadow = "none";
        });
    });
    
    // Flickering dark mode effect
    function flickerEffect() {
        document.body.style.backgroundColor = "#080808";
        setTimeout(() => {
            document.body.style.backgroundColor = "#0a0a0a";
        }, Math.random() * 500 + 200);
    }
    setInterval(flickerEffect, 5000);
});
