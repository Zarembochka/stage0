console.log("Общая оценка - 50: \n 1. Вёрстка соответствует макету. Ширина экрана 768px - 26; \n 1.1 блок <header> - 2 \n 1.2 секция Welcome - 2 \n 1.3 секция About - 4 \n 1.4 секция Favorites - 2 \n 1.5 cделать кнопку own, вместо buy для последней книги - 2 \n 1.6 секция CoffeShop - 4 \n 1.7 секция Contacts - 4 \n 1.8 секция LibraryCard - 4 \n 1.9 блок <footer> - 2 \n 2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется - 12: \n 2.1 нет полосы прокрутки при ширине страницы от 1440рх до 640рх - 4 \n 2.2 элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх - 4 \n 2.3 элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх - 4 \n 3. На ширине экрана 768рх реализовано адаптивное меню - 12: \n 3.1 Если иконка юзера не прыгает (не меняет позиции при открытии меню), независимо от величины отступа - 2 \n 3.2 при нажатии на бургер-иконку плавно появляется адаптивное меню - 4 \n 3.3 при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран - 2 \n 3.4 ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается - 2 \n 3.5 размеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect - 2");

const registerForm = document.querySelector('.register__form');
const registerFormInputs = registerForm.querySelectorAll('.register__form__input');

const checkCardBtn = document.querySelector('.btn-checkCard');

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
    input.classList.remove('register__form__input-notvalid');
    input.nextElementSibling.textContent = '';
}

