'use strict';

import { Timer, toHHMMSS } from './libs/timer.js';

const start_button = document.getElementById("start-button");
const reset_button = document.getElementById("reset-button");
const setting_button = document.getElementById("setting-button");
const exit_button = document.getElementById("exit-window");

const timer_element = document.getElementById("timer");

// Timer functionality - Start and pause
const focus_timer = new Timer(
    timer_element,
);

// Timer settings - Tab changing functionality
document.addEventListener("DOMContentLoaded", function() {
    timer_element.innerText = toHHMMSS(focus_timer.focus_duration);

    const tabs = document.querySelectorAll(".tab");
    const sections = document.querySelectorAll(".section");

    tabs.forEach((tab) => {
        tab.addEventListener("click", function() {
            tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
            sections.forEach((s) => s.classList.add("hidden"));

            tab.setAttribute("aria-selected", "true");
            const section_id = tab.getAttribute("data-section");
            document.getElementById(section_id).classList.remove("hidden");
        });
    });
});

setting_button.addEventListener("click", function(event) {
    const floating_window = document.getElementById("floating-window"); 
    floating_window.classList.remove("hidden");
});

exit_button.addEventListener("click", function(event) {
    const floating_window = document.getElementById("floating-window");
    floating_window.classList.add("hidden");
});

start_button.addEventListener("click", function(event) {
    if (focus_timer.isRunning()) {
        focus_timer.pause();
        event.target.innerText = "Start";
        return;
    }

    focus_timer.start();
    console.log("Current time left (ms):", focus_timer.time_left);
    event.target.innerText = "Pause";
});

reset_button.addEventListener("click", function(event) {
    timer_element.innerText = toHHMMSS(focus_timer.focus_duration);
    focus_timer.reset('focus');
    start_button.innerText = "Start";
});