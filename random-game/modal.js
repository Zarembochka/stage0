const modalBackground = document.querySelector('.modal__background');
const modal = modalBackground.querySelector('.modal');

const btnSettings = document.querySelector('.btn-settings');
const btnCloseModal = document.querySelector('.modal__close');
const btnNewGame = document.querySelector('.newGame');
const btnYes = document.querySelector('.yesOrNo__btn-yes');
const btnNo = document.querySelector('.yesOrNo__btn-no');

btnSettings.addEventListener('click', showModal);

btnCloseModal.addEventListener('click', hideModal);

btnNewGame.addEventListener('click', askQuestion);

btnNo.addEventListener('click', answerNo);

btnYes.addEventListener('click', answerYes);

function showModal() {
    modalBackground.classList.add('modal__background-active');
}

function hideModal() {
    modalBackground.classList.remove('modal__background-active');
}

function askQuestion() {
    modal.classList.add('ask');
}

function answerNo() {
    modal.classList.remove('ask');
}

function answerYes() {
    modal.classList.remove('ask');
    startNewGame();
}

function startNewGame() {
    hideModal();
    startPlay();
}

