const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");

const setColors = new Set();


let timeForMovement;
let timeForAddRow;
let timeForAddingZeroRow = false;

let colors;
let lengthColors;

let x;
let y;

const ballRadius = 20;
let isPlaying = false;
let isPaused = false;
let currentBall;
let deletedBalls = 0;
const neighborsBalls = [];

let dx;
let dy;

let circkleRowCount;
const circkleColumnCount = 14;

const circkles = [];

let startColor;
let nextStartColor;
let startPositionForNewRow;
let startPositionForZeroRow;
let flagNewRow;
let flagZeroRow;
let score;
let speedForAddingRow;
let koefForScore;

const canvasImage = document.querySelector('.canvas__image');
const btnStartPlay = document.querySelector('.start__play');
const start = document.querySelector('.start');
const header = document.querySelector('.header');
const scoreText = document.querySelector('.score__value');

function newGame() {
    changeScoreToZero();
    circkles.length = 0;
    clearTimeout(timeForAddRow);
    timeForAddingZeroRow = false;
    flagNewRow = 2;
    flagZeroRow = 2;
}

function getDifficulty() {
    if (difficulty == 1) {
        colors = ['yellow', 'red', 'orange', 'blue', 'green'];
        circkleRowCount = 3;
        koefForScore = 1;
    }
    if (difficulty == 2) {
        colors = ['yellow', 'red', 'orange', 'blue', 'green', 'blueviolet'];
        circkleRowCount = 3;
        speedForAddingRow = 20000;
        koefForScore = 1.5;
    }
    if (difficulty == 3) {
        colors = ['yellow', 'red', 'orange', 'blue', 'green', 'blueviolet'];
        circkleRowCount = 5;
        speedForAddingRow = 15000;
        koefForScore = 2;
    }
    lengthColors = colors.length;
    startColor = randomColor();
    nextStartColor = randomColor();
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
            circkles[row + 1][j] = {x: ball.x, y: ball.y + 2 * ballRadius + 1, color: ball.color, status: ball.status, match: ball.match, isCheked: ball.isCheked, basis: ball.basis, odd: ball.odd};
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
            circkles[i][j] = {x: startPosition + 2 * (ballRadius + 1) * j, y: ballRadius + 5 + 2 * (ballRadius + 0.5) * i, color: randomColor(), status: 1, match: 0, isCheked: 0, basis: 1, odd: odd}
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
                    //addCircleToStartCircles();
                    addCircleToStartCircles(ball, i, j);
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
            addCirckleToFirstRow(ball, j);
            //addCircleToStartCircles(ball, 0, j);
            return;
        }
    }
}

function calculateLength(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const length = +(Math.sqrt( Math.pow(deltaX, 2) + Math.pow(deltaY, 2))).toFixed(5);
    return length;
}

function isCollision(x1, y1, x2, y2) {
    const length = calculateLength(x1, y1, x2, y2);
    if (length < 1.75 * ballRadius) {
        return true;
    }
    return false;
}

// function isPositionToCircle(x1, y1, x2, y2) {
//     const length = calculateLength(x1, y1, x2, y2);
//     if (length < 2 * ballRadius) {
//         return true;
//     }
//     return false;
// }

function changeCircleForVisible(ball) {
    ball.status = 1;
    ball.color = startColor;
    ball.match = 1;
    currentBall = ball;
}

function checkLeftBallForCollision(circkle, i, j) {
    const leftBall = getLeftBall(i, j);
    if (leftBall) {
        if (leftBall.status == 0) {
            neighborsBalls.push({ball: leftBall, length: calculateLength(x, y, leftBall.x, leftBall.y), i: i, j: j - 1});
        }
    }
}

function checkTopLeftBallForCollision(circkle, i, j) {
    const topBall = getTopLeftBall(i, j, circkle.odd);
    if (topBall[0]) {
        if (topBall[0].status == 0) {
            neighborsBalls.push({ball: topBall[0], length: calculateLength(x, y, topBall[0].x, topBall[0].y), i: topBall[1], j: topBall[2]});
        }
    }
}

function checkTopRightBallForCollision(circkle, i, j) {
    const topBall = getTopRightBall(i, j, circkle.odd);
    if (topBall[0]) {
        if (topBall[0].status == 0) {
            neighborsBalls.push({ball: topBall[0], length: calculateLength(x, y, topBall[0].x, topBall[0].y), i: topBall[1], j: topBall[2]});
        }
    }
}

function checkRightBallForCollision(circkle, i, j) {
    const rightBall = getRightBall(i, j);
    if (rightBall) {
        if (rightBall.status == 0) {
            neighborsBalls.push({ball: rightBall, length: calculateLength(x, y, rightBall.x, rightBall.y), i: i, j: j + 1});
        }
    }
}

function checkBottomRightBallForCollision(circkle, i, j) {
    const bottom = getBottomRightBall(i, j, circkle.odd);
    if (bottom[0]) {
        if (bottom[0].status == 0) {
            neighborsBalls.push({ball: bottom[0], length: calculateLength(x, y, bottom[0].x, bottom[0].y), i: bottom[1], j: bottom[2]});
        }
    }
}

function checkBottomLeftBallForCollision(circkle, i, j) {
    const bottom = getBottomLeftBall(i, j, circkle.odd);
    if (bottom[0]) {
        if (bottom[0].status == 0) {
            neighborsBalls.push({ball: bottom[0], length: calculateLength(x, y, bottom[0].x, bottom[0].y), i: bottom[1], j: bottom[2]});
        }
    }
}

function sortArray(arr) {
    arr.sort((a, b) => a.length - b.length);
}

function isMinimumLength(arr) {
    const minLength = arr[0].length;
    if (minLength < 1.75 * ballRadius) {
        return true;
    }
    return false;
}

function checkNeighborsForCollision(ball, i, j) {
    neighborsBalls.length = 0;
    checkLeftBallForCollision(ball, i, j);
    checkTopLeftBallForCollision(ball, i, j);
    checkTopRightBallForCollision(ball, i, j);
    checkRightBallForCollision(ball, i, j);
    checkBottomRightBallForCollision(ball, i, j);
    checkBottomLeftBallForCollision(ball, i, j);
    if (neighborsBalls.length == 0) {
        return false;
    }
    sortArray(neighborsBalls);
    if (isMinimumLength(neighborsBalls)) {
        changeCircleForVisible(neighborsBalls[0].ball);
        return true;
    }
    return false;
}

function findPositionToCollisionCircle(ball, i, j) {
    if (checkNeighborsForCollision(ball, i, j)) {
        clear();
        drowStartCircles();
        findColorMatches(neighborsBalls[0].i, neighborsBalls[0].j);
        return;
    }
    // for (let i = 0; i < circkleRowCount; i++) {
    //     for (let j = 0; j < circkleColumnCount; j++) {
    //         const ball = circkles[i][j];
    //         if (ball.status == 0) {
    //             if (isPositionToCircle(x, y, ball.x, ball.y)) {
    //                 changeCircleForVisible(ball);
    //                 clear();
    //                 drowStartCircles();
    //                 //findColorMatches(currentBall, i, j);
    //                 findColorMatches(i, j);
    //                 return;
    //             }
    //         }
    //     }
    // }
    addRowToStartCircles();
    addCircleToNewRow();
}

function addCirckleToFirstRow(ball, j) {
    clearInterval(timeForMovement);
    changeCircleForVisible(ball);
    clear();
    drowStartCircles();
    findColorMatches(0, j);
    if (!checkLossGame()) {
        nextCircle();
    }
    isPlaying = false;
}

function addCircleToStartCircles(ball, i, j) {
    clearInterval(timeForMovement);
    //findPositionToCollisionCircle();
    findPositionToCollisionCircle(ball, i, j);
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
        circkles[j][i] = {x: startPositionForNewRow + 2 * (ballRadius + 1) * i, y: ballRadius + 5 + 2 * (ballRadius + 0.5) * j, color: 0, status: 0, match: 0, isCheked: 0, basis: 1, odd: odd}
    }
    setStartPositionForNewRow();
}

function addCircleToNewRow() {
    const j = circkleRowCount - 1;
    for (let i = 0; i < circkleColumnCount; i++) {
        const ball = circkles[j][i];
        //if (isPositionToCircle(x, y, ball.x, ball.y)) {
        if (isCollision(x, y, ball.x, ball.y)) {
            changeCircleForVisible(ball);
            clear();
            drowStartCircles();
            //findColorMatches(currentBall);
            findColorMatches(j, i);
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

function drawNextMainCircle(color) {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height - ballRadius, ballRadius, 0, 2 * Math.PI);
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
    if (!isPaused) {
        clear();
        if (timeForAddingZeroRow) {
            addZeroRowToStartCircles();
        }
        drowStartCircles();
        drawMainCircle(startColor);
        drawNextMainCircle(nextStartColor);
        //drawMainImage();
        checkCollision();
        changePosition();
    }
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
        playSoundShoot();
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
    deletedBalls = 0;
    x = canvas.width / 2;
    y = canvas.height - 3 * ballRadius - 2;
    //startColor = randomColor();
    startColor = nextStartColor;
    nextStartColor = randomColor();
}

function startPlay() {
    clear();
    newGame();
    getDifficulty();
    InitiateCircles();
    drowStartCircles();
    startPosition();
    drawMainCircle(startColor);
    drawNextMainCircle(nextStartColor);
    setStartPositionForNewRow();
    setStartPositionForZeroRow();
    //drawMainImage();
    if (difficulty != 1) {
        timeForAddRow = setInterval(setFlagForAddingZeroRow, speedForAddingRow);
    }
}

function nextCircle() {
    startPosition();
    drawMainCircle(startColor);
    drawNextMainCircle(nextStartColor);
}

function checkColorBall(ball, i, j) {
    if (ball.color == currentBall.color) {
        ball.match = 1;
        checkNeighbors(i, j);
    }
}

function getRightBall(i, j) {
    if (j == circkleColumnCount - 1) {
        return 0;
    }
    return circkles[i][j + 1];
}

function checkColorRightBall(i, j) {
    const rightBall = getRightBall(i, j);
    if (rightBall == 0) {
        return;
    }
    if (rightBall.status == 0 || rightBall.isCheked == 1) {
        return;
    }
    rightBall.isCheked = 1;
    checkColorBall(rightBall, i, j + 1);
}

function getLeftBall(i, j) {
    if (j == 0) {
        return 0;
    }
    return circkles[i][j - 1];
}

function checkColorLeftBall(i, j) {
    const leftBall = getLeftBall(i, j);
    if (leftBall == 0) {
        return;
    }
    if (leftBall.status == 0 || leftBall.isCheked == 1) {
        return;
    }
    leftBall.isCheked = 1;
    checkColorBall(leftBall, i, j - 1);
}

function getBottomRightBall(i, j, odd) {
    if (i == circkleRowCount - 1) {
        return 0;
    }
    let bottomBall = circkles[i + 1][j];
    let column = j;
    if (odd != 0) {
        if (j == circkleColumnCount - 1) {
            return 0;
        }
        bottomBall = circkles[i + 1][j + 1];
        column = j + 1;
    }
    return [bottomBall, i + 1, column];
}

function checkColorBottomRightBall(i, j, odd) {
    const result = getBottomRightBall(i, j, odd);
    if (result == 0) {
        return;
    }
    const bottomBall = result[0];
    if (bottomBall.status == 0 || bottomBall.isCheked == 1) {
        return;
    }
    bottomBall.isCheked = 1;
    checkColorBall(bottomBall, result[1], result[2]);
}

function getBottomLeftBall(i, j, odd) {
    if (i == circkleRowCount - 1) {
        return 0;
    }
    let bottomBall = circkles[i + 1][j];
    let column = j;
    if (odd == 0) {
        if (j == 0) {
            return 0;
        }
        bottomBall = circkles[i + 1][j - 1];
        column = j - 1;
    }
    return [bottomBall, i + 1, column];
}

function checkColorBottomLeftBall(i, j, odd) {
    const result = getBottomLeftBall(i, j, odd);
    if (result == 0) {
        return;
    }
    const bottomBall = result[0];
    if (bottomBall.status == 0 || bottomBall.isCheked == 1) {
        return;
    }
    bottomBall.isCheked = 1;
    checkColorBall(bottomBall, result[1], result[2]);
}

function getTopLeftBall(i, j, odd) {
    if (i == 0) {
        return 0;
    }
    let topBall = circkles[i - 1][j];
    let column = j;
    if (odd == 0) {
        if (j == 0) {
            return 0;
        }
        topBall = circkles[i - 1][j - 1];
        column = j - 1;
    }
    return [topBall, i - 1, column];
}

function checkColorTopLeftBall(i, j, odd) {
    const result = getTopLeftBall(i, j, odd);
    if (result == 0) {
        return;
    }
    const topBall = result[0];
    if (topBall.status == 0 || topBall.isCheked == 1) {
        return;
    }
    topBall.isCheked = 1;
    checkColorBall(topBall, result[1], result[2]);
}

function getTopRightBall(i, j, odd) {
    if (i == 0) {
        return 0;
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
    return [topBall, i - 1, column];
}

function checkColorTopRightBall(i, j, odd) {
    const result = getTopRightBall(i, j, odd);
    if (result == 0) {
        return;
    }
    const topBall = result[0];
    if (topBall.status == 0 || topBall.isCheked == 1) {
        return;
    }
    topBall.isCheked = 1;
    checkColorBall(topBall, result[1], result[2]);
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

function findColorMatches(i, j) {
    checkNeighbors(i, j);
    checkAllMatches();
    // for (let i = 0; i < circkleRowCount; i++) {
    //     const currentPosition = circkles[i].findIndex((element => element == ball));
    //     if (currentPosition != -1) {
    //         checkNeighbors(i, currentPosition);
    //         checkAllMatches();
    //         return;
    //     }
    // }
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
        deletedBalls = circlesMatches.flat().length;
        //playSoundMatch(getSoundMatch(circlesMatches.flat().length));
        deleteMatches(true);
        // clear();
        // drowStartCircles();
        checkHendingCircles();
        clear();
        drowStartCircles();
        changeScore();
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
                    score += 10 * koefForScore;
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
    const result = getBottomLeftBall(i, j, odd);
    if (result == 0) {
        return;
    }
    const bottomBall = result[0];
    if (bottomBall.isCheked) {
        return;
    }
    if (bottomBall.status == 0) {
        bottomBall.isCheked = 1;
        return;
    }
    bottomBall.isCheked = 1;
    bottomBall.basis = 1;
    setBasisNeighbors(result[1], result[2], bottomBall);
}

function setBasisBottomRightBall(i, j, odd) {
    const result = getBottomRightBall(i, j, odd);
    if (result == 0) {
        return;
    }
    const bottomBall = result[0];
    if (bottomBall.isCheked) {
        return;
    }
    if (bottomBall.status == 0) {
        bottomBall.isCheked = 1;
        return;
    }
    bottomBall.isCheked = 1;
    bottomBall.basis = 1;
    setBasisNeighbors(result[1], result[2], bottomBall);
}

function setBasisTopLeftBall(i, j, odd) {
    const result = getTopLeftBall(i, j, odd);
    if (result == 0) {
        return;
    }
    const topBall = result[0];
    if (topBall.status == 0) {
        topBall.isCheked = 1;
        return;
    }
    topBall.isCheked = 1;
    topBall.basis = 1;
    setBasisNeighbors(result[1], result[2], topBall);
}

function setBasisTopRightBall(i, j, odd) {
    const result = getTopRightBall(i, j, odd);
    if (result == 0) {
        return;
    }
    const topBall = result[0];
    if (topBall.isCheked) {
        return;
    }
    if (topBall.status == 0) {
        topBall.isCheked = 1;
        return;
    }
    topBall.isCheked = 1;
    topBall.basis = 1;
    setBasisNeighbors(result[1], result[2], topBall);
}

function setBasisRightBall(i, j) {
    const rightBall = getRightBall(i, j);
    if (rightBall == 0) {
        return;
    }
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
    const leftBall = getLeftBall(i, j);
    if (leftBall == 0) {
        return;
    }
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
    playSoundMatch(getSoundMatch(deletedBalls));
}

function deleteCirclesWithoutBasis() {
    for (let i = 0; i < circkleRowCount; i++) {
        for (let j = 0; j < circkleColumnCount; j++) {
            const ball = circkles[i][j];
            ball.isCheked = 0;
            if (ball.basis == 0 && ball.status != 0) {
                //ball.color = 'black';
                ball.status = 0;
                ball.color = 0;
                score += 10 * koefForScore;
                deletedBalls += 1;
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
            if (ball.y + ballRadius + 2 >= canvas.height - 4 * ballRadius - 2) {
                playSoundLose();
                showLostField();
                checkScoring();
                return true;
            }
        }
    }
    return false;
}

function changeStartFieldToEnd(word1, word2) {
    const startTitle = document.querySelector('.start__title-one');
    startTitle.textContent = word1;
    startTitle.nextElementSibling.textContent = word2;
    const startText = document.querySelector('.start__text');
    startText.textContent = 'Press PLAY for start new game';
}

function showLostField() {
    prepareToShowField();
    changeStartFieldToEnd('Game', 'over');
    start.classList.add('lost');
}

function prepareToShowField() {
    canvas.classList.remove('canvas-show');
    start.classList.remove('start-hide');
    header.classList.add('end');
}

function showWinField() {
    prepareToShowField();
    changeStartFieldToEnd('You', 'win');
    start.classList.add('win');
}

function checkWinGame() {
    if (circkleRowCount == 0) {
        isPlaying = false;
        showWinField();
        playSoundWin();
        checkScoring();
        return true;
    }
    return false;
}

canvas.addEventListener('click', startMovement);

btnStartPlay.addEventListener('click', changeStartField);

start.addEventListener('animationend', checkAnimation);

function changeStartField() {
    loadSounds();
    playSoundStart();
    start.classList.add('start-fadeout');
}

function showStartField() {
    start.classList.add('start-hide');
    start.classList.remove('start-fadeout');
    canvas.classList.add('canvas-show');
    header.classList.remove('end');
    start.classList.remove('win');
    start.classList.remove('lost');
    header.classList.add('header-show');
    startPlay();
}

function checkAnimation(event) {
    if (event.animationName === "fade-out") {
        showStartField();
    }
}

function changeScore() {
    scoreText.textContent = score.toString(10);
}

function changeScoreToZero() {
    score = 0;
    changeScore();
}

function getScoringFromLs() {
    return JSON.parse(localStorage.getItem('LH_leaders'));
}

function saveScoreToLs(arr) {
    localStorage.setItem('LH_leaders', JSON.stringify(arr));
}

function sortBestResults(arr) {
    arr.sort((a, b) => b - a);
}

function removeLastBestResult(arr) {
    arr.pop();
}

function addNewBestResult(arr, score) {
    arr.push(score);
    const newSet = new Set(arr);
    return Array.from(newSet);
}

function getLastBestResult(arr) {
    return arr.at(-1);
}

function checkScoring() {
    let bestResults = getScoringFromLs();
    if (bestResults) {
        if (score > getLastBestResult(bestResults)) {
            bestResults = addNewBestResult(bestResults, score);
            sortBestResults(bestResults);
            if (bestResults.length > 10) {
                removeLastBestResult(bestResults);
            }
            saveScoreToLs(bestResults);
            return;
        }
        if (bestResults.length < 10) {
            bestResults = addNewBestResult(bestResults, score);
            sortBestResults(bestResults);
            saveScoreToLs(bestResults);
            return;
        }
        return;
    }
    saveScoreToLs([score]);
}

const message = 'Самооценка - 70: \n1.Вёрстка - 10;\n1.1 реализован интерфейс игры - 5;\n1.2 в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс - 5;\n2. Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам - 10;\n3. Реализовано завершение игры при достижении игровой цели - 10;\n4. По окончанию игры выводится её результат - 10\n5. Есть таблица результатов, в которой сохраняются результаты 10 игр с наибольшим счетом - 10;\n6. Звуки и настройки игры - 10;\n7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения - 10';

console.log(message);

