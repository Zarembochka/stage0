const modalRegister = document.querySelector('.modal__register');
const modalRegisterClose = document.querySelector('.register__close');

const signinBtn = document.querySelectorAll('.btn-signin');
const loginBtn = document.querySelectorAll('.btn-login');
const buyBtn = document.querySelectorAll('.favorites__book__btn-buy');

const modalLogin = document.querySelector('.modal__login');
const modalLoginClose = document.querySelector('.login__close');

const modalsForms = document.querySelectorAll('.modal');

const myprofileBtn = document.querySelectorAll('.btn-myprofile');
const modalMyprofileClose = document.querySelector('.myprofile__close');

const modalBuyLibraryCardClose = document.querySelector('.buycard__close');
const copyBtn = document.querySelector('.myprofile__btn-copy');

const footerLoginBtn = document.querySelector('.footer__btn-login');
const footerRegisterBtn = document.querySelector('.footer__btn-register');

function calcRightPadding() {
    return window.innerWidth - document.body.clientWidth + 'px';
}

function showModal(form) {
    if (form !== undefined) {
        form.classList.toggle('modal__background-active');
    }
    document.body.style.paddingRight = calcRightPadding();
    document.body.classList.toggle('modal-actile');
}

function checkClick(form) {
    form.addEventListener('click', (event) => {
        event._isClickOnModalForm = true;
    })
}

modalsForms.forEach((element) => checkClick(element));

function hideModal(form) {
    if (form !== undefined && form !== null) {
        form.classList.remove('modal__background-active');
    }
    document.body.style.paddingRight = '';
    document.body.classList.remove('modal-actile');
}

signinBtn.forEach((element) => {
    element.addEventListener('click', function() {
        clearLibrarycardTimeout();
        showModal(modalRegister);
    });
    element.addEventListener('click', (event) => {
        event._isClickOnTheProfile = true;
    });
});

modalRegisterClose.addEventListener('click', function() {
    clearForm(modalRegister, '.register__form__input', 'register__form__input');
    hideModal(modalRegister);
});

footerLoginBtn.addEventListener('click', function(event) {
    const modalRegister = document.querySelector('.modal__register');
    clearForm(modalRegister, '.register__form__input', 'register__form__input');
    hideModal(modalRegister);
    const modalForm = document.querySelector('.modal__login');
    showModal(modalForm);
    event._isClickOnTheProfile = true;
});

footerRegisterBtn.addEventListener('click', function(event) {
    const modalForm = document.querySelector('.modal__login');
    clearForm(modalForm, '.register__form__input', 'register__form__input');
    hideModal(modalForm);
    const modalRegister = document.querySelector('.modal__register');
    showModal(modalRegister);
    event._isClickOnTheProfile = true;
});

loginBtn.forEach((element) => {
    const modalForm = document.querySelector('.modal__login');
    element.addEventListener('click', function() {
        clearLibrarycardTimeout();
        showModal(modalForm);
    });
    element.addEventListener('click', (event) => {
        event._isClickOnTheProfile = true;
    });
});

function checkButtonsBuy(event) {
    if (currentUser && currentUser.isLibraryCard) {
        addBookToUser(event.target.offsetParent);
        changeButtonBuyToOwn(event.target);
        return;
    }
    if (currentUser) {
        const modalBuyLibraryCard = document.querySelector('.modal__buycard');
        showModal(modalBuyLibraryCard);
        return;
    }
    showModal(modalLogin);
}

buyBtn.forEach((element) => {
    element.addEventListener('click', checkButtonsBuy);
    element.addEventListener('click', (event) => {
        event._isClickOnTheProfile = true;
    });
});

myprofileBtn.forEach((element) => {
    const modalMyprofile = document.querySelector('.modal__myprofile');
    element.addEventListener('click', function() {
        prepareMyprofileForm(modalMyprofile, currentUser);
        showModal(modalMyprofile);
    });
    element.addEventListener('click', (event) => {
        event._isClickOnTheProfile = true;
    });
});

modalLoginClose.addEventListener('click', function() {
    clearForm(modalLogin, '.register__form__input', 'register__form__input');
    hideModal(modalLogin);
});

modalMyprofileClose.addEventListener('click', function() {
    const modalMyprofile = document.querySelector('.modal__myprofile');
    hideModal(modalMyprofile);
});

modalBuyLibraryCardClose.addEventListener('click', function() {
    const modalBuyLibraryCard = document.querySelector('.modal__buycard');
    hideModal(modalBuyLibraryCard);
});

copyBtn.addEventListener('click', function() {
    const cardnumber = document.querySelector('.myprofile__cardnumber__number').textContent;
    navigator.clipboard.writeText(cardnumber);
})