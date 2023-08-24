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

function readyForSlider() {
    let activePagination = document.querySelector('.about__carousel__cirkle-active');
    checkLastPagination();
    if (+activePagination.innerText > +lastVisibleCirkle.innerText) {
        activePagination = lastVisibleCirkle;
        slideIndex = +lastVisibleCirkle.innerText;
    }
    removeActivePagination();
    addActivePagination(activePagination);
}

window.addEventListener('resize', (event) => {
    readyForSlider();
    showSlider();
})

readyForSlider();
showSlider();