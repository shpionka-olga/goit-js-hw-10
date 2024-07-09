import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";


let chosenDate = null;
const iziToastOptions = {
    title: 'Error',
    theme: 'dark',
    backgroundColor: '#ef4040',
    titleColor: '#ffffff',
    messageColor: '#ffffff',
    iconColor: '#ffffff',
    titleLineHeight: '1.5',
    titleSize: '16px',
    messageLineHeight: '1.5',
    messageSize: '16px',
    iconUrl: '../img/error-img.svg',
    message: 'Please choose a date in the future',
};

const optionsFlatpickr = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    locale: {
        firstDayOfWeek: 1,// start week on Monday
        weekdays: {
            shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        }
    },
    //minDate: "today", //не дає вибрати минулу дату
    onClose(selectedDates) {
        const buttonStart = document.querySelector('button[data-start]');
        if (selectedDates[0] < Date.now()) {
            iziToast.error(iziToastOptions);
            chosenDate = null;
            if (buttonStart.getAttribute('disabled') == null) {
                buttonStart.setAttribute('disabled', '');
                buttonStart.className = 'is-disabled';
            }
        } else {
            chosenDate = selectedDates[0];
            console.log(selectedDates[0]);
            buttonStart.removeAttribute('disabled');
            buttonStart.removeAttribute('class');
        }
    },
};


const dateTimePicker = document.getElementById("datetime-picker");
console.log(dateTimePicker);
flatpickr(dateTimePicker, optionsFlatpickr);

const buttonStart = document.querySelector('button[data-start]');


function onStartTimer(event) {
    if (chosenDate != null) {
        //disabled button 
        event.target.setAttribute('disabled', '');
        event.target.className = 'is-disabled';

        //disabled input
        dateTimePicker.setAttribute('disabled', '');
        dateTimePicker.className = 'is-disabled';

        //start timer
        let diffTime = 0;
        let diffTimeObject = null;
        let diffTimeObjectString = null;

        const daysSpan = document.querySelector('.value[data-days]');
        const hoursSpan = document.querySelector('.value[data-hours]');
        const minutesSpan = document.querySelector('.value[data-minutes]');
        const secondsSpan = document.querySelector('.value[data-seconds]');

        const timerInterval = setInterval(function () {
            diffTime = chosenDate.getTime() - Date.now();
            if (diffTime <= 0) {
                stopTimer(timerInterval, event.target, dateTimePicker);
            } else {
                diffTimeObject = convertMs(diffTime);
                diffTimeObjectString = addLeadingZero(diffTimeObject);
                daysSpan.textContent = diffTimeObjectString.days;
                hoursSpan.textContent = diffTimeObjectString.hours;
                minutesSpan.textContent = diffTimeObjectString.minutes;
                secondsSpan.textContent = diffTimeObjectString.seconds;
            }

        }, 1000)

    }

}

buttonStart.addEventListener('click', onStartTimer);

function stopTimer(timerInterval, buttonEl, inputEl) {
    console.log("Timer ended");
    clearInterval(timerInterval);

    buttonEl.removeAttribute('disabled');
    buttonEl.removeAttribute('class');

    inputEl.removeAttribute('disabled');
    inputEl.removeAttribute('class');
}

function addLeadingZero(value) {
    const days = value.days.toString().padStart(2, '0');
    const hours = value.hours.toString().padStart(2, '0');
    const minutes = value.minutes.toString().padStart(2, '0');
    const seconds = value.seconds.toString().padStart(2, '0');
    return { days, hours, minutes, seconds };
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}