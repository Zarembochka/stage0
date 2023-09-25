const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");

const colors = ['yellow', 'red', 'orange', 'pink', 'blue', 'green', 'purple'];
// const colors = ['yellow', 'red', 'orange'];
const lengthColors = colors.length;

let timeForMovement;

let x;
let y;

const ballRadius = 10;
let isPlaying = false;
let currentBall;

let dx;
let dy;

let circkleRowCount = 7;
const circkleColumnCount = 14;

const circkles = [];
let startColor = randomColor();

function InitiateCircles() {
    for (let i = 0; i < circkleRowCount; i++) {
        circkles[i] = [];
        let startPosition = 1 + ballRadius;
            if (i % 2 != 0) {
                startPosition = 1 + ballRadius * 2;
            }
        for (let j = 0; j < circkleColumnCount; j++) {
            circkles[i][j] = {x: startPosition + 2 * (ballRadius + 1) * j, y: 11 + 2 * (ballRadius + 0.5) * i, color: randomColor(), status: 1, match: 0}
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
}

function calculateLength(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const length = Math.sqrt( Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return length;
}

function isCollision(x1, y1, x2, y2) {
    const length = calculateLength(x1, y1, x2, y2);
    if (length <= 2.5 * ballRadius) {
        return true;
    }
    return false;
}

function isPositionToCircle(x1, y1, x2, y2) {
    const length = calculateLength(x1, y1, x2, y2);
    if (length <= ballRadius + 2) {
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
    let startPosition = 1 + ballRadius;
    if (circkleRowCount % 2 == 0) {
        startPosition = 1 + ballRadius * 2;
    }
    const j = circkleRowCount - 1;
    for (let i = 0; i < circkleColumnCount; i++) {
        circkles[j][i] = {x: startPosition + 2 * (ballRadius + 1) * i, y: 11 + 2 * (ballRadius + 0.5) * j, color: 0, status: 0, match: 0}
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
        ctx.drawImage(img, x - ballRadius, y - ballRadius);
    }
}

function draw() {
    clear();
    drowStartCircles();
    drawMainCircle(startColor);
    // drawMainImage();
    checkCollision();
    changePosition();
}

function createImage() {
    const img = new Image();
    img.src = './images/blue.svg';
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

function startPosition() {
    x = canvas.width / 2;
    y = canvas.height - 10;
    startColor = randomColor();
}

function startPlay() {
    InitiateCircles();
    drowStartCircles();
    startPosition();
    drawMainCircle(startColor);
    // drawMainImage();
}

function nextCircle() {
    startPosition();
    drawMainCircle(startColor);
}

function checkRightBall(i, j) {
    if (j == circkleColumnCount - 1) {
        return;
    }
    const rightBall = circkles[i][j + 1];
    if (rightBall.match == 1 || rightBall.status == 0) {
        return;
    }
    if (rightBall.color == currentBall.color) {
        rightBall.match = 1;
        checkNeighbors(i, j + 1);
    }
}

function checkLeftBall(i, j) {
    if (j == 0) {
        return;
    }
    const leftBall = circkles[i][j - 1];
    if (leftBall.match == 1 || leftBall.status == 0) {
        return;
    }
    if (leftBall.color == currentBall.color) {
        leftBall.match = 1;
        checkNeighbors(i, j - 1);
    }
}

function checkBottomRightBall(i, j) {
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
    if (bottomBall.match == 1 || bottomBall.status == 0) {
        return;
    }
    if (bottomBall.color == currentBall.color) {
        bottomBall.match = 1;
        checkNeighbors(i + 1, column);
    }
}

function checkBottomLeftBall(i, j) {
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
    if (bottomBall.match == 1 || bottomBall.status == 0) {
        return;
    }
    if (bottomBall.color == currentBall.color) {
        bottomBall.match = 1;
        checkNeighbors(i + 1, column);
    }
}

function checkTopLeftBall(i, j) {
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
    if (topBall.match == 1 || topBall.status == 0) {
        return;
    }
    if (topBall.color == currentBall.color) {
        topBall.match = 1;
        checkNeighbors(i - 1, column);
    }
}

function checkTopRightBall(i, j) {
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
    if (topBall.match == 1 || topBall.status == 0) {
        return;
    }
    if (topBall.color == currentBall.color) {
        topBall.match = 1;
        checkNeighbors(i - 1, column);
    }
}

function checkNeighbors(i, j) {
    checkRightBall(i, j);
    checkBottomRightBall(i, j);
    checkBottomLeftBall(i, j);
    checkLeftBall(i, j);
    checkTopLeftBall(i, j);
    checkTopRightBall(i, j);
}

function findColorMatches(ball) {
    for (let i = 0; i < circkleRowCount; i++) {
        const currentPosition = circkles[i].findIndex((element => element == ball));
        if (currentPosition != -1) {
            checkNeighbors(i, currentPosition);
            checkAllMatches();
            deleteEmptyRows();
            checkHendingCircles();
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
        return;
    }
    deleteMatches(false);
}

function deleteMatches(flag) {
    for (let i = 0; i < circkleRowCount; i++) {
        for (let j = 0; j < circkleColumnCount; j++) {
            const ball = circkles[i][j];
            if (ball.match == 1) {
                // ball.color = 0;
                ball.status = +(!flag);
                ball.match = 0;
            }
        }
    }
}

function deleteEmptyRows() {
    let doIt = true;
    while (doIt) {
        const circlesRow = circkles.at(-1);
        if (circlesRow.every((element) => element.status == 0)) {
            circkles.pop();
            circkleRowCount -= 1;
        } else {
            doIt = false;
        }
    }
}

function checkHendingCircles() {
    // for (let i = 0; i < circkleRowCount; i++) {
    //     for (let j = 0; j < circkleColumnCount; j++) {
    //         const ball = circkles[i][circkleColumnCount - 1 - j];

    //     }
    // }
}

function checkLossGame() {
    const lastRow = circkles.at(-1);
    for (let i = 0; i < circkleColumnCount; i++) {
        const ball = lastRow[i];
        if (ball.status == 1) {
            if (ball.y + ballRadius + 2 >= canvas.height - 2 * ballRadius) {
               alert('Looser!');
               return true;
            }
        }
    }
    return false;
}

canvas.addEventListener('click', startMovement);

startPlay();
