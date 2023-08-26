const registerForm = document.querySelector('.register__form');
const registerFormInputs = registerForm.querySelectorAll('.register__form__input');

const checkCardBtn = document.querySelector('.btn-checkCard');
const registerSignInBtn = document.querySelector('.btn-register');

registerForm.addEventListener('focusout', checkValidation);
registerForm.addEventListener('focusin', focusValidation);

checkCardBtn.addEventListener('click', (event) => {
    event.preventDefault();
})

function checkText(input) {
    if (input.value.length === 0) {
        input.classList.add('register__form__input-notvalid');
        //message
        let message = input.nextElementSibling;
        message.textContent = 'field is required';
        return;
    }
    input.classList.add('register__form__input-valid');
}

function checkEmail(input) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (pattern.test(input.value) == false) {
        input.classList.add('register__form__input-notvalid');
        //message
        let message = input.nextElementSibling;
        message.textContent = 'incorrect email';
        return;
    }
    input.classList.add('register__form__input-valid');
}

function checkPassword(input) {
    if (input.value.length < 8) {
        input.classList.add('register__form__input-notvalid');
        //message
        let message = input.nextElementSibling;
        message.textContent = 'password must contain 8 characters';
        return;
    }
    input.classList.add('register__form__input-valid');
}

function checkValidation(event) {
    if (event.target.type === 'text') {
        checkText(event.target);
        return;
    }

    if (event.target.type === 'email') {
        checkEmail(event.target);
        return;
    }

    if (event.target.type === 'password') {
        checkPassword(event.target);
        return;
    }
}

function focusValidation(event) {
    const input = event.target;
    if (input.type !== 'submit') {
        input.classList.remove('register__form__input-notvalid');
        input.nextElementSibling.textContent = '';
    }
}

function createCardNumber() {
    const min = 4294967296;
    const max = 68719476735;
    const cardNumber = Math.floor(Math.random() * (max - min)) + min;
    return cardNumber.toString(16).toLocaleUpperCase();
}

function saveCardNumberToken(token) {
    localStorage.setItem('cardNumberToken', JSON.stringify(token));
}

function createCardNumberToken(cardNumber, userId) {
    const newCardNumberToken = new Object;
    newCardNumberToken.cardNumber = cardNumber;
    newCardNumberToken.userId = userId;
    saveCardNumberToken(newCardNumberToken);
}

function saveEmailToken(token) {
    localStorage.setItem('emailToken', JSON.stringify(token));
}

function createEmailToken(email, userId) {
    const newEmailToken = new Object;
    newEmailToken.email = email;
    newEmailToken.userId = userId;
    saveEmailToken(newEmailToken);
}

function saveUserInfo(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function createUser() {
    const newUser = new Object;
    newUser.userId = 1;
    newUser.firstName = registerFormInputs[0].value.trim();
    newUser.lastName = registerFormInputs[1].value.trim();
    newUser.email = registerFormInputs[2].value.trim();
    newUser.password = registerFormInputs[3].value.trim();
    newUser.cardNumber = createCardNumber();
    newUser.visitsCount = 0;
    newUser.userBooks = [];
    newUser.isActive = true;
    return newUser;
}

function createNewUser() {
    const newUser = createUser();
    console.log(newUser);
    saveUserInfo(newUser);
    createEmailToken(newUser.email, newUser.userId);
    createCardNumberToken(newUser.cardNumber, newUser.userId);
    return newUser;
}

function clearElement(element) {
    element.value = '';
    element.classList.remove('register__form__input-valid');
}

function clearForm(form) {
    const formInputs = form.querySelectorAll('.register__form__input');
    formInputs.forEach((element) => clearElement(element));
}

registerSignInBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const activeUser = createNewUser();
    clearForm(modalRegister);
    hideModal(modalRegister);
    activateUser(activeUser);
})

