'use strict';

const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const settingButton = document.getElementById("setting-button");
const exitButton = document.getElementById("exit-window");

let timerInterval = null;

function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

document.addEventListener("DOMContentLoaded", function() {
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

startButton.addEventListener("click", function(event) {
    const timer = document.getElementById("timer");
    let timeLeft = 25 * 60; // 25 minutes in seconds
    timer.innerText = secondsToTime(timeLeft);
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(this);
            timer.innerText = "^0^";
        }

        --timeLeft;
        timer.innerText = secondsToTime(timeLeft);
    }, 1000);
});

resetButton.addEventListener("click", function(event) {
    if (!timerInterval) {
        alert("Timer is not running!");
        return;
    }

    const timer = document.getElementById("timer");
    clearInterval(timerInterval);
    timerInterval = null;
    timer.innerText = "~_~";
});

settingButton.addEventListener("click", function(event) {
    const floatingWindow = document.getElementById("floating-window"); 
    floatingWindow.classList.remove("hidden");
});

exitButton.addEventListener("click", function(event) {
    const floatingWindow = document.getElementById("floating-window");
    floatingWindow.classList.add("hidden");
});