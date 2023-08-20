//  burger menu
const burgerBtn = document.getElementById('burger');
const header = document.querySelector('.header');
burgerBtn.addEventListener('click', function() {
    header.classList.toggle('header-burger');
});

const navMenu = document.querySelector('.header__nav');
navMenu.addEventListener('click', function() {
    header.classList.remove('header-burger');
})

navMenu.addEventListener('click', (event) => {
    event._isClickOnTheMenu = true;
});
burgerBtn.addEventListener('click', (event) => {
    event._isClickOnTheMenu = true;
});

document.body.addEventListener('click', (event) => {
    if (event._isClickOnTheMenu) {
        return;
    }
    header.classList.remove('header-burger');
});