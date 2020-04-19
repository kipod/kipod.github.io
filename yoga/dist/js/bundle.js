/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map