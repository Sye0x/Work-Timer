const timeDisplay = document.querySelector("#timeDisplay");
const totalTimeDisplay = document.querySelector("#totalTimeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let totalElapsedTime = 0; // Stores total accumulated time

startBtn.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);
    }
});

pauseBtn.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});

resetBtn.addEventListener("click", () => {
    totalElapsedTime += elapsedTime; // Add current elapsed time to total
    updateTotalTime(); // Update the total time display

    // Reset everything
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    timeDisplay.textContent = "00:00:00";
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    timeDisplay.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function updateTotalTime() {
    let totalSecs = Math.floor((totalElapsedTime / 1000) % 60);
    let totalMins = Math.floor((totalElapsedTime / (1000 * 60)) % 60);
    let totalHrs = Math.floor((totalElapsedTime / (1000 * 60 * 60)) % 24);

    totalTimeDisplay.textContent = `${pad(totalHrs)}:${pad(totalMins)}:${pad(totalSecs)}`;
}

function pad(unit) {
    return unit < 10 ? "0" + unit : unit;
}
