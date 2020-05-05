'use strict';
export default function contact(){
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

    let message = {
        loading: 'Loading...',
        success: ':) Thank you! We will connect you soon.',
        failure: 'Something wrong! :('
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

};