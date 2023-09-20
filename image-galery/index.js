const domen = 'https://api.unsplash.com/search/photos?';
const perPage = '&per_page=24';
const landscape = '&orientation=landscape';
const clientId = '&client_id=Bda9lea5mENbVKHC99xZsfmKGipmZ1Z2HmXBNLQlI6M';

const input = document.querySelector('.header__search__box');
const main = document.querySelector('.main');

const btnSearch = document.querySelector('.header__search__btn');

let url = 'https://api.unsplash.com/search/photos?query=coffee&per_page=24&orientation=landscape&client_id=Bda9lea5mENbVKHC99xZsfmKGipmZ1Z2HmXBNLQlI6M';

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    showData(data.results);
}

function showElement(element) {
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

function showData(array) {
    array.map((element) => showElement(element));
}

function createRequest() {
    let request = '';
    if (input.value == '') {
        request = 'query=sea';
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

function searchImages() {
    deleteOldImages();
    createFullRequest();
    getData();
}

function deleteOldImages() {
    const images = document.querySelectorAll('.image');
    images.forEach((element) => element.remove());
}

getData();