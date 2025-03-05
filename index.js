const timeDisplay = document.querySelector("#timeDisplay");
const totalTimeDisplay = document.querySelector("#totalTimeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = localStorage.getItem("startTime")
    ? parseInt(localStorage.getItem("startTime"))
    : 0;
let elapsedTime = 0;
let paused = true;
let intervalId;

// Retrieve total elapsed time from LocalStorage
let totalElapsedTime = localStorage.getItem("totalElapsedTime")
    ? parseInt(localStorage.getItem("totalElapsedTime"))
    : 0;

updateTotalTime(); // Display total time on page load
restoreTimer(); // Check if timer was running before closing the tab

startBtn.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        localStorage.setItem("startTime", startTime); // Save start time
        intervalId = setInterval(updateTime, 1000);
    }
});

pauseBtn.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
        localStorage.removeItem("startTime"); // Remove start time when paused
    }
});

resetBtn.addEventListener("click", () => {
    totalElapsedTime += Date.now() - startTime; // Add running time to total
    localStorage.setItem("totalElapsedTime", totalElapsedTime); // Store total time

    // Reset everything
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    localStorage.removeItem("startTime"); // Remove stored start time
    updateTotalTime();
    timeDisplay.textContent = "00:00:00";
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    let secs = Math.floor((elapsedTime / 1000) % 60);
    let mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    timeDisplay.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function updateTotalTime() {
    let totalSecs = Math.floor((totalElapsedTime / 1000) % 60);
    let totalMins = Math.floor((totalElapsedTime / (1000 * 60)) % 60);
    let totalHrs = Math.floor((totalElapsedTime / (1000 * 60 * 60)) % 24);

    totalTimeDisplay.textContent = `${pad(totalHrs)}:${pad(totalMins)}:${pad(totalSecs)}`;
}

// Restore timer if browser was closed
function restoreTimer() {
    if (localStorage.getItem("startTime")) {
        startTime = parseInt(localStorage.getItem("startTime"));
        paused = false;
        intervalId = setInterval(updateTime, 1000);
    }
}

// Helper function to format time
function pad(unit) {
    return unit < 10 ? "0" + unit : unit;
}
