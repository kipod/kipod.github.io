import tabs from './tabs';
import timer from './timer';
import contact from './contact';
import slider from './slider';

// require('es6-promise').polyfill();
require('nodelist-foreach-polyfill');
require('formdata-polyfill');


window.addEventListener('DOMContentLoaded', () => {
    tabs();
    timer();
    contact();
    slider();
});
