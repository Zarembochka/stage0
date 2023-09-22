const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");

const colors = ['yellow', 'red', 'orange', 'pink', 'blue', 'green', 'purple'];
const lengthColors = colors.length;

let timeForMovement;

let x = canvas.width / 2;
let y = canvas.height - 10;

const ballRadius = 10;

let dx;
let dy;

const circkleRowCount = 7;
const circkleColumnCount = 30;

const circkles = [];

function InitiateCircles() {
    for (let i = 0; i < circkleColumnCount; i++) {
        circkles[i] = [];
        for (let j = 0; j < circkleRowCount; j++) {
            circkles[i][j] = {x: 10 + 2 * ballRadius * i, y: 11 + 2 * ballRadius * j, color: randomColor(), status: 1}
        }
    }
}

function changePosition() {
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = - dx;
    }
    // if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    //     dy = -dy;
    // }
    x += dx;
    y += dy;
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkCollision() {
    for (let i = 0; i < circkleColumnCount; i++) {
        for (let j = 0; j < circkleRowCount; j++) {
            const ball = circkles[i][j];
            if (ball.status == 1) {
                if (y <= ball.y + 20) {
                    clearInterval(timeForMovement);
                }
            }
        }
    }
}

function drowStartCircles() {
    for (let i = 0; i < circkleColumnCount; i++) {
        for (let j = 0; j < circkleRowCount; j++) {
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

function drawCircle(color) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function draw(color) {
    clear();
    drowStartCircles();
    drawCircle(color);
    checkCollision();
    changePosition();
}

function calculateVector(x, y) {
    dx = - (canvas.width / 2 - x) / 100;
    dy = - (canvas.height - 10 - y) / 100;
}

function startMovement(event) {
    calculateVector(event.offsetX, event.offsetY);
    timeForMovement = setInterval(draw, 10, 'red');
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomColor() {
    const randomInt = getRandomInt(lengthColors);
    return colors[randomInt]
}

canvas.addEventListener('click', startMovement);

InitiateCircles();
drowStartCircles();

drawCircle(randomColor());
