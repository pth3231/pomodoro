function addZeroPadding(num) {
    return num.toString().padStart(2, '0');
}

class Timer {
  /** 
    * A class implementing timer functionality.
    *
    * @param {HTMLElement} ref_to_html_element - reference to the HTML element where the timer will be displayed
    * @param {number} focus_duration 
    * @param {number} break_duration - duration of the break in milliseconds (default is 5 minutes)
    * @param {number} longbreak_duration - duration of the long break in milliseconds
    * @param {number} delta_time - time interval in milliseconds for the timer (default is 10 ms)
    * 
    * @property {unknown} timer_id
    * @property {number} timer_left - remaining time in milliseconds
    * @property {HTMLElement} ref_to_html_element - reference to the HTML element where the timer will be displayed
    * @property {number} focus_duration - duration of the focus session in milliseconds (default is 25 minutes)
    * @property {number} break_duration - duration of the break in milliseconds (default is 5 minutes)
    * @property {number} longbreak_duration 
    * @property {number} sessions_before_long_break 
    * @method isRunning - checks if the timer is currently running
    * @method start - starts the timer
    * @method pause - pauses the timer
    * @method reset - resets the timer to the initial state
    * @method updateModeDisplay - updates the display of the current mode (focus, break, long break)
    * 
    */

    timer_id;
    timer_left;
    delta_time;
    ref_to_html_element;

    focus_duration;
    break_duration;
    longbreak_duration;

    sessions_before_long_break;
    current_session;
    current_mode;

    constructor(
        ref_to_html_element,
        focus_duration = 25 * 60 * 1000,
        break_duration = 5 * 60 * 1000,
        longbreak_duration = 10 * 60 * 1000,
        delta_time = 100
    ) {
        this.timer_id = null;
        this.ref_to_html_element = ref_to_html_element;
        this.timer_left = focus_duration;
        this.focus_duration = focus_duration;
        this.break_duration = break_duration;
        this.longbreak_duration = longbreak_duration;
        this.sessions_before_long_break = 4;
        this.current_session = 0;
        this.current_mode = 'focus';
        this.delta_time = delta_time;
    }

    isRunning() {
        return this.timer_id !== null;
    }

    start() {
        if (this.isRunning()) {
            this.reset(this.current_mode);
        }

        this.timer_id = setInterval(() => {
            this.timer_left -= this.delta_time;
            this.ref_to_html_element.innerText = toHHMMSS(this.timer_left);

            if (this.timer_left <= 0) {
                this.pause();
                console.log("Timer finished. Current mode:", this.current_mode);
                if (this.current_mode === 'focus') {
                    this.current_session++;
                
                    if (this.current_session % this.sessions_before_long_break === 0) {
                        this.current_mode = 'longbreak';
                        this.timer_left = this.longbreak_duration;
                    } else {
                        this.current_mode = 'break';
                        this.timer_left = this.break_duration;
                    }
                } else {
                    this.current_mode = 'focus';
                    this.timer_left = this.focus_duration;
                }
                
                this.updateModeDisplay();
                this.start();
            }
        }, this.delta_time);
    }
    
    updateModeDisplay() {
        const modeElements = document.querySelectorAll('#mode-display span');
        modeElements.forEach(element => {
            const mode = element.textContent.toLowerCase().replace(' ', '');
            element.setAttribute('aria-selected', mode === this.current_mode);
        });
    }

    pause() {
        if (!this.isRunning()) {
            return;
        }

        clearInterval(this.timer_id);
        this.timer_id = null;
    }

    reset(mode) {
        this.ref_to_html_element.innerText = toHHMMSS(this.focus_duration);
        clearInterval(this.timer_id);
        this.timer_id = null;
        this.current_session = 0;
        this.current_mode = 'focus';
        switch (mode) {
            case 'focus':
                this.timer_left = this.focus_duration;
                break;
            case 'break':
                this.timer_left = this.break_duration;
                break;
            case 'long break':
                this.timer_left = this.longbreak_duration;
                break;
            default:
                this.timer_left = this.focus_duration;
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