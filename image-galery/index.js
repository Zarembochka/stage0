const url = 'https://api.unsplash.com/search/photos?query=coffee&per_page=24&orientation=landscape&client_id=Bda9lea5mENbVKHC99xZsfmKGipmZ1Z2HmXBNLQlI6M';

const main = document.querySelector('.main');

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

getData();