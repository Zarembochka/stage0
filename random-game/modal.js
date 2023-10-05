const modalBackground = document.querySelector('.modal__background');

const btnSettings = document.querySelector('.btn-settings');
const btnCloseModal = document.querySelector('.modal__close');

btnSettings.addEventListener('click', showModal);

btnCloseModal.addEventListener('click', hideModal);

function showModal() {
    modalBackground.classList.add('modal__background-active');
}

function hideModal() {
    modalBackground.classList.remove('modal__background-active');
}

