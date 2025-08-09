function addZeroPadding(num) {
    return num.toString().padStart(2, '0');
}

class Timer {
  /** 
    * A class implementing timer functionality.
    *
    * @param {HTMLElement} refToHTMLElement - reference to the HTML element where the timer will be displayed
    * @param {number} focusDuration 
    * @param {number} breakDuration - duration of the break in milliseconds (default is 5 minutes)
    * @param {number} longBreakDuration - duration of the long break in milliseconds
    * @param {number} deltaTime - time interval in milliseconds for the timer (default is 10 ms)
    * @property {unknown} timerID
    * @property {number} timeLeft - remaining time in milliseconds
    * @property {HTMLElement} refToHTMLElement - reference to the HTML element where the timer will be displayed
    * @property {number} focusDuration - duration of the focus session in milliseconds (default is 25 minutes)
    * @property {number} breakDuration - duration of the break in milliseconds (default is 5 minutes)
    * @method isRunning - checks if the timer is currently running
    * @method start - starts the timer
    * @method pause - pauses the timer
    * @method reset - resets the timer to the initial state
    * @method updateModeDisplay - updates the display of the current mode (focus, break, long break)
    * 
    */

    timerID;
    timeLeft;
    deltaTime;
    refToHTMLElement;

    focusDuration;
    breakDuration;
    longBreakDuration;

    sessionBeforeLongBreak;
    currentSession;
    currentMode;

    constructor(
        refToHTMLElement,
        focusDuration = 25 * 60 * 1000,
        breakDuration = 5 * 60 * 1000,
        longBreakDuration = 10 * 60 * 1000,
        deltaTime = 100
    ) {
        this.timerID = null;
        this.refToHTMLElement = refToHTMLElement;
        this.timeLeft = focusDuration;
        this.focusDuration = focusDuration;
        this.breakDuration = breakDuration;
        this.longBreakDuration = longBreakDuration;
        this.sessionsBeforeLongBreak = 4;
        this.currentSession = 0;
        this.currentMode = 'focus';
        this.deltaTime = deltaTime;
    }

    isRunning() {
        return this.timerID !== null;
    }

    start() {
        if (this.isRunning()) {
            this.reset(this.currentMode);
        }

        this.timerID = setInterval(() => {
            this.timeLeft -= this.deltaTime;
            this.refToHTMLElement.innerText = toHHMMSS(this.timeLeft);

            if (this.timeLeft <= 0) {
                this.pause();
                console.log("Timer finished. Current mode:", this.currentMode);
                if (this.currentMode === 'focus') {
                    this.currentSession++;
                
                    if (this.currentSession % this.sessionsBeforeLongBreak === 0) {
                        this.currentMode = 'longbreak';
                        this.timeLeft = this.longBreakDuration;
                    } else {
                        this.currentMode = 'break';
                        this.timeLeft = this.breakDuration;
                    }
                } else {
                    this.currentMode = 'focus';
                    this.timeLeft = this.focusDuration;
                }
                
                this.updateModeDisplay();
                this.start();
            }
        }, this.deltaTime);
    }
    
    updateModeDisplay() {
        const modeElements = document.querySelectorAll('#mode-display span');
        modeElements.forEach(element => {
            const mode = element.textContent.toLowerCase().replace(' ', '');
            element.setAttribute('aria-selected', mode === this.currentMode);
        });
    }

    pause() {
        if (!this.isRunning()) {
            return;
        }

        clearInterval(this.timerID);
        this.timerID = null;
    }

    reset(mode) {
        this.refToHTMLElement.innerText = toHHMMSS(this.focusDuration);
        clearInterval(this.timerID);
        this.timerID = null;
        this.currentSession = 0;
        this.currentMode = 'focus';
        switch (mode) {
            case 'focus':
                this.timeLeft = this.focusDuration;
                break;
            case 'break':
                this.timeLeft = this.breakDuration;
                break;
            case 'long break':
                this.timeLeft = this.longBreakDuration;
                break;
            default:
                this.timeLeft = this.focusDuration;
        }
        this.updateModeDisplay();
    }
}

function toHHMMSS(time) {
    let t = Math.floor(time / 1000);
    const hours = Math.floor(t / 3600);
    t %= 3600;
    const minutes = Math.floor(t / 60);
    const secs = t % 60;

    return `${hours > 0 ? hours + ':' : ''}${addZeroPadding(minutes)}:${addZeroPadding(secs)}`;
}

export {
    Timer,
    toHHMMSS,
};