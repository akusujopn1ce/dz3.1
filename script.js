let timeInSeconds = 85; 

const display = document.getElementById('timer-display');

function updateTimer() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    display.textContent = `${formattedMinutes}:${formattedSeconds}`;

    if (timeInSeconds <= 0) {
        clearInterval(timerInterval); 
        return; 
    }

    timeInSeconds--;
}

updateTimer();

const timerInterval = setInterval(updateTimer, 1000);