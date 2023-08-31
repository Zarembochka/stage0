const registerForm = document.querySelector('.register__form');
const registerFormInputs = registerForm.querySelectorAll('.register__form__input');

const loginForm = document.querySelector('.login__form');

const registerSignInBtn = document.querySelector('.btn-submit-register');
const registerLoginBtn = document.querySelector('.btn-submit-login');

registerForm.addEventListener('focusout', checkValidation);
registerForm.addEventListener('focusin', focusValidation);

loginForm.addEventListener('focusout', checkValidation);
loginForm.addEventListener('focusin', focusValidation);

const logoutBtn = document.querySelector('.btn-logout');

let currentUser;

function checkText(input) {
    const value = input.value.trim();
    if (value.length === 0) {
        input.classList.add('register__form__input-notvalid');
        //message
        let message = input.nextElementSibling;
        message.textContent = 'field is required';
        return false;
    }
    input.classList.add('register__form__input-valid');
    return true;
}

function checkEmail(input) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const value = input.value.trim();
    if (pattern.test(value) == false) {
        input.classList.add('register__form__input-notvalid');
        //message
        let message = input.nextElementSibling;
        message.textContent = 'incorrect email';
        return false;
    }
    if (!checkUniquenessEmail(value.toUpperCase())) {
        input.classList.add('register__form__input-notvalid');
        //message
        let message = input.nextElementSibling;
        message.textContent = 'this email is already registered';
        return false;
    }
    input.classList.add('register__form__input-valid');
    return true;
}

function checkPassword(input) {
    const value = input.value.trim();
    if (value.length < 8) {
        input.classList.add('register__form__input-notvalid');
        //message
        let message = input.nextElementSibling;
        message.textContent = 'password must contain 8 characters';
        return false;
    }
    input.classList.add('register__form__input-valid');
    return true;
}

function checkValidation(event) {
    const element = event.target;
    checkValidationElement(element);
}

function checkValidationElement(element) {
    if (element.type === 'text') {
        return checkText(element);
    }

    if (element.type === 'email') {
        return checkEmail(element);
    }

    if (element.type === 'password') {
        return checkPassword(element);
    }
}

function checkValidationForm(form, inputs) {
    const formInputs = form.querySelectorAll(inputs);
    let validForm = true;
    for (let i = 0; i < formInputs.length; i++) {
        if (!checkValidationElement(formInputs[i])) {
            validForm = false;
        }
    }
    return validForm;
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
    saveInfoToLocalStorage('cardNumberToken', token);
}

function createCardNumberToken(cardNumber, userId) {
    const newCardNumberToken = new Object;
    newCardNumberToken.cardNumber = cardNumber;
    newCardNumberToken.userId = userId;
    saveCardNumberToken(newCardNumberToken);
}

function saveInfoToLocalStorage(itemName, item) {
    const itemLocalStorage = JSON.parse(localStorage.getItem(itemName));
    if (!itemLocalStorage) {
        //first user
        localStorage.setItem(itemName, JSON.stringify([item]));
        return;
    }
    itemLocalStorage.push(item);
    localStorage.setItem(itemName, JSON.stringify(itemLocalStorage));
}

function addVisitToUser(user) {
    const itemLocalStorage = JSON.parse(localStorage.getItem('user'));
    const userInLocalStorage = itemLocalStorage.find((element) => element.userId === user.userId);
    userInLocalStorage.visitsCount += 1;
    localStorage.setItem('user', JSON.stringify(itemLocalStorage));
}

function addLibraryCardToUser(user) {
    const itemLocalStorage = JSON.parse(localStorage.getItem('user'));
    const userInLocalStorage = itemLocalStorage.find((element) => element.userId === user.userId);
    userInLocalStorage.bonusesCount += 350;
    userInLocalStorage.isLibraryCard = true;
    currentUser = userInLocalStorage;
    localStorage.setItem('user', JSON.stringify(itemLocalStorage));
}

function saveActiveUser(user, value) {
    const users = JSON.parse(localStorage.getItem('user'));
    const userInLocalStorage = users.find((element) => element.userId === user.userId);
    userInLocalStorage.isActive = value;
    localStorage.setItem('user', JSON.stringify(users));
}

function saveEmailToken(token) {
    saveInfoToLocalStorage('emailToken', token);
}

function createEmailToken(email, cardnumber) {
    const newEmailToken = new Object;
    newEmailToken.email = email;
    newEmailToken.cardnumber = cardnumber;
    saveEmailToken(newEmailToken);
}

function saveUserInfo(user) {
    saveInfoToLocalStorage('user', user);
}

function getUserFromLocalStorage(user) {
    const users = JSON.parse(localStorage.getItem('user'));
    return users.find((element) => element.userId === user.userId);
}

function createUser() {
    const newUser = new Object;
    newUser.userId = createCardNumber();
    newUser.firstName = registerFormInputs[0].value.trim();
    newUser.lastName = registerFormInputs[1].value.trim();
    newUser.email = registerFormInputs[2].value.trim();
    newUser.password = registerFormInputs[3].value.trim();
    newUser.cardNumber = newUser.userId;
    newUser.visitsCount = 0;
    newUser.bonusesCount = 240;
    newUser.userBooks = [];
    newUser.isActive = true;
    newUser.isLibraryCard = false;
    return newUser;
}

function createNewUser() {
    const newUser = createUser();
    saveUserInfo(newUser);
    createEmailToken(newUser.email, newUser.cardNumber);
    //createCardNumberToken(newUser.cardNumber, newUser.userId);
    return newUser;
}

function clearElement(element, nameClass) {
    element.value = '';
    if (nameClass) {
        element.classList.remove(nameClass + '-valid');
        element.classList.remove(nameClass + '-notvalid');
    }
    element.nextElementSibling.textContent = '';
}

function clearForm(form, nameElements, nameClass) {
    const formInputs = form.querySelectorAll(nameElements);
    formInputs.forEach((element) => clearElement(element, nameClass));
}

function activateUser(user) {
    currentUser = user;
    isCurrentUser = true;
    changeInitialsForLogin(user);
    changeTitleForProfileLogin(user);
    saveActiveUser(user, true);
    changeProfileCardForLogin(user);
    changeLibraryCardSectionForLogin(user);
}

function logout() {
    saveActiveUser(currentUser, false);
    currentUser = undefined;
    isCurrentUser = false;
    changeInitialsForLogout();
    changeTitleForProfileLogout();
    changeProfileCardForLogout();
    changeLibraryCardSectionForLogout();
}

registerSignInBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (checkValidationForm(modalRegister, '.register__form__input')) {
        event._isClickOnTheButtonSubmit = true;
        const activeUser = createNewUser();
        activateUser(activeUser);
        addVisitToUser(activeUser);
        clearForm(modalRegister, '.register__form__input', 'register__form__input');
        hideModal(modalRegister);
    }
});

registerLoginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (checkValidationForm(modalLogin, '.register__form__input')) {
        const activeUser = loginUser();
        if (activeUser) {
            event._isClickOnTheButtonSubmit = true;
            activateUser(activeUser);
            addVisitToUser(activeUser);
            clearForm(modalLogin, '.register__form__input', 'register__form__input');
            hideModal(modalLogin);
        }
    }
});

logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event._isClickOnTheProfile = true;
    logout();
});

function findActiveUser() {
    const itemLocalStorage = JSON.parse(localStorage.getItem('user'));
    const userInLocalStorage = itemLocalStorage.find((element) => element.isActive === true);
    if (userInLocalStorage) {
        activateUser(userInLocalStorage);
    }
}

findActiveUser();
