console.log("Общая оценка - 50: \n 1. Вёрстка соответствует макету. Ширина экрана 768px - 26; \n 1.1 блок <header> - 2 \n 1.2 секция Welcome - 2 \n 1.3 секция About - 4 \n 1.4 секция Favorites - 2 \n 1.5 cделать кнопку own, вместо buy для последней книги - 2 \n 1.6 секция CoffeShop - 4 \n 1.7 секция Contacts - 4 \n 1.8 секция LibraryCard - 4 \n 1.9 блок <footer> - 2 \n 2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется - 12: \n 2.1 нет полосы прокрутки при ширине страницы от 1440рх до 640рх - 4 \n 2.2 элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх - 4 \n 2.3 элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх - 4 \n 3. На ширине экрана 768рх реализовано адаптивное меню - 12: \n 3.1 Если иконка юзера не прыгает (не меняет позиции при открытии меню), независимо от величины отступа - 2 \n 3.2 при нажатии на бургер-иконку плавно появляется адаптивное меню - 4 \n 3.3 при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран - 2 \n 3.4 ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается - 2 \n 3.5 размеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect - 2");

const userInitials = document.querySelector('.user__initials');
const checkCardBtn = document.querySelector('.btn-checkCard');
const libraryCard = document.querySelector('.librarycard__form');

function getUserInitials(user) {
    const firstInitial = user.firstName[0].toUpperCase();
    const lastInitial = user.lastName[0].toUpperCase();
    return firstInitial + lastInitial;
}

function changeInitials(user) {
    userInitials.textContent = getUserInitials(user);
    userInitials.classList.add('user__initials-active');
}

function hideButton(button) {
    button.classList.add('btn-checkCard-nonactive');
}

function showButton(button) {
    button.classList.remove('btn-checkCard-nonactive');
}

function hideUserInfo() {
    const userInfo = document.querySelector('.librarycard__user__info');
    userInfo.classList.remove('librarycard__user__info-active');
    clearForm(libraryCard, '.librarycard__form__input', '');
    showButton(checkCardBtn);
}

function showUserInfo(user) {
    const userInfo = document.querySelector('.librarycard__user__info');
    const userInfoTexts = userInfo.querySelectorAll('.libraryCard__user__info__details');
    userInfoTexts[0].textContent = user.visitsCount;
    userInfoTexts[1].textContent = user.bonusesCount;
    userInfoTexts[2].textContent = user.userBooks.length;
    userInfo.classList.add('librarycard__user__info-active');
}

function checkUniquenessEmail(email) {
    const arrayOfEmails = JSON.parse(localStorage.getItem('emailToken'));
    if (arrayOfEmails) {
        const findEmail = arrayOfEmails.find((element) => element.email.toUpperCase() === email);
        if (findEmail) {
            return false;
        }
    }
    return true;
}

function showIncorrectMessage() {
    const input = this.login_password;
    input.classList.add('register__form__input-notvalid');
    const message = input.nextElementSibling;
    message.textContent = 'incorrect login or password';
}

function findUserByLibraryCard(cardNumber) {
    const arrayLibraryCards = JSON.parse(localStorage.getItem('cardNumberToken'));
    if (arrayLibraryCards) {
        const userId = arrayLibraryCards.find((element) => element.cardNumber === cardNumber);
        if (userId) {
            const arrayUsers = JSON.parse(localStorage.getItem('user'));
            const userByUserId = arrayUsers.find((element) => element.userId === userId.userId);
            return userByUserId;
        }
    }
}

function findUserByEmail(email) {
    const arrayEmails = JSON.parse(localStorage.getItem('emailToken'));
    if (arrayEmails) {
        const userId = arrayEmails.find((element) => element.email.toUpperCase() === email);
        if (userId) {
            const arrayUsers = JSON.parse(localStorage.getItem('user'));
            const userByUserId = arrayUsers.find((element) => element.userId === userId.userId);
            return userByUserId;
        }
    }
}

function checkLibraryCard() {
    const username = this.user_name.value.trim().toUpperCase();
    const cardNumber = this.card_number.value.trim().toUpperCase();
    const userByLibraryCard = findUserByLibraryCard(cardNumber);
    if (userByLibraryCard) {
        const userNameByLibraryCard = `${userByLibraryCard.firstName} ${userByLibraryCard.lastName}`.toUpperCase();
        if (userNameByLibraryCard === username) {
            hideButton(checkCardBtn);
            showUserInfo(userByLibraryCard);
            window.setTimeout(hideUserInfo, 10000);
        }
    }
}

function checkEmailToLogin(login) {
    if (login.includes('@')) {
        return true;
    }
    return false;
}

function loginUserByEmail(email, password) {
    const userByEmail = findUserByEmail(email);
    if (userByEmail) {
        const userPasswordByEmail = userByEmail.password;
        if (userPasswordByEmail === password) {
            return userPasswordByEmail;
        }
    }
    showIncorrectMessage();
}

function loginUserByCardNumber(cardNumber, password) {
    const userByLibraryCard = findUserByLibraryCard(cardNumber);
    if (userByLibraryCard) {
        const userPasswordByLibraryCard = userByLibraryCard.password;
        if (userPasswordByLibraryCard === password) {
            return userByLibraryCard;
        }
    }
    showIncorrectMessage();
}

function loginUser() {
     const login = this.login_user.value.trim().toUpperCase();
     const password = this.login_password.value.trim();
     if (checkEmailToLogin(login)) {
        return loginUserByEmail(login, password);
     }
     return loginUserByCardNumber(login, password);
}

checkCardBtn.addEventListener('click', (event) => {
    event.preventDefault();
    checkLibraryCard();
});