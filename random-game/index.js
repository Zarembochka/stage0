const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");

const setColors = new Set();

let timeForMovement;
let timeoutForMatchColor;
let timeForAddRow;
let timeForAddingZeroRow = false;

let colors;
let lengthColors;

let x;
let y;

const ballRadius = 20;
let isPlaying = false;
let currentBall;

let dx;
let dy;

let circkleRowCount;
const circkleColumnCount = 14;

const circkles = [];

let startColor;
let startPositionForNewRow;
let startPositionForZeroRow;
let flagNewRow = 2;
let flagZeroRow = 2;
let score = 0;

const btnNewGame = document.querySelector('.newGame');
const canvasImage = document.querySelector('.canvas__image');
const btnStartPlay = document.querySelector('.start__play');
const start = document.querySelector('.start');
const header = document.querySelector('.header');
const scoreText = document.querySelector('.score__value');

function getDifficulty() {
    colors = ['yellow', 'red', 'orange', 'blue', 'green'];
    //colors = ['yellow', 'red', 'orange', 'blue', 'green', 'blueviolet'];
    startColor = randomColor();
    lengthColors = colors.length;
    circkleRowCount = 5;
}

function setFlagForNewRow() {
    if (flagNewRow == 1) {
        flagNewRow = 2;
        return;
    }
    flagNewRow = 1;
}

function setStartPositionForNewRow() {
    startPositionForNewRow = 5 + ballRadius * flagNewRow;
    setFlagForNewRow();
}

function setStartPositionForZeroRow() {
    startPositionForZeroRow = 5 + ballRadius * flagZeroRow;
    if (flagZeroRow == 1) {
        flagZeroRow = 2;
        return;
    }
    flagZeroRow = 1;
}

function addZeroRowToStartCircles() {
    const newRow = [];
    circkles.push(newRow);
    circkleRowCount += 1;
    for (let i = 0; i < circkleRowCount - 1; i++) {
        for (let j = 0; j < circkleColumnCount; j++) {
            const row = circkleRowCount - 2 - i;
            const ball = circkles[circkleRowCount - 2 - i][j];
            circkles[row + 1][j] = {x: ball.x, y: ball.y + 2 * ballRadius + 1, color: ball.color, status: ball.status, match: ball.match, isCheked: ball.isCheked, isCheking: ball.isCheking, basis: ball.basis, odd: ball.odd};
        }
    }

    for (let j = 0; j < circkleColumnCount; j++) {
        circkles[0][j].color = randomColor();
        circkles[0][j].y = ballRadius + 5;
        circkles[0][j].status = 1;
        circkles[0][j].x = startPositionForZeroRow + 2 * (ballRadius + 1) * j;
        circkles[0][j].odd = flagZeroRow % 2;
    }
    setStartPositionForZeroRow();
    timeForAddingZeroRow = false;
}

function setFlagForAddingZeroRow() {
    timeForAddingZeroRow = true;
}

function InitiateCircles() {
    for (let i = 0; i < circkleRowCount; i++) {
        circkles[i] = [];
        let startPosition = 5 + ballRadius;
            if (i % 2 != 0) {
                startPosition = 5 + ballRadius * 2;
            }
        let odd = i % 2;
        for (let j = 0; j < circkleColumnCount; j++) {
            circkles[i][j] = {x: startPosition + 2 * (ballRadius + 1) * j, y: ballRadius + 5 + 2 * (ballRadius + 0.5) * i, color: randomColor(), status: 1, match: 0, isCheked: 0, isCheking: 0, basis: 1, odd: odd}
        }
    }
}

function changePosition() {
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = - dx;
    }
    if (y + dy > canvas.height - ballRadius) {
        dy = - dy;
    }
    x += dx;
    y += dy;
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkCollision() {
    for (let i = 0; i < circkleRowCount; i++) {
        for (let j = 0; j < circkleColumnCount; j++) {
            const ball = circkles[i][j];
            if (ball.status == 1) {
                if (isCollision(x, y , ball.x, ball.y)) {
                    addCircleToStartCircles();
                    return;
                }
            }
        }
    }
    checkCollisionWithCanvas();
}

function checkCollisionWithCanvas() {
    for (let j = 0; j < circkleColumnCount; j++) {
        const ball = circkles[0][j];
        if (isCollision(x, y , ball.x, ball.y)) {
            console.log('колизия с началом');
            addCircleToStartCircles();
            return;
        }
    }
}

function calculateLength(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const length = Math.sqrt( Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return length;
}

function isCollision(x1, y1, x2, y2) {
    const length = calculateLength(x1, y1, x2, y2);
    if (length <= 2 * ballRadius) {
        return true;
    }
    return false;
}

function isPositionToCircle(x1, y1, x2, y2) {
    const length = calculateLength(x1, y1, x2, y2);
    if (length <= 2 * ballRadius) {
        return true;
    }
    return false;
}

function changeCircleForVisible(ball) {
    ball.status = 1;
    ball.color = startColor;
    ball.match = 1;
    currentBall = ball;
}

function findPositionToCollisionCircle() {
    for (let i = 0; i < circkleRowCount; i++) {
        for (let j = 0; j < circkleColumnCount; j++) {
            const ball = circkles[i][j];
            if (ball.status == 0) {
                if (isPositionToCircle(x, y, ball.x, ball.y)) {
                    changeCircleForVisible(ball);
                    clear();
                    drowStartCircles();
                    findColorMatches(currentBall);
                    return;
                }
            }
        }
    }
    addRowToStartCircles();
    addCircleToNewRow();
}

function addCircleToStartCircles() {
    clearInterval(timeForMovement);
    findPositionToCollisionCircle();
    clear();
    drowStartCircles();
    if (!checkLossGame()) {
        nextCircle();
    }
    isPlaying = false;
}

function addRowToStartCircles() {
    circkleRowCount += 1;
    circkles.push([]);
    const j = circkleRowCount - 1;
    const odd = flagNewRow % 2;
    for (let i = 0; i < circkleColumnCount; i++) {
        circkles[j][i] = {x: startPositionForNewRow + 2 * (ballRadius + 1) * i, y: ballRadius + 5 + 2 * (ballRadius + 0.5) * j, color: 0, status: 0, match: 0, isCheked: 0, isCheking: 0, basis: 1, odd: odd}
    }
    setStartPositionForNewRow();
}

function addCircleToNewRow() {
    const j = circkleRowCount - 1;
    for (let i = 0; i < circkleColumnCount; i++) {
        const ball = circkles[j][i];
        if (isPositionToCircle(x, y, ball.x, ball.y)) {
            changeCircleForVisible(ball);
            clear();
            drowStartCircles();
            findColorMatches(currentBall);
            return;
        }
    }
}

function drowStartCircles() {
    for (let i = 0; i < circkleRowCount; i++) {
        for (let j = 0; j < circkleColumnCount; j++) {
            if (circkles[i][j].status == 1) {
                drawStartCirckle(circkles[i][j]);
            }
        }
    }
}

function drawStartCirckle(element) {
    ctx.beginPath();
    ctx.arc(element.x, element.y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = element.color;
    ctx.fill();
    ctx.closePath();
}

function drawMainCircle(color) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawMainImage() {
    const img = createImage();
    img.onload = () => {
        ctx.drawImage(img, x - ballRadius, y - ballRadius, 2 * ballRadius, 2 * ballRadius);
    }
}

function draw() {
    clear();
    if (timeForAddingZeroRow) {
        addZeroRowToStartCircles();
    }
    drowStartCircles();
    drawMainCircle(startColor);
    //drawMainImage();
    checkCollision();
    changePosition();
}

function createImage() {
    const img = new Image();
    img.src = './images/orange.png';
    return img;
}

function calculateVector(x, y) {
    const length = calculateLength(canvas.width / 2, canvas.height - ballRadius, x, y);
    dx = - 10 * (canvas.width / 2 - x) / length;
    dy = - 10 * (canvas.height - ballRadius - y) / length;
}

function startMovement(event) {
    if (!isPlaying) {
        calculateVector(event.offsetX, event.offsetY);
        timeForMovement = setInterval(draw, 10);
        isPlaying = true;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomColor() {
    const randomInt = getRandomInt(lengthColors);
    return colors[randomInt]
}

function setColorsArray() {
    if (setColors.size) {
        colors = Array.from(setColors);
        lengthColors = colors.length;
    }
}

function startPosition() {
    setColorsArray();
    x = canvas.width / 2;
    y = canvas.height - ballRadius;
    startColor = randomColor();
}

function startPlay() {
    getDifficulty();
    InitiateCircles();
    drowStartCircles();
    startPosition();
    drawMainCircle(startColor);
    setStartPositionForNewRow();
    setStartPositionForZeroRow();
    //drawMainImage();
    timeForAddRow = setInterval(setFlagForAddingZeroRow, 20000);
}

function nextCircle() {
    startPosition();
    drawMainCircle(startColor);
}

function checkColorBall(ball, i, j) {
    if (ball.color == currentBall.color) {
        ball.match = 1;
        checkNeighbors(i, j);
    }
}

function checkColorRightBall(i, j) {
    if (j == circkleColumnCount - 1) {
        return;
    }
    const rightBall = circkles[i][j + 1];
    if (rightBall.status == 0 || rightBall.isCheked == 1) {
        return;
    }
    rightBall.isCheked = 1;
    checkColorBall(rightBall, i, j + 1);
}

function checkColorLeftBall(i, j) {
    if (j == 0) {
        return;
    }
    const leftBall = circkles[i][j - 1];
    if (leftBall.status == 0 || leftBall.isCheked == 1) {
        return;
    }
    leftBall.isCheked = 1;
    checkColorBall(leftBall, i, j - 1);
}

function checkColorBottomRightBall(i, j, odd) {
    if (i == circkleRowCount - 1) {
        return;
    }
    let bottomBall = circkles[i + 1][j];
    let column = j;
    if (odd != 0) {
        if (j == circkleColumnCount - 1) {
            return;
        }
        bottomBall = circkles[i + 1][j + 1];
        column = j + 1;
    }
    if (bottomBall.status == 0 || bottomBall.isCheked == 1) {
        return;
    }
    bottomBall.isCheked = 1;
    checkColorBall(bottomBall, i + 1, column);
}

function checkColorBottomLeftBall(i, j, odd) {
    if (i == circkleRowCount - 1) {
        return;
    }
    let bottomBall = circkles[i + 1][j];
    let column = j;
    if (odd == 0) {
        if (j == 0) {
            return;
        }
        bottomBall = circkles[i + 1][j - 1];
        column = j - 1;
    }
    if (bottomBall.status == 0 || bottomBall.isCheked == 1) {
        return;
    }
    bottomBall.isCheked = 1;
    checkColorBall(bottomBall, i + 1, column);
}

function checkColorTopLeftBall(i, j, odd) {
    if (i == 0) {
        return;
    }
    let topBall = circkles[i - 1][j];
    let column = j;
    if (odd == 0) {
        if (j == 0) {
            return;
        }
        topBall = circkles[i - 1][j - 1];
        column = j - 1;
    }
    if (topBall.status == 0 || topBall.isCheked == 1) {
        return;
    }
    topBall.isCheked = 1;
    checkColorBall(topBall, i - 1, column);
}

function checkColorTopRightBall(i, j, odd) {
    if (i == 0) {
        return;
    }
    let topBall = circkles[i - 1][j];
    let column = j;
    if (odd != 0) {
        if (j == circkleColumnCount - 1) {
            return;
        }
        topBall = circkles[i - 1][j + 1];
        column = j + 1;
    }
    if (topBall.status == 0 || topBall.isCheked == 1) {
        return;
    }
    topBall.isCheked = 1;
    checkColorBall(topBall, i - 1, column);
}

function checkNeighbors(i, j) {
    const ball = circkles[i][j];
    ball.isCheked = 1;
    checkColorRightBall(i, j);
    checkColorBottomRightBall(i, j, ball.odd);
    checkColorBottomLeftBall(i, j, ball.odd);
    checkColorLeftBall(i, j);
    checkColorTopLeftBall(i, j, ball.odd);
    checkColorTopRightBall(i, j, ball.odd);
}

function findColorMatches(ball) {
    for (let i = 0; i < circkleRowCount; i++) {
        const currentPosition = circkles[i].findIndex((element => element == ball));
        if (currentPosition != -1) {
            checkNeighbors(i, currentPosition);
            checkAllMatches();
            return;
        }
    }
}

function checkAllMatches() {
    console.log(1);
    const circlesMatches = [];
    for (let i = 0; i < circkleRowCount; i++) {
        const rowMatches = circkles[i].filter((element) => element.match == 1);
        if (rowMatches.length > 0) {
            circlesMatches.push(rowMatches);
        }
    }
    if (circlesMatches.flat().length > 2) {
        deleteMatches(true);
        changeScore();
        clear();
        drowStartCircles();
        checkHendingCircles();
        deleteEmptyRows();
        checkWinGame();
        return;
    }
    deleteMatches(false);
}

function deleteMatches(flag) {
    setColors.clear();
    for (let i = 0; i < circkleRowCount; i++) {
        for (let j = 0; j < circkleColumnCount; j++) {
            const ball = circkles[i][j];
            ball.isCheked = 0;
            ball.basis = 0;
            ball.isCheking = 0;
            if (ball.match == 1) {
                if (flag) {
                    ball.color = 0;
                    score += 10;
                    //ball.color = 'aqua';
                 }
                //ball.color = 0;
                ball.status = +(!flag);
                ball.match = 0;
            }
        }
    }
}

function deleteEmptyRows() {
    let doIt = true;
    while (doIt) {
        if (circkleRowCount == 0) {
            break;
        }
        const circlesRow = circkles.at(-1);
        if (circlesRow.every((element) => element.status == 0)) {
            circkles.pop();
            circkleRowCount -= 1;
            setStartPositionForNewRow();
        } else {
            doIt = false;
        }
    }
}

function setBasisForStartRow() {
    const startRow = circkles[0];
    for (let i = 0; i < circkleColumnCount; i++) {
        startRow[i].basis = startRow[i].status;
        startRow[i].isCheked = 1;
    }
}

function setBasisBottomLeftBall(i, j, odd) {
    if (i == circkleRowCount - 1) {
        return;
    }
    let bottomBall = circkles[i + 1][j];
    let column = j;
    if (odd == 0) {
        if (j == 0) {
            return;
        }
        bottomBall = circkles[i + 1][j - 1];
        column = j - 1;
    }
    if (bottomBall.isCheked) {
        return;
    }
    if (bottomBall.status == 0) {
        bottomBall.isCheked = 1;
        return;
    }
    bottomBall.isCheked = 1;
    bottomBall.basis = 1;
    setBasisNeighbors(i + 1, column, bottomBall);
}

function setBasisBottomRightBall(i, j, odd) {
    if (i == circkleRowCount - 1) {
        return;
    }
    let bottomBall = circkles[i + 1][j];
    let column = j;
    if (odd != 0) {
        if (j == circkleColumnCount - 1) {
            return;
        }
        bottomBall = circkles[i + 1][j + 1];
        column = j + 1;
    }
    if (bottomBall.isCheked) {
        return;
    }
    if (bottomBall.status == 0) {
        bottomBall.isCheked = 1;
        return;
    }
    bottomBall.isCheked = 1;
    bottomBall.basis = 1;
    setBasisNeighbors(i + 1, column, bottomBall);
}

function setBasisTopLeftBall(i, j, odd) {
    if (i == 0) {
        return;
    }
    let topBall = circkles[i - 1][j];
    let column = j;
    if (odd == 0) {
        if (j == 0) {
            return;
        }
        topBall = circkles[i - 1][j - 1];
        column = j - 1;
    }
    if (topBall.isCheked) {
        return;
    }
    if (topBall.status == 0) {
        topBall.isCheked = 1;
        return;
    }
    topBall.isCheked = 1;
    topBall.basis = 1;
    setBasisNeighbors(i - 1, column, topBall);
}

function setBasisTopRightBall(i, j, odd) {
    if (i == 0) {
        return;
    }
    let topBall = circkles[i - 1][j];
    let column = j;
    if (odd != 0) {
        if (j == circkleColumnCount - 1) {
            return 0;
        }
        topBall = circkles[i - 1][j + 1];
        column = j + 1;
    }
    if (topBall.isCheked) {
        return;
    }
    if (topBall.status == 0) {
        topBall.isCheked = 1;
        return;
    }
    topBall.isCheked = 1;
    topBall.basis = 1;
    setBasisNeighbors(i - 1, column, topBall);
}

function setBasisRightBall(i, j) {
    if (j == circkleColumnCount - 1) {
        return;
    }
    const rightBall = circkles[i][j + 1];
    if (rightBall.isCheked) {
        return;
    }
    if (rightBall.status == 0) {
        rightBall.isCheked = 1;
        return;
    }
    rightBall.isCheked = 1;
    rightBall.basis = 1;
    setBasisNeighbors(i, j + 1, rightBall);
}

function setBasisLeftBall(i, j) {
    if (j == 0) {
        return;
    }
    const leftBall = circkles[i][j - 1];
    if (leftBall.isCheked) {
        return;
    }
    if (leftBall.status == 0) {
        leftBall.isCheked = 1;
        return;
    }
    leftBall.isCheked = 1;
    leftBall.basis = 1;
    setBasisNeighbors(i, j - 1, leftBall);
}

function setBasisNeighbors(i, j, ball) {
    if (ball.status == 0) {
        ball.isCheked = 1;
        return;
    }
    if (ball.basis == 0) {
        return;
    }
    setBasisRightBall(i, j);
    setBasisBottomRightBall(i, j, ball.odd);
    setBasisBottomLeftBall(i, j, ball.odd);
    setBasisLeftBall(i, j);
    setBasisTopLeftBall(i, j, ball.odd);
    setBasisTopRightBall(i, j, ball.odd);
}

function setBasisForBottomRows() {
    for (let j = 0; j < circkleColumnCount; j++) {
        const ball = circkles[0][j];
        if (ball.isCheked) {
            setBasisNeighbors(0, j, ball);
        }
    }
}

function checkHendingCircles() {
    setBasisForStartRow();
    setBasisForBottomRows();
    deleteCirclesWithoutBasis();
}

function deleteCirclesWithoutBasis() {
    for (let i = 0; i < circkleRowCount; i++) {
        for (let j = 0; j < circkleColumnCount; j++) {
            const ball = circkles[i][j];
            ball.isCheked = 0;
            ball.isCheking = 0;
            if (ball.basis == 0 && ball.status != 0) {
                //ball.color = 'black';
                ball.status = 0;
                ball.color = 0;
                score += 10;
            }
            if (ball.status == 1) {
                setColors.add(ball.color);
            }
        }
    }
}

function checkLossGame() {
    const lastRow = circkles.at(-1);
    for (let i = 0; i < circkleColumnCount; i++) {
        const ball = lastRow[i];
        if (ball.status == 1) {
            if (ball.y + ballRadius + 2 >= canvas.height - 2 * ballRadius) {
                showLostImage();
                return true;
            }
        }
    }
    return false;
}

function showLostImage() {
    clear();
    canvasImage.classList.remove('canvas__image-hide');
    canvasImage.classList.add('canvas__image-lost');
}

function checkWinGame() {
    if (circkleRowCount == 0) {
        clear();
        alert('Winner!');
        return true;
    }
    return false;
}

canvas.addEventListener('click', startMovement);

btnStartPlay.addEventListener('click', changeStartField);

//canvasImage.addEventListener('click', changeStartField);

//canvasImage.addEventListener('animationend', checkAnimation);

start.addEventListener('animationend', checkAnimation);

function changeStartField() {
    //canvasImage.classList.add('canvas__image-fadeout');
    start.classList.add('start-fadeout');
}

function showStartFild() {
    // canvasImage.classList.add('canvas__image-hide');
    // canvasImage.classList.remove('canvas__image-fadeout');
    // canvasImage.classList.remove('canvas__image-start');
    start.classList.add('start-hide');
    start.classList.remove('canvas__image-fadeout');
    canvas.classList.add('canvas-show');
    header.classList.add('header-show');
    startPlay();
}

function checkAnimation(event) {
    if (event.animationName === "fade-out") {
        showStartFild();
    }
}

btnNewGame.addEventListener('click', deleteBalls);

function changeScore() {
    scoreText.textContent = score.toString(10);
}

function deleteBalls() {
    for (let i = 0; i < circkleRowCount; i++) {
        for (let j = 0; j < circkleColumnCount; j++) {
            const ball = circkles[i][j];
            if (ball.color == 'black') {
                ball.status = 0;
                ball.color = 0;
            }
        }
    }
    clear();
    drowStartCircles();
    drawMainCircle(startColor);
}