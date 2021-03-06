export default function timer() {
    'use strict';
    let deadline = '2020-05-01';
    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()), // delta time
            seconds = Math.floor(t / 1000) % 60,
            minutes = Math.floor(t / 1000 / 60) % 60,
            hours = Math.floor(t / 1000 / 60 / 60);

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            t = getTimeRemaining(endTime);

        if (t.total <= 0) {
            hours.textContent = '0';
            minutes.textContent = '00';
            seconds.textContent = '00';
        } else {
            let timeInterval = setInterval(() => {
                t = getTimeRemaining(endTime);
                hours.textContent = t.hours;
                minutes.textContent = t.minutes.toString().padStart(2, '0');
                seconds.textContent = t.seconds.toString().padStart(2, '0');
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }, 1000);
        }
    }

    setClock('timer', deadline);
};