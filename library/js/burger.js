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
});

profileCard.addEventListener('click', function() {
    profileCard.classList.toggle('profile__card-visible');
});

profileCard.addEventListener('click', (event) => {
    event._isClickOnTheProfile = true;
});

burgerBtn.addEventListener('click', function() {
    header.classList.toggle('header-burger');
    showModal();
});

const navMenu = document.querySelector('.header__nav');
navMenu.addEventListener('click', function() {
    header.classList.remove('header-burger');
    hideModal();
})

navMenu.addEventListener('click', (event) => {
    event._isClickOnTheMenu = true;
});
burgerBtn.addEventListener('click', (event) => {
    event._isClickOnTheMenu = true;
});

function checkCkickOnBurgerMenu(event) {
    if (event._isClickOnTheMenu) {
        profileCard.classList.remove('profile__card-visible');
        return true;
    }
    header.classList.remove('header-burger');
}

function checkCkickOnProfileMenu(event) {
    if (event._isClickOnTheProfile) {
        header.classList.remove('header-burger');
        return true;
    }
    profileCard.classList.remove('profile__card-visible');
}

function checkCkickOnModalForm(event) {
    if (event._isClickOnTheButtonSubmit) {
        hideModal(event.target.closest('.modal__background'));
        return false;
    }
    if (event._isClickOnModalForm) {
        return true;
    }
    clearForm(modalRegister, '.register__form__input', 'register__form__input');
    // clearForm(modalLogin);
    hideModal(event.target.closest('.modal__background'));
}

document.body.addEventListener('click', (event) => {
    if (checkCkickOnBurgerMenu(event)) {
        return;
    }
    if (checkCkickOnProfileMenu(event)) {
        return;
    }
    if (checkCkickOnModalForm(event)) {
        return;
    }
});