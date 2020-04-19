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
            }, 1000);
        }
    }

    setClock('timer', deadline);

    let more = document.querySelector('button.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptionBtn = document.querySelectorAll('.description-btn');

    more.addEventListener('click', showMoreModal);

    descriptionBtn.forEach(element => {
        element.addEventListener('click', showMoreModal);
    });

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

    ///////////////////////////////////////////
    let message = {
        loading: 'Loading...',
        success: ':) Thank you! We will connect you soon.',
        failure: 'Somthing wrong! :('
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', event=> {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'http://127.0.0.1:5000/server');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        statusMessage.innerHTML = message.loading;

        request.addEventListener('readystatechange', event => {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        let formData = new FormData(form);
        let obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);
        request.send(json);

        for (let i=0; i<input.length; i++) {
            input[i].value = '';
        }
    });

    // slider
    let slideIndex = 0,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    function showSlides(index) {
        if (index >= slides.length) {
            slideIndex = index = 0;
        }
        if (index < 0) {
            slideIndex = index = slides.length - 1;
        }
        slides.forEach(item => { item.style.display = 'none'; });
        dots.forEach(item => { item.classList.remove('dot-active')});
        slides[index].style.display = 'block';
        dots[index].classList.add('dot-active');
    };

    function nextSlide(n){
        showSlides(slideIndex += n);
    };

    function gotoSlide(n){
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', ()=>{
        nextSlide(-1)
    });

    next.addEventListener('click', ()=>{
        nextSlide(1)
    });

    dotsWrap.addEventListener('click', e => {
        for (let i = 0; i < dots.length; i++) {
            const element = dots[i];
            if (e.target.classList.contains('dot') && e.target == element){
                gotoSlide(i);
            }
        }
    });

    showSlides(slideIndex);

});