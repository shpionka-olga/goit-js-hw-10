
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const makePromise = ({ delay, stateValue }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (stateValue) {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
};

const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formInEvent = event.target;
    const delayValue = formInEvent.elements.delay.value;
    const stateValue = formInEvent.elements.state.value;
    console.log("delay" + delayValue);
    if (delayValue === "") {
        return;
    }
    formInEvent.reset();

    makePromise({ delay: delayValue, stateValue: stateValue === 'fulfilled' })
        .then(delay => {
            const iziToastOptions = {
                message: `Fulfilled promise in ${delay} ms`,
                backgroundColor: '#59a10d',
                iconUrl: '../img/success.svg',
                title: 'OK',
                theme: 'dark',
                titleLineHeight: '1.5',
                titleSize: '16px',
                messageLineHeight: '1.5',
                messageSize: '16px',
            };
            iziToast.success(iziToastOptions);
        })
        .catch(delay => {
            const iziToastOptions = {
                message: `Rejected promise in ${delay} ms`,
                backgroundColor: '#ef4040',
                iconUrl: '../img/error-img.svg',
                titleLineHeight: '1.5',
                titleSize: '16px',
                messageLineHeight: '1.5',
                messageSize: '16px',
            };
            iziToast.error(iziToastOptions)
        });
});






