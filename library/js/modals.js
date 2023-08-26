const registerBtn = document.querySelector('.profile__btn-registration');
const signinBtn = document.querySelector('.btn-signin');
const modalRegister = document.querySelector('.modal__register');
const modalRegisterClose = document.querySelector('.register__close');

const loginBtn = document.querySelector('.profile__btn-login');
const modalLogin = document.querySelector('.modal__login');
const modalLoginClose = document.querySelector('.login__close');

const modalsForms = document.querySelectorAll('.modal');

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
        if (event.target.type === 'submit') {
            form._isClickOnModalForm = false;
        } else {
        form._isClickOnModalForm = true;
        }
    })
}

modalsForms.forEach((element) => checkClick(element));

function hideModal(form) {
    if (form !== undefined) {
        form.classList.remove('modal__background-active');
    }
    document.body.style.paddingRight = '';
    document.body.classList.remove('modal-actile');
}

registerBtn.addEventListener('click', function() {
    showModal(modalRegister);
});

signinBtn.addEventListener('click', function() {
    showModal(modalRegister);
});

modalRegisterClose.addEventListener('click', function() {
    hideModal(modalRegister);
});

loginBtn.addEventListener('click', function() {
    showModal(modalLogin);
});

modalLoginClose.addEventListener('click', function() {
    hideModal(modalLogin);
});