window.addEventListener('DOMContentLoaded', () => {
    let age = document.getElementById('age');
    function showUser(surname, name) {
        alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
    }

    boundShowUser = showUser.bind(age);

    let show = document.getElementById('show');
    show.addEventListener('click', event=>{
        boundShowUser('Eagle', 'John');
    });

});
