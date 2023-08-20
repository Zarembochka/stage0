//  burger menu
const burgerBtn = document.querySelector('.burger-btn');
const header = document.querySelector('.header');

const profileButton = document.querySelector('.header__profile');
const profileCard = document.querySelector('.profile__card');

profileButton.addEventListener('click', function() {
    profileCard.classList.toggle('profile__card-visible');
});

profileButton.addEventListener('click', (event) => {
    event._isClickOnTheProfile = true;
})

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
        profileCard.classList.remove('profile__card-visible');
        return;
    }
    header.classList.remove('header-burger');
    if (event._isClickOnTheProfile) {
        return;
    }
    profileCard.classList.remove('profile__card-visible');
});