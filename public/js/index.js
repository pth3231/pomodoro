'use strict';

import { Timer, toHHMMSS } from './libs/timer.js';

const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const settingButton = document.getElementById("setting-button");
const exitButton = document.getElementById("exit-window");

const timerElement = document.getElementById("timer");

// Timer functionality - Start and pause
const focusTimer = new Timer(
    timerElement,
);

// Timer settings - Tab changing functionality
document.addEventListener("DOMContentLoaded", function() {
    timerElement.innerText = toHHMMSS(focusTimer.focusDuration);

    const tabs = document.querySelectorAll(".tab");
    const sections = document.querySelectorAll(".section");

    tabs.forEach((tab) => {
        tab.addEventListener("click", function() {
            tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
            sections.forEach((s) => s.classList.add("hidden"));

            tab.setAttribute("aria-selected", "true");
            const sectionId = tab.getAttribute("data-section");
            document.getElementById(sectionId).classList.remove("hidden");
        });
    });
});

settingButton.addEventListener("click", function(event) {
    const floatingWindow = document.getElementById("floating-window"); 
    floatingWindow.classList.remove("hidden");
});

exitButton.addEventListener("click", function(event) {
    const floatingWindow = document.getElementById("floating-window");
    floatingWindow.classList.add("hidden");
});

startButton.addEventListener("click", function(event) {
    if (focusTimer.isRunning()) {
        focusTimer.pause();
        event.target.innerText = "Start";
        return;
    }

    focusTimer.start();
    console.log("Current time left (ms):", focusTimer.timeLeft);
    event.target.innerText = "Pause";
});

resetButton.addEventListener("click", function(event) {
    timerElement.innerText = toHHMMSS(focusTimer.focusDuration);
    focusTimer.reset('focus');
    startButton.innerText = "Start";
});