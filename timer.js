class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = document.querySelector(selector);
        this.targetDate = new Date(targetDate);
    }
    start() {
        this.intervalId = setInterval(() => {
            this.currentDate = Date.now();
            this.time = this.targetDate - this.currentDate;
            if (this.time <= 0) {
                clearInterval(this.intervalId);
                this.time = 0;
            }
            this.timeConverter();
            this.interface(this.time);
        }, 1000);
    }           
    pad(value) {
        return String(value).padStart(2, '0');
    }
    timeConverter() {
        this.days = Math.floor(this.time / (1000 * 60 * 60 * 24));
        this.hours = Math.floor(
            (this.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        this.mins = Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60));
        this.secs = Math.floor((this.time % (1000 * 60)) / 1000);
    }
    interface() {
        this.refs = {
            days: document.querySelector('[data-value=days]'),
            hours: document.querySelector('[data-value=hours]'),
            mins: document.querySelector('[data-value=mins]'),
            secs: document.querySelector('[data-value=secs]'),
        };
        this.refs.days.textContent = this.days;
        this.refs.hours.textContent = this.pad(this.hours);
        this.refs.mins.textContent = this.pad(this.mins);
        this.refs.secs.textContent = this.pad(this.secs);
    }
}

const countdownTimer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: 'jan 1, 2021',
});

document.addEventListener(
    'DOMContentLoaded',
    countdownTimer.start.bind(countdownTimer),
  );