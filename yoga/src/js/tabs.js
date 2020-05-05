export default function tabs() {
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
}