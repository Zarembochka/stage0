const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");

const colors = ['yellow', 'red', 'orange', 'pink', 'blue', 'green', 'purple'];
// const colors = ['yellow', 'red', 'orange'];
const lengthColors = colors.length;

let timeForMovement;

let x;
let y;

const ballRadius = 10;

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
            circkles[i][j] = {x: startPosition + 2 * (ballRadius + 1) * j, y: 11 + 2 * (ballRadius + 0.5) * i, color: randomColor(), status: 1}
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
                }
            }
        }
    }
}

function isCollision(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const length = Math.sqrt( Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    if (length <= 2.5 * ballRadius) {
        return true;
    }
    return false;
}

function isPositionToCircle(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const length = Math.sqrt( Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
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
    nextCircle();
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
        circkles[j][i] = {x: startPosition + 2 * (ballRadius + 1) * i, y: 11 + 2 * (ballRadius + 0.5) * j, color: 0, status: 0}
    }
}

function addCircleToNewRow() {
    const j = circkleRowCount - 1;
    for (let i = 0; i < circkleColumnCount; i++) {
        const ball = circkles[j][i];
        if (isPositionToCircle(x, y, ball.x, ball.y)) {
            ball.status = 1;
            ball.color = startColor;
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
    dx = - (canvas.width / 2 - x) / 100;
    dy = - (canvas.height - 10 - y) / 100;
}

function startMovement(event) {
    calculateVector(event.offsetX, event.offsetY);
    timeForMovement = setInterval(draw, 10);
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

canvas.addEventListener('click', startMovement);

startPlay();
