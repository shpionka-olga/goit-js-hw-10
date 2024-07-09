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
    iconUrl: "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.81 0.219C6.95056 0.0787966 7.14097 4.21785e-05 7.3395 0L16.6605 0C16.859 4.21785e-05 17.0494 0.0787966 17.19 0.219L23.781 6.81C23.9212 6.95056 24 7.14097 24 7.3395V16.6605C24 16.859 23.9212 17.0494 23.781 17.19L17.19 23.781C17.0494 23.9212 16.859 24 16.6605 24H7.3395C7.14097 24 6.95056 23.9212 6.81 23.781L0.219 17.19C0.0787966 17.0494 4.21785e-05 16.859 0 16.6605L0 7.3395C4.21785e-05 7.14097 0.0787966 6.95056 0.219 6.81L6.81 0.219ZM7.65 1.5L1.5 7.65V16.35L7.65 22.5H16.35L22.5 16.35V7.65L16.35 1.5H7.65Z' fill='%23FAFAFB'/%3E%3Cpath d='M6.969 6.969C7.03867 6.89915 7.12143 6.84374 7.21255 6.80593C7.30366 6.76812 7.40135 6.74866 7.5 6.74866C7.59865 6.74866 7.69633 6.76812 7.78745 6.80593C7.87857 6.84374 7.96133 6.89915 8.031 6.969L12 10.9395L15.969 6.969C16.0387 6.89927 16.1215 6.84395 16.2126 6.80621C16.3037 6.76847 16.4014 6.74905 16.5 6.74905C16.5986 6.74905 16.6963 6.76847 16.7874 6.80621C16.8785 6.84395 16.9613 6.89927 17.031 6.969C17.1007 7.03873 17.156 7.12151 17.1938 7.21262C17.2315 7.30373 17.2509 7.40138 17.2509 7.5C17.2509 7.59861 17.2315 7.69626 17.1938 7.78737C17.156 7.87848 17.1007 7.96127 17.031 8.031L13.0605 12L17.031 15.969C17.1007 16.0387 17.156 16.1215 17.1938 16.2126C17.2315 16.3037 17.2509 16.4014 17.2509 16.5C17.2509 16.5986 17.2315 16.6963 17.1938 16.7874C17.156 16.8785 17.1007 16.9613 17.031 17.031C16.9613 17.1007 16.8785 17.156 16.7874 17.1938C16.6963 17.2315 16.5986 17.2509 16.5 17.2509C16.4014 17.2509 16.3037 17.2315 16.2126 17.1938C16.1215 17.156 16.0387 17.1007 15.969 17.031L12 13.0605L8.031 17.031C7.96127 17.1007 7.87848 17.156 7.78737 17.1938C7.69626 17.2315 7.59861 17.2509 7.5 17.2509C7.40138 17.2509 7.30373 17.2315 7.21262 17.1938C7.12151 17.156 7.03873 17.1007 6.969 17.031C6.89927 16.9613 6.84395 16.8785 6.80621 16.7874C6.76847 16.6963 6.74905 16.5986 6.74905 16.5C6.74905 16.4014 6.76847 16.3037 6.80621 16.2126C6.84395 16.1215 6.89927 16.0387 6.969 15.969L10.9395 12L6.969 8.031C6.89915 7.96133 6.84374 7.87857 6.80593 7.78745C6.76812 7.69633 6.74866 7.59865 6.74866 7.5C6.74866 7.40135 6.76812 7.30366 6.80593 7.21255C6.84374 7.12143 6.89915 7.03867 6.969 6.969Z' fill='%23FAFAFB'/%3E%3C/svg%3E",
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