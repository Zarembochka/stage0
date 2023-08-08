console.log("Общая оценка - 50: \n 1. Вёрстка соответствует макету. Ширина экрана 768px - 26; \n 1.1 блок <header> - 2 \n 1.2 секция Welcome - 2 \n 1.3 секция About -2 \n 1.4 Под картинкой находится 5 точек пагинации - 2 \n 1.5 секция Favorites - 4 \n 1.6 секция CoffeShop - 4 \n 1.7 секция Contacts - 4 \n 1.8 секция LibraryCard - 4 \n 1.9 блок <footer> - 2 \n 2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется - 12: \n 2.1 нет полосы прокрутки при ширине страницы от 1440рх до 640рх - 4 \n 2.2 элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх - 4 \n 2.3 элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх - 4 \n 3. На ширине экрана 768рх реализовано адаптивное меню - 12: \n 3.1 при нажатии на бургер-иконку плавно появляется адаптивное меню - 4 \n 3.2 при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран - 4 \n 3.3 ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается - 2 \n 3.4 размеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect - 2");


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

function toChangeFavoritesOfSeason(season) {
    const oldFavoritesItemsCheked = document.querySelector('.favorites__items-checked');
    oldFavoritesItemsCheked.classList.remove('favorites__items-checked');
    const currentFavoritesItemsCheked = document.querySelector('.favorites__items-' + season);
    currentFavoritesItemsCheked.classList.add('favorites__items-checked');
}