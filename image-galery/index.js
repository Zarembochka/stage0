import './keys.js';

const domen = 'https://api.unsplash.com/search/photos?';
const perPage = '&per_page=24';
const landscape = '&orientation=landscape';
const apiKey = window.keys.API_KEY;
const clientId = `&client_id=${apiKey}`;

const input = document.querySelector('.header__search__box');
const main = document.querySelector('.main');

const btnSearch = document.querySelector('.header__search__btn');
const btnClearSearch = document.querySelector('.header__search__close');

const modalBackground = document.querySelector('.modal__background');
const modal = document.querySelector('.modal');

let url = 'https://api.unsplash.com/search/photos?query=coffee&per_page=24&orientation=landscape&client_id=Bda9lea5mENbVKHC99xZsfmKGipmZ1Z2HmXBNLQlI6M';

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    showData(data.results);
}

function showNewElement(element) {
    const newImage = createImg(element);
    setElement(newImage);
}

function setElement(element) {
    main.append(element);
}

function createImg(element) {
    const img = document.createElement('img');
    img.classList.add('image');
    img.src = element.urls.regular;
    img.alt = `image`;
    return img;
}

function createTextMessage() {
    const message = document.createElement('p');
    message.classList.add('message');
    message.textContent = 'Oops! Try to find other images!';
    return message;
}

function showEmptyResult() {
    const message = createTextMessage();
    setElement(message);
}

function showData(array) {
    if (array.length == 0) {
        showEmptyResult();
        return;
    }
    array.map((element) => showNewElement(element));
}

function createRequest() {
    let request = '';
    if (input.value.trim() == '') {
        request = 'query=coffee';
        return request;
    }
    const subject = input.value;
    request = `query=${subject}`;
    return request;
}

function createFullRequest() {
    const request = createRequest();
    url = `${domen}${request}${perPage}${landscape}${clientId}`;
}

btnSearch.addEventListener('click', searchImages);

input.addEventListener('keydown', checkKeydown);

btnClearSearch.addEventListener('click', clearSearch);

main.addEventListener('click', showModal);

modalBackground.addEventListener('click', hideModal);

function createImage(src) {
    const img = document.createElement('img');
    img.classList.add('large-image');
    img.src = src;
    img.alt = `image`;
    return img;
}

function setImageInModal(image) {
    modal.append(image);
}

function showImageInModal(src) {
    const img = createImage(src);
    setImageInModal(img);
}

function calcRightPadding() {
    return window.innerWidth - document.body.clientWidth + 'px';
}

function fixWindowWidth() {
    document.body.style.paddingRight = calcRightPadding();
    document.body.classList.toggle('modal-active');
}

function unfixWindowWidth() {
    document.body.style.paddingRight = 0;
    document.body.classList.remove('modal-active');
}

function showModal(event) {
    if (event.srcElement.classList.contains('image')) {
        showImageInModal(event.srcElement.src);
        fixWindowWidth();
        modalBackground.classList.add('modal__background-active');
    }
}

function clearModal() {
    modal.textContent = '';
}

function hideModal() {
    clearModal();
    unfixWindowWidth();
    modalBackground.classList.remove('modal__background-active');
}

function clearSearch() {
    input.value = '';
    btnClearSearch.classList.remove('header__search__close-show');
    // searchImages();
}

function showBtnClearSearch() {
    btnClearSearch.classList.add('header__search__close-show');
}

function checkKeydown(event) {
    if (event.key == 'Enter') {
        searchImages();
        return;
    }
    showBtnClearSearch();
}

function searchImages() {
    deleteOldImages();
    createFullRequest();
    getData();
}

function deleteOldImages() {
    main.textContent = '';
}

getData();

const message = 'Самооценка - 70: \n1.Вёрстка - 10;\n1.1 на странице есть несколько фото и строка поиска - 5;\n1.2 в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс - 5;\n2. При загрузке приложения на странице отображаются полученные от API изображения - 10;\n3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API - 10;\n4. Поиск - 30:\n4.1 при открытии приложения курсор находится в поле ввода - 5;\n4.2 есть placeholder - 5;\n4.3 автозаполнение поля ввода отключено - 5;\n4.4 поисковый запрос можно отправить нажатием клавиши Enter - 5;\n4.5 после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода - 5;\n4.6 в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder - 5;\n5. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения - 10';

console.log(message);