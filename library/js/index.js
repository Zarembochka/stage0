console.log("Общая оценка - 50: \n 1. Вёрстка соответствует макету. Ширина экрана 768px - 26; \n 1.1 блок <header> - 2 \n 1.2 секция Welcome - 2 \n 1.3 секция About - 4 \n 1.4 секция Favorites - 2 \n 1.5 cделать кнопку own, вместо buy для последней книги - 2 \n 1.6 секция CoffeShop - 4 \n 1.7 секция Contacts - 4 \n 1.8 секция LibraryCard - 4 \n 1.9 блок <footer> - 2 \n 2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется - 12: \n 2.1 нет полосы прокрутки при ширине страницы от 1440рх до 640рх - 4 \n 2.2 элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх - 4 \n 2.3 элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх - 4 \n 3. На ширине экрана 768рх реализовано адаптивное меню - 12: \n 3.1 Если иконка юзера не прыгает (не меняет позиции при открытии меню), независимо от величины отступа - 2 \n 3.2 при нажатии на бургер-иконку плавно появляется адаптивное меню - 4 \n 3.3 при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран - 2 \n 3.4 ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается - 2 \n 3.5 размеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect - 2");

const checkCardBtn = document.querySelector('.btn-checkCard');
const libraryCard = document.querySelector('.librarycard__form');

function getUserInitials(user) {
    const firstInitial = user.firstName[0].toUpperCase();
    const lastInitial = user.lastName[0].toUpperCase();
    return firstInitial + lastInitial;
}

function getUserUsername(user) {
    const username = `${user.firstName} ${user.lastName}`;
    return username;
}

function changeInitialsForLogin(user) {
    const userInitials = document.querySelector('.user__initials');
    userInitials.textContent = getUserInitials(user);
    userInitials.classList.add('user__initials-active');
}

function changeInitialsForLogout() {
    const userInitials = document.querySelector('.user__initials');
    userInitials.textContent = '';
    userInitials.classList.remove('user__initials-active');
}

function changeTitleForProfileLogin(user) {
    profileButton.setAttribute('title', getUserUsername(user));
}

function changeTitleForProfileLogout() {
    profileButton.removeAttribute('title');
}

function changeProfileTitleForCardNumber(user) {
    const profileTitle = document.querySelector('.profile__card__title');
    profileTitle.classList.add('profile__card__title-login');
    profileTitle.textContent = user.cardNumber;
}

function changeProfileCardNumberForTitle() {
    const profileTitle = document.querySelector('.profile__card__title');
    profileTitle.classList.remove('profile__card__title-login');
    profileTitle.textContent = 'Profile';
}

function changeButtonsForLogin() {
    const loginBtn = document.querySelector('.profile__btn-login');
    loginBtn.parentElement.classList.add('btn-notvisible');

    const registerBtn = document.querySelector('.profile__btn-registration');
    registerBtn.parentElement.classList.add('btn-notvisible');

    const myprofileBtn = document.querySelector('.btn-myprofile');
    myprofileBtn.parentElement.classList.remove('btn-notvisible');

    const logoutBtn = document.querySelector('.btn-logout');
    logoutBtn.parentElement.classList.remove('btn-notvisible');

    const profileList = document.querySelector('.profile__list');
    profileList.classList.add('profile__list-login');
}

function changeButtonsForLogout() {
    const loginBtn = document.querySelector('.profile__btn-login');
    loginBtn.parentElement.classList.remove('btn-notvisible');

    const registerBtn = document.querySelector('.profile__btn-registration');
    registerBtn.parentElement.classList.remove('btn-notvisible');

    const myprofileBtn = document.querySelector('.btn-myprofile');
    myprofileBtn.parentElement.classList.add('btn-notvisible');

    const logoutBtn = document.querySelector('.btn-logout');
    logoutBtn.parentElement.classList.add('btn-notvisible');

    const profileList = document.querySelector('.profile__list');
    profileList.classList.remove('profile__list-login');
}

function changeProfileCardForLogin(user) {
    changeProfileTitleForCardNumber(user);
    changeButtonsForLogin();
}

function changeProfileCardForLogout() {
    changeProfileCardNumberForTitle();
    changeButtonsForLogout();
}

function changeLibraryCardInfoSectionForLogin(section) {
    const title = section.querySelector('.librarycard__info__title');
    title.innerText = 'Visit your profile';

    const text = section.querySelector('.librarycard__info__text');
    text.innerText = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';

    const btns = section.querySelectorAll('.librarycard__info__btn');
    btns.forEach((element) => element.classList.add('btn-notvisible'));

    const btnMyprofile = section.querySelector('.btn-myprofile');
    btnMyprofile.classList.remove('btn-notvisible');
    btnMyprofile.classList.add('btn-visible');
}

function changeLibraryCardInfoSectionForLogout(section) {
    const title = section.querySelector('.librarycard__info__title');
    title.innerText = 'Get a reader card';

    const text = section.querySelector('.librarycard__info__text');
    text.innerText = 'You will be able to see a reader card after logging into account or you can register a new account';

    const btns = section.querySelectorAll('.librarycard__info__btn');
    btns.forEach((element) => element.classList.remove('btn-notvisible'));

    const btnMyprofile = section.querySelector('.btn-myprofile');
    btnMyprofile.classList.remove('btn-visible');
    btnMyprofile.classList.add('btn-notvisible');
}

function changeLibraryCardSectionForLogin(user) {
    const libraryCard = document.querySelector('.librarycard');
    const title = libraryCard.querySelector('.librarycard__title');
    title.innerText = 'Your Library card';

    const username = getUserUsername(user);
    this.user_name.value = username;
    this.user_name.setAttribute('readonly', true);
    this.card_number.value = user.cardNumber;
    this.card_number.setAttribute('readonly', true);

    hideButton(checkCardBtn);
    showUserInfo(user);

    changeLibraryCardInfoSectionForLogin(libraryCard);
}

function changeLibraryCardSectionForLogout() {
    const libraryCard = document.querySelector('.librarycard');
    const title = libraryCard.querySelector('.librarycard__title');
    title.innerText = 'Find your Library card';

    this.user_name.removeAttribute('readonly');
    this.card_number.removeAttribute('readonly');
    showButton(checkCardBtn);
    hideUserInfo();

    changeLibraryCardInfoSectionForLogout(libraryCard);
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
}

function showUserInfo(user) {
    const userInfo = document.querySelector('.librarycard__user__info');
    const userInfoTexts = userInfo.querySelectorAll('.libraryCard__user__info__details');
    const userFromLocalStorage = getUserFromLocalStorage(user);
    userInfoTexts[0].textContent = userFromLocalStorage.visitsCount;
    userInfoTexts[1].textContent = userFromLocalStorage.bonusesCount;
    userInfoTexts[2].textContent = userFromLocalStorage.userBooks.length;
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
    const arrayLibraryCards = JSON.parse(localStorage.getItem('emailToken'));
    if (arrayLibraryCards) {
        const userId = arrayLibraryCards.find((element) => element.cardnumber === cardNumber);
        if (userId) {
            const arrayUsers = JSON.parse(localStorage.getItem('user'));
            const userByUserId = arrayUsers.find((element) => element.userId === userId.cardnumber);
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
            const userByUserId = arrayUsers.find((element) => element.userId === userId.cardnumber);
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
            return userByEmail;
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

function prepareBookList(form, user) {
    //delete all items except first
    const liItems = form.querySelectorAll('.myprofile__books__list__item');
    const bookWindow = form.querySelector('.myprofile__books__window');
    const bookList = form.querySelector('.myprofile__books__list');
    const myprofeleMain = form.querySelector('.myprofile__main');

    for (let i = 1; i < liItems.length; i++) {
        liItems[i].remove();
    }

    const liItem = liItems[0];
    liItem.innerText = "You don't have any books";
    bookWindow.classList.remove('myprofile__books__window-scroll');
    myprofeleMain.classList.remove('myprofile__main-scroll');

    //books
    const arrayUserBooks = user.userBooks;

    for (let i = arrayUserBooks.length; i > 0; i--) {
        const newLiItem = liItem.cloneNode(false);
        const bookTitle = `${arrayUserBooks[i - 1].title}, ${arrayUserBooks[i - 1].author}`;
        newLiItem.innerText = bookTitle;
        // newLiItem.innerText = `${arrayUserBooks[i - 1].title}, ${arrayUserBooks[i - 1].author}`;
        liItem.before(newLiItem);
    }

    if (arrayUserBooks.length > 0) {
        liItem.remove();
    }

    if (bookList.clientHeight > 70) {
        bookWindow.classList.add('myprofile__books__window-scroll');
        myprofeleMain.classList.add('myprofile__main-scroll');
    }
}

function prepareMyprofileForm(form, user) {
    const initials = form.querySelector('.myprofile__aside__initials');
    initials.innerText = getUserInitials(user);

    const username = form.querySelector('.myprofile__aside__username');
    username.innerText = getUserUsername(user);

    const userInfo = form.querySelectorAll('.myprofile__user__info__details');
    // const userFromLocalStorage = getUserFromLocalStorage(user);
    userInfo[0].textContent = user.visitsCount;
    userInfo[1].textContent = user.bonusesCount;
    userInfo[2].textContent = user.userBooks.length;

    prepareBookList(form, user);

    const cardNumber = form.querySelector('.myprofile__cardnumber__number');
    cardNumber.innerText = user.cardNumber;
}