'use strict';
export default function slider() {
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
}