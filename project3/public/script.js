document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            let audio = new Audio('/sounds/creepy-sound.mp3');
            audio.play();
        });
    });
});
