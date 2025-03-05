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
    if (!paused) {
        // Add only the actual running time to total
        totalElapsedTime += Date.now() - startTime;
        localStorage.setItem("totalElapsedTime", totalElapsedTime);
    }

    // Reset timer state
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    localStorage.removeItem("startTime");
    updateTotalTime();
    timeDisplay.textContent = "00:00:00";
});


// Double-click to reset total time
totalTimeDisplay.addEventListener("dblclick", () => {
    totalElapsedTime = 0; // Reset total elapsed time
    localStorage.setItem("totalElapsedTime", totalElapsedTime); // Save to LocalStorage
    updateTotalTime(); // Update display
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
