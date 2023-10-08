const modalBackground = document.querySelector('.modal__background');
const modal = modalBackground.querySelector('.modal');

const btnSettings = document.querySelector('.btn-settings');
const btnCloseModal = document.querySelector('.modal__close');
const btnNewGame = document.querySelector('.btn-newGame');
const btnDifficulty = document.querySelector('.btn-difficulty');
const btnYes = document.querySelector('.yesOrNo__btn-yes');
const btnNo = document.querySelector('.yesOrNo__btn-no');
const btnLeaders = document.querySelectorAll('.btn-leaders');
const tableLeaders = document.querySelector('.leaders');
const btnCloseLeaders = document.querySelector('.leaders__close');
const listLeaders = tableLeaders.querySelector('.leaders__ol');

const svgEasy = `<svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 10H9.01M15 10H15.01M8.53516 14C9.22678 15.1956 10.5195 16 12 16C13.4806 16 14.7733 15.1956 15.4649 14M12 20C15.7277 20 18.8599 17.4505 19.748 14H20C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10H19.748C18.8599 6.54955 15.7277 4 12 4C8.27232 4 5.14012 6.54955 4.25204 10H4C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14H4.25204C5.14012 17.4505 8.27232 20 12 20Z" stroke="rgb(204, 20, 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const svgMedium = `<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
width="35px" height="35px" viewBox="0 0 512 512"  xml:space="preserve">
<style type="text/css">
<![CDATA[
.st0{fill:rgb(204, 20, 0);}
]]>
</style>
<g>
<path class="st0" d="M192.454,219.125c28.047,8.734,35.953-22.688,35.953-22.688c-17.203-1.156-56.281-16.406-56.281-16.406
   S168.61,211.688,192.454,219.125z"/>
<path class="st0" d="M285.985,196.438c0,0,7.906,31.422,35.969,22.688c23.828-7.438,20.313-39.094,20.313-39.094
   S303.188,195.281,285.985,196.438z"/>
<path class="st0" d="M438.172,415.984c-10.219-17.953-25.015-29.328-37.218-37.047c-6.125-3.875-11.703-6.859-15.781-9.094
   c-2.031-1.125-3.672-2.063-4.656-2.656l-0.813-0.531c-1.969-1.891-3.766-3.328-5.047-4.344c-0.094-0.078-0.141-0.125-0.219-0.172
   c0.281-0.797,0.672-1.734,1.203-2.906c1.328-2.859,3.5-6.766,6.656-11.672c10.969-17.063,25.266-40.625,36.938-68.656
   c11.64-28.031,20.75-60.719,20.765-96.109c-0.063-42.781-16.125-87.813-47.234-123c-15.563-17.563-34.984-32.578-57.969-43.141
   C311.829,6.063,285.329-0.016,256,0c-29.313-0.016-55.813,6.063-78.797,16.656c-34.5,15.875-60.875,41.688-78.469,71.188
   c-17.609,29.547-26.703,62.844-26.719,94.953c0,35.391,9.109,68.078,20.75,96.109c11.672,28.031,25.969,51.594,36.938,68.656
   c3.859,5.969,6.203,10.484,7.406,13.406c0.188,0.453,0.297,0.813,0.438,1.172c-1.297,1.016-3.172,2.516-5.234,4.5
   c-0.203,0.172-1.859,1.203-4.125,2.453c-4.109,2.281-10.281,5.5-17.063,9.781C100.907,385.344,89,394.281,79.313,407.5
   c-9.719,13.156-16.734,30.906-16.641,52.047v9.578l7.797,5.531C73.641,477,125.625,512.078,256,512
   c130.375,0.078,182.359-35,185.531-37.344l7.797-5.531v-9.578C449.359,442.688,444.969,427.891,438.172,415.984z M118.375,240.641
   c-5.625-18.375-9.266-37.875-9.266-57.844c-0.016-8.578,0.875-17.406,2.563-26.266h288.625c1.688,8.859,2.594,17.688,2.594,26.266
   c0,19.969-3.625,39.469-9.266,57.844H118.375z"/>
</g>
</svg>`;
const svgHard = `<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
width="35px" height="35px" viewBox="0 0 512 512"  xml:space="preserve">
<style type="text/css">
<![CDATA[
.st0{fill:rgb(204, 20, 0);}
]]>
</style>
<g>
<path class="st0" d="M133.234,478.948l-21.141-68.984c2.656-3.203,4.141-7.296,3.813-11.671
   c-0.688-9.375-9.25-16.438-19.156-15.797c-9.906,0.656-17.375,8.766-16.688,18.141c0.516,6.984,5.406,12.671,11.938,14.875
   l21.141,68.984c-2.656,3.188-4.141,7.281-3.813,11.672c0.688,9.359,9.266,16.438,19.156,15.797
   c9.906-0.656,17.375-8.781,16.688-18.141C144.656,486.839,139.781,481.151,133.234,478.948z"/>
<path class="st0" d="M40.953,438.651c-7.078,1.844-11.234,8.781-9.297,15.484l7.984,27.422c1.938,6.703,9.266,10.641,16.344,8.797
   l38.016-9.5l-15.031-51.703L40.953,438.651z"/>
<path class="st0" d="M192.125,401.527c-37.25,11.296-62.797,16.187-62.797,16.187L144,462.12c0,0,50.578-12.813,112-35.109
   c61.422,22.297,112,35.109,112,35.109l14.672-44.406c0,0-25.547-4.891-62.797-16.187c54.813-24.141,107.875-54.375,134.625-88.75
   c53.984-69.359,26.734-125.938,26.734-125.938s-4.125-9.469-9.656,8.75c-32.203,92.281-132,150.094-215.578,183.547
   c-83.578-33.453-183.375-91.266-215.578-183.547c-5.531-18.219-9.656-8.75-9.656-8.75S3.516,243.417,57.5,312.777
   C84.25,347.152,137.313,377.386,192.125,401.527z"/>
<path class="st0" d="M420,415.511c6.531-2.203,11.422-7.89,11.938-14.875c0.688-9.375-6.781-17.484-16.688-18.141
   c-9.906-0.641-18.469,6.422-19.156,15.797c-0.328,4.375,1.156,8.469,3.813,11.671l-21.141,68.984
   c-6.547,2.203-11.422,7.891-11.938,14.875c-0.688,9.359,6.781,17.484,16.688,18.141c9.891,0.641,18.469-6.438,19.156-15.797
   c0.328-4.391-1.156-8.484-3.813-11.672L420,415.511z"/>
<path class="st0" d="M471.047,438.651l-38.016-9.5L418,480.854l38.016,9.5c7.078,1.844,14.406-2.094,16.344-8.797l7.984-27.422
   C482.281,447.433,478.125,440.495,471.047,438.651z"/>
<path class="st0" d="M187.141,274.871v28.578c0,5.156,4.188,9.344,9.359,9.344h22.813c5.172,0,9.359-4.188,9.359-9.344v-23.922
   h7.797v23.922c0,5.156,4.188,9.344,9.344,9.344h22.828c5.172,0,9.359-4.188,9.359-9.344v-23.922h7.781v23.922
   c0,5.156,4.188,9.344,9.359,9.344h22.828c5.156,0,9.344-4.188,9.344-9.344v-28.578c23.781-7.219,63.5-23.984,77-57.859
   c9.828-24.641,5.984-57.063-8.719-119.578C380.875,34.917,338.125-0.004,257.234-0.004c-80.906,0-123.656,34.922-138.359,97.438
   c-14.719,62.516-18.563,94.938-8.734,119.578C123.641,250.886,163.359,267.652,187.141,274.871z M313.672,112.808
   c21.516-3.672,42.5,14.031,46.859,39.547s-9.547,49.188-31.063,52.875c-21.516,3.672-42.5-14.031-46.859-39.547
   C278.25,140.152,292.156,116.496,313.672,112.808z M257.234,197.558l20.672,25.859h-20.672h-20.688L257.234,197.558z
    M153.922,152.355c4.375-25.516,25.344-43.219,46.859-39.547c21.531,3.688,35.438,27.344,31.063,52.875
   c-4.359,25.516-25.344,43.219-46.859,39.547C163.469,201.542,149.563,177.871,153.922,152.355z"/>
</g>
</svg>`;

let difficulty = 1;
let oldDifficulty;

btnSettings.addEventListener('click', showModal);

btnCloseModal.addEventListener('click', hideModal);

btnNewGame.addEventListener('click', askQuestion);

btnDifficulty.addEventListener('click', changeDifficulty);

btnNo.addEventListener('click', answerNo);

btnYes.addEventListener('click', answerYes);

btnLeaders.forEach((element) => {
    element.addEventListener('click', showLeaders);
});

//btnLeaders.addEventListener('click', showLeaders);

btnCloseLeaders.addEventListener('click', hideLeaders);

function showModal() {
    isPaused = true;
    oldDifficulty = difficulty;
    modalBackground.classList.add('modal__background-active');
}

function checkDifficulty() {
    if (oldDifficulty != difficulty) {
        return true;
    }
    return false;
}

function hideModal() {
    if (!checkDifficulty()) {
        modalBackground.classList.remove('modal__background-active');
        isPaused = false;
        return;
    }
    askQuestion();
}

function askQuestion() {
    modal.classList.add('ask');
}

function answerNo() {
    difficulty = oldDifficulty - 1;
    changeDifficulty();
    modal.classList.remove('ask');
}

function answerYes() {
    oldDifficulty = difficulty;
    modal.classList.remove('ask');
    startNewGame();
}

function addDiDifficulty() {
    difficulty += 1;
    if (difficulty > 3) {
        difficulty = 1;
    }
}

function changeDifficulty() {
    addDiDifficulty();
    changeTitleForButton();
}

function changeTitleForButton() {
    if (difficulty == 1) {
        btnDifficulty.innerHTML = svgEasy + 'Easy';
        return;
    }
    if (difficulty == 2) {
        btnDifficulty.innerHTML = svgMedium + 'Medium';
        return;
    }
    btnDifficulty.innerHTML = svgHard + 'Hard';
}

function removeOldLeaders() {
    listLeaders.innerHTML = '';
}

function createNewLiItem() {
    const newLiItem = document.createElement('li');
    newLiItem.classList.add('leaders__li');
    return newLiItem;
}

function addNewLiItemToDocument(item) {
    listLeaders.append(item);
}

function addNewLeaders() {
    const bestResults = getScoringFromLs();
    for (let i = 0; i < bestResults.length; i++) {
        const newLiItem = createNewLiItem();
        newLiItem.textContent = bestResults[i].toString(10);
        if (bestResults[i] == score) {
            newLiItem.classList.add('leaders__li-current');
        }
        addNewLiItemToDocument(newLiItem);
    }
    checkLeadScore(bestResults[0]);
}

function showTableLeaders() {
    if (!modalBackground.classList.contains('modal__background-active')) {
        modalBackground.classList.add('modal__background-active');
    }
}

function hideTableLeaders() {
    if (start.classList.contains('win')) {
        modalBackground.classList.remove('modal__background-active');
    }
}

function checkLeadScore(bestResult) {
    if (bestResult) {
        if (bestResult == score) {
            playSoundNewHighScore();
        }
    }
}

function showLeaders() {
    removeOldLeaders();
    addNewLeaders();
    showTableLeaders();
    tableLeaders.classList.add('leaders-active');
}

function hideLeaders() {
    tableLeaders.classList.remove('leaders-active');
    hideTableLeaders();
}

function startNewGame() {
    hideModal();
    startPlay();
}

