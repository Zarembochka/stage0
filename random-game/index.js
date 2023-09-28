const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");

//const colors = ['yellow', 'red', 'orange', 'pink', 'blue', 'green', 'purple'];
let colors = ['yellow', 'red', 'orange', 'blue', 'green'];
let lengthColors = colors.length;

const setColors = new Set();

let timeForMovement;

let x;
let y;

const ballRadius = 20;
let isPlaying = false;
let currentBall;

let dx;
let dy;

let circkleRowCount = 3;
const circkleColumnCount = 14;

const circkles = [];
let startColor = randomColor();

let timeoutForMatchColors;

const btnNewGame = document.querySelector('.newGame');
const canvasImage = document.querySelector('.canvas__image');

function InitiateCircles() {
    for (let i = 0; i < circkleRowCount; i++) {
        circkles[i] = [];
        let startPosition = 5 + ballRadius;
            if (i % 2 != 0) {
                startPosition = 5 + ballRadius * 2;
            }
        for (let j = 0; j < circkleColumnCount; j++) {
            circkles[i][j] = {x: startPosition + 2 * (ballRadius + 1) * j, y: ballRadius + 2 * (ballRadius + 0.5) * i, color: randomColor(), status: 1, match: 0, isCheked: 0, basis: 1}
        }
    }
}

function changePosition() {
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = - dx;
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
    if (length <= 2 * ballRadius + 2) {
        return true;
    }
    return false;
}

function findPositionToCollisionCircle() {
    for (let i = 0; i < circkleRowCount; i++) {
        for (let j = 0; j < circkleColumnCount; j++) {
            const ball = circkles[i][j];
            if (ball.status == 0) {
                if (isPositionToCircle(x, y, ball.x, ball.y)) {
                    ball.status = 1;
                    ball.color = startColor;
                    ball.match = 1;
                    currentBall = ball;
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
    let startPosition = 5 + ballRadius;
    if (circkleRowCount % 2 == 0) {
        startPosition = 5 + ballRadius * 2;
    }
    const j = circkleRowCount - 1;
    for (let i = 0; i < circkleColumnCount; i++) {
        circkles[j][i] = {x: startPosition + 2 * (ballRadius + 1) * i, y: ballRadius + 2 * (ballRadius + 0.5) * j, color: 0, status: 0, match: 0, isCheked: 0, basis: 1}
    }
}

function addCircleToNewRow() {
    const j = circkleRowCount - 1;
    for (let i = 0; i < circkleColumnCount; i++) {
        const ball = circkles[j][i];
        if (isPositionToCircle(x, y, ball.x, ball.y)) {
            ball.status = 1;
            ball.color = startColor;
            ball.match = 1;
            currentBall = ball;
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
    //const delta = Math.sqrt( Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    //dx = - (canvas.width / 2 - x) / 100;
    //dy = - (canvas.height - 10 - y) / 100;
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
    InitiateCircles();
    drowStartCircles();
    startPosition();
    drawMainCircle(startColor);
    //drawMainImage();
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

function checkColorBottomRightBall(i, j) {
    if (i == circkleRowCount - 1) {
        return;
    }
    let bottomBall = circkles[i + 1][j];
    let column = j;
    if (i % 2 != 0) {
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

function checkColorBottomLeftBall(i, j) {
    if (i == circkleRowCount - 1) {
        return;
    }
    let bottomBall = circkles[i + 1][j];
    let column = j;
    if (i % 2 == 0) {
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

function checkColorTopLeftBall(i, j) {
    if (i == 0) {
        return;
    }
    let topBall = circkles[i - 1][j];
    let column = j;
    if (i % 2 == 0) {
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

function checkColorTopRightBall(i, j) {
    if (i == 0) {
        return;
    }
    let topBall = circkles[i - 1][j];
    let column = j;
    if (i % 2 != 0) {
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
    checkColorBottomRightBall(i, j);
    checkColorBottomLeftBall(i, j);
    checkColorLeftBall(i, j);
    checkColorTopLeftBall(i, j);
    checkColorTopRightBall(i, j);
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
    const circlesMatches = [];
    for (let i = 0; i < circkleRowCount; i++) {
        const rowMatches = circkles[i].filter((element) => element.match == 1);
        if (rowMatches.length > 0) {
            circlesMatches.push(rowMatches);
        }
    }
    if (circlesMatches.flat().length > 2) {
        deleteMatches(true);
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
            if (ball.match == 1) {
                if (flag) {
                    ball.color = 0;
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
        } else {
            doIt = false;
        }
    }
}

function setBasisForStartRow() {
    const startRow = circkles[0];
    for (let i = 0; i < circkleColumnCount; i++) {
        startRow[i].basis = startRow[i].status;
    }
}

function setBasisBottomLeftBall(i, j, basis) {
    if (i == circkleRowCount - 1) {
        return;
    }
    let bottomBall = circkles[i + 1][j];
    if (i % 2 == 0) {
        if (j == 0) {
            return;
        }
        bottomBall = circkles[i + 1][j - 1];
    }
    if (bottomBall.status == 0 || bottomBall.basis == 1) {
        return;
    }
    bottomBall.basis = basis;
}

function setBasisBottomRightBall(i, j, basis) {
    if (i == circkleRowCount - 1) {
        return;
    }
    let bottomBall = circkles[i + 1][j];
    if (i % 2 != 0) {
        if (j == circkleColumnCount - 1) {
            return;
        }
        bottomBall = circkles[i + 1][j + 1];
    }
    if (bottomBall.status == 0 || bottomBall.basis == 1) {
        return;
    }
    bottomBall.basis = basis;
}

function setBasisTopLeftBall(i, j, basis) {
    if (i == 0) {
        return;
    }
    let topBall = circkles[i - 1][j];
    if (i % 2 == 0) {
        if (j == 0) {
            return;
        }
        topBall = circkles[i - 1][j - 1];
    }
    if (topBall.status == 0 || topBall.basis == 1) {
        return 0;
    }
    topBall.basis = basis;
}

function setBasisTopRightBall(i, j, basis) {
    if (i == 0) {
        return;
    }
    let topBall = circkles[i - 1][j];
    if (i % 2 != 0) {
        if (j == circkleColumnCount - 1) {
            return 0;
        }
        topBall = circkles[i - 1][j + 1];
    }
    if (topBall.status == 0 || topBall.basis == 1) {
        return 0;
    }
    topBall.basis = basis;
}

function setBasisRightBall(i, j, basis) {
    if (j == circkleColumnCount - 1) {
        return;
    }
    const rightBall = circkles[i][j + 1];
    if (rightBall.status == 0 || rightBall.basis == 1) {
        return;
    }
    rightBall.basis = basis;
}

function setBasisLeftBall(i, j, basis) {
    if (j == 0) {
        return;
    }
    const leftBall = circkles[i][j - 1];
    if (leftBall.status == 0 || leftBall.basis == 1) {
        return;
    }
    leftBall.basis = basis;
}

function setBasisNeighbors(i, j, basis) {
    setBasisRightBall(i, j, basis);
    setBasisBottomRightBall(i, j, basis);
    setBasisBottomLeftBall(i, j, basis);
    setBasisLeftBall(i, j, basis);
    setBasisTopLeftBall(i, j, basis);
    setBasisTopRightBall(i, j, basis);
}

function setBasisForBottomRows() {
    for (let i = 0; i < circkleRowCount; i++) {
        for (let j = 0; j < circkleColumnCount; j++) {
            const ball = circkles[i][j];
            setBasisNeighbors(i, j, ball.basis);
        }
    }
}

function checkHendingCircles() {
    setBasisForStartRow();
    setBasisForBottomRows();
    deleteCirclesWithoutBasis();
}

function deleteCirclesWithoutBasis() {
    console.log(circkles);
    for (let i = 0; i < circkleRowCount; i++) {
        for (let j = 0; j < circkleColumnCount; j++) {
            const ball = circkles[i][j];
            if (ball.basis == 0) {
                //ball.color = 'black';
                ball.status = 0;
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

canvasImage.addEventListener('click', changeStartField);

canvasImage.addEventListener('animationend', checkAnimation);

function changeStartField() {
    canvasImage.classList.add('canvas__image-fadeout');
}

function showStartFild() {
    canvasImage.classList.add('canvas__image-hide');
    canvasImage.classList.remove('canvas__image-fadeout');
    canvasImage.classList.remove('canvas__image-start');
    startPlay();
}

function checkAnimation(event) {
    if (event.animationName === "fade-out") {
        showStartFild();
    }
}