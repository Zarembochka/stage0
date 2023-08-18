console.log("Общая оценка - 50: \n 1. Вёрстка соответствует макету. Ширина экрана 768px - 26; \n 1.1 блок <header> - 2 \n 1.2 секция Welcome - 2 \n 1.3 секция About - 4 \n 1.4 секция Favorites - 2 \n 1.5 cделать кнопку own, вместо buy для последней книги - 2 \n 1.6 секция CoffeShop - 4 \n 1.7 секция Contacts - 4 \n 1.8 секция LibraryCard - 4 \n 1.9 блок <footer> - 2 \n 2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется - 12: \n 2.1 нет полосы прокрутки при ширине страницы от 1440рх до 640рх - 4 \n 2.2 элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх - 4 \n 2.3 элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх - 4 \n 3. На ширине экрана 768рх реализовано адаптивное меню - 12: \n 3.1 Если иконка юзера не прыгает (не меняет позиции при открытии меню), независимо от величины отступа - 2 \n 3.2 при нажатии на бургер-иконку плавно появляется адаптивное меню - 4 \n 3.3 при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран - 2 \n 3.4 ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается - 2 \n 3.5 размеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect - 2");


//  burger menu
const burgerBtn = document.getElementById('burger');
const header = document.querySelector('.header');
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
        return;
    }
    header.classList.remove('header-burger');
})

// radio
const favoritesForm = document.querySelector('.favorites__form');
favoritesForm.addEventListener('click', (event) => {
    toChangeFavoritesOfSeason(event.currentTarget.querySelector('.favorites__form__radio:checked').value);
})

const favoritesItems = document.querySelector('.favorites__inner');
favoritesItems.addEventListener("animationend", animationFade);

function animationFade(event, element) {
    console.log(event.animationName);
    if (event.animationName === 'fade-out') {
        event.srcElement.classList.remove('favorites__items-fadeout');
        event.srcElement.classList.remove('favorites__items-checked');
        element.classList.add('favorites__items-checked');
        element.classList.add('favorites__items-fade-in');
        console.log(111);
        console.log(event.srcElement);
    }

    if (event.animationName === 'fade-in') {
        event.srcElement.classList.remove('favorites__items-fadein');
        console.log(222);
        console.log(event.srcElement);
    }
}

// function animationFadeOut(event) {
//     console.log(event);
//     event.srcElement.classList.remove('favorites__items-fadeout');
//     event.srcElement.classList.remove('favorites__items-checked');
// }

// function animationFadeIn(event) {
//     event.target.classList.remove('favorites__items-fadein');
// }

function toChangeFavoritesOfSeason(season) {
    const oldFavoritesItemsCheked = document.querySelector('.favorites__items-checked');
    const currentFavoritesItemsCheked = document.querySelector('.favorites__items-' + season);
    //fadeOut(oldFavoritesItemsCheked);
    oldFavoritesItemsCheked.classList.add('favorites__items-fadeout');
    // oldFavoritesItemsCheked.addEventListener("animationend", animationFadeOut);

    // currentFavoritesItemsCheked.addEventListener("animationend", animationFadeIn);
    //oldFavoritesItemsCheked.addEventListener("animationend", alert(123));
    // oldFavoritesItemsCheked.classList.remove('favorites__items-checked');
    currentFavoritesItemsCheked.classList.add('favorites__items-checked');
    currentFavoritesItemsCheked.classList.add('favorites__items-fadein');
    // setTimeout(fadeIn, 700, currentFavoritesItemsCheked);
}

//slider
const slider = document.querySelector('.about__slider');
const slides = Array.from(document.querySelectorAll('.about__item'));
const pagination = document.querySelector('.about__carousel');
const rightArrowButton = document.querySelector('.arrow-right');
const leftArrowButton = document.querySelector('.arrow-left');
let lastVisibleCirkle = Array.from(pagination.children).findLast((element) => element.offsetWidth > 0);

let slideIndex = 0;

function showNextSlide() {
    slideIndex += 1;
    activeRightPagination();
    showSlider();
}

function showPreviousSlide() {
    slideIndex -= 1;
    activeLeftPagination();
    showSlider();
}

function addActivePagination(button) {
    button.classList.add('about__carousel__cirkle-active');
    if (pagination.firstElementChild === button || lastVisibleCirkle === button) {
        button.disabled = true;
    }
    checkLeftArrowButton();
    checkRightArrowButton();
}

function checkLeftArrowButton() {
    if (slideIndex === 0) {
        leftArrowButton.disabled = true;
    }
}

function checkRightArrowButton() {
    if (slideIndex === +lastVisibleCirkle.innerText) {
        rightArrowButton.disabled = true;
    }
}

function activeRightPagination() {
    const activePagination = document.querySelector('.about__carousel__cirkle-active');
    const rightPagination = activePagination.nextElementSibling;
    removeActivePagination();
    addActivePagination(rightPagination);
}

function activeLeftPagination() {
    const activePagination = document.querySelector('.about__carousel__cirkle-active');
    const leftPagination = activePagination.previousElementSibling;
    removeActivePagination();
    addActivePagination(leftPagination);
}

function removeActivePagination() {
    const activePagination = document.querySelector('.about__carousel__cirkle-active');
    activePagination.classList.remove('about__carousel__cirkle-active');
    activePagination.disabled = false;
    leftArrowButton.disabled = false;
    rightArrowButton.disabled = false;
}

rightArrowButton.addEventListener('click', (event) => {
    showNextSlide();
})

leftArrowButton.addEventListener('click', (event) => {
    showPreviousSlide();
})

pagination.addEventListener('click', (event) => {
    slideIndex = +event.target.innerText;
    removeActivePagination();
    addActivePagination(event.target);
    checkLeftArrowButton();
    checkRightArrowButton();
    showSlider();
});

function showSlider() {
    const activeSlide = document.querySelector('.about__item-active');
    activeSlide.classList.remove('about__item-active');
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            let slideWidth = slide.offsetWidth;
            slider.style.marginLeft = -slideIndex * slideWidth - 25 * (slideIndex) + 'px';
            slide.classList.add('about__item-active');
        }
    })
}

function checkLastPagination() {
    lastVisibleCirkle = Array.from(pagination.children).findLast((element) => element.offsetWidth > 0);
}

window.addEventListener('resize', (event) => {
    const activePagination = document.querySelector('.about__carousel__cirkle-active');
    checkLastPagination();
    removeActivePagination();
    addActivePagination(activePagination);
})

showSlider();