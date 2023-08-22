console.log("Общая оценка - 50: \n 1. Вёрстка соответствует макету. Ширина экрана 768px - 26; \n 1.1 блок <header> - 2 \n 1.2 секция Welcome - 2 \n 1.3 секция About - 4 \n 1.4 секция Favorites - 2 \n 1.5 cделать кнопку own, вместо buy для последней книги - 2 \n 1.6 секция CoffeShop - 4 \n 1.7 секция Contacts - 4 \n 1.8 секция LibraryCard - 4 \n 1.9 блок <footer> - 2 \n 2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется - 12: \n 2.1 нет полосы прокрутки при ширине страницы от 1440рх до 640рх - 4 \n 2.2 элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх - 4 \n 2.3 элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх - 4 \n 3. На ширине экрана 768рх реализовано адаптивное меню - 12: \n 3.1 Если иконка юзера не прыгает (не меняет позиции при открытии меню), независимо от величины отступа - 2 \n 3.2 при нажатии на бургер-иконку плавно появляется адаптивное меню - 4 \n 3.3 при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран - 2 \n 3.4 ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается - 2 \n 3.5 размеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect - 2");

const registerBtn = document.querySelector('.profile__btn-registration');
const signinBtn = document.querySelector('.btn-signin');
const modalRegister = document.querySelector('.modal__background');
const modalRegisterClose = document.querySelector('.modals__close');
let isScrollingDisabled = false;

function showModalRegister() {
    modalRegister.classList.toggle('modal__background-active');
    isScrollingDisabled = true;
    // document.body.classList.toggle('modal-actile');
}

function hideModalRegister() {
    modalRegister.classList.remove('modal__background-active');
    isScrollingDisabled = false;
    // document.body.classList.remove('modal-actile');
}

function scrolling() {
    // if (isScrollingDisabled) {
    //     return false;
    // }
    // return true;
}

registerBtn.addEventListener('click', function() {
    showModalRegister();
});

signinBtn.addEventListener('click', function() {
    showModalRegister();
});

modalRegisterClose.addEventListener('click', function() {
    hideModalRegister();
})
