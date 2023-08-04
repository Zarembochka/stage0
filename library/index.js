console.log("Общая оценка - 100: \n 1. Верстка валидная - 10; \n 2. Вёрстка семантическая - 16: \n 2.1 Присутствуют элементы <header>, <main>, <footer> - 2 \n 2.2 Присутствует шесть элементов <section> - 2 \n 2.3 Только один заголовок <h1> -2 \n 2.4 Присутствуют пять заголовков <h2> - 2 \n 2.5 Присутствует один элемент <nav> - 2 \n 2.6 Присутствуют два списка ul > li > a (панель навигации, ссылки на соцсети в футере) - 2 \n 2.7 Присутствуют семь кнопок <button> - 2 \n 2.8 Присутствуют два инпута <input> - 2 \n 3. Вёрстка соответствует макету - 54: \n 3.1 Блок <header> - 8 \n 3.2 Секция Welcome - 4 \n 3.3 Секция About - 6 \n 3.4 Секция Favorites - 8 \n 3.5 Секция CoffeShop - 6 \n 3.6 Секция Contacts - 6 \n 3.7 Секция LibraryCard - 8 \n 3.8 Блок <footer> - 8 \n 4. Общие требования к верстке - 20: \n 4.1 Для построения сетки используются флексы или гриды - 2 \n 4.2 При уменьшении масштаба страницы браузера вся вёрстка (контент и фоны) размещается по центру, а не сдвигается в сторону - 2 \n 4.3 Иконки добавлены в формате .svg - 2 \n 4.4 Изображения добавлены в формате .jpg (.jpeg) или .png - 2 \n 4.5 Есть favicon - 2 \n 4.6 Плавная прокрутка по якорям - 2 \n 4.7 В футере название ссылки Username заменено и ведет на GitHub студента - 2  \n 4.9 Интерактивность элементов согласно макету - 2 \n 4.10 Обязательное требование к интерактивности - 2");


document.addEventListener("DOMContentLoaded", function() {
    //  работа бургер меню
    const burgerBtn = document.getElementById('burger');
    const header = document.querySelector('.header');
    burgerBtn.addEventListener('click', function() {
            header.classList.toggle('header-burger');
        });
    const navMenu = document.querySelector('.header__nav');
    navMenu.addEventListener('click', function() {
        header.classList.remove('header-burger');
        })

    burgerBtn.addEventListener('click', (event) => {
        event._isClickOnTheMenu = true;
    });
    navMenu.addEventListener('click', (event) => {
        event._isClickOnTheMenu = true;
    });

    document.body.addEventListener('click', (event) => {
        if (event._isClickOnTheMenu) {
            return;
        }
        header.classList.remove('header-burger');
    })

    // работа радиобаттона
    const favoritesForm = document.querySelector('.favorites__form');
    favoritesForm.addEventListener('click', (event) => {
        toChangeFavoritesOfSeason(event.currentTarget.querySelector('.favorites__form__radio:checked').value);
    })
})

function toChangeFavoritesOfSeason(season) {
    const oldFavoritesItemsCheked = document.querySelector('.favorites__items-checked');
    oldFavoritesItemsCheked.classList.remove('favorites__items-checked');
    const currentFavoritesItemsCheked = document.querySelector('.favorites__items-' + season);
    currentFavoritesItemsCheked.classList.add('favorites__items-checked');
}