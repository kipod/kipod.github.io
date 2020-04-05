window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function showTabContent(showIdx) {
        for (let i = 0; i < tabContent.length; i++) {
            let classes = tabContent[i].classList;
            if (i == showIdx) {
                if (classes.contains('hide')) {
                    classes.add('show');
                    classes.remove('hide');
                }
            } else {
                if (!classes.contains('hide')) {
                    classes.remove('show');
                    classes.add('hide');
                }
            }
        }
    }

    showTabContent(0);

    info.addEventListener('mouseover', event => {
        const target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    showTabContent(i);
                }
            }
        }
    });

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
            }, 1000)
        }
    }

    setClock('timer', deadline);

    let more = document.querySelector('button.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', () => {
        showMoreModal();
    });

    // close.addEventListener('click', () => {
    //     more.classList.remove('more-splash');
    //     overlay.style.display = 'none';
    //     document.body.style.overflow = '';
    // });

    function showMoreModal() {
        overlay.style.display = 'block';
        more.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
        close.onclick = function () {
            more.classList.remove('more-splash');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        };
    }
});