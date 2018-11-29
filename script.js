const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');


//  creating the unit
const box = 32;

//  loading images
const ground = new Image();
ground.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

//  loading audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const left = new Audio();
const right = new Audio();

dead.src = 'audio/dead.mp3';
eat.src = 'audio/eat.mp3';
up.src = 'audio/up.mp3';
down.src = 'audio/down.mp3';
left.src = 'audio/left.mp3';
right.src = 'audio/right.mp3';

//  creating the snake - snake is an array
let snake = [];

//  snake's head - starting position
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

//  creating the food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

//  creating the score variable
let score = 0;

//  controls for the snake

let d;

document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode === 37 && d !== 'RIGHT') {
        d = 'LEFT';
        left.play();
    }
    else if (event.keyCode === 38 && d !== 'DOWN') {
        d = 'UP';
        up.play();
    }
    else if (event.keyCode === 39 && d !== 'LEFT') {
        d = 'RIGHT';
        right.play();
    }
    else if (event.keyCode === 40 && d !== 'UP') {
        d = 'DOWN';
        down.play();
    }
}

//-------------------------------------------

// function for checking collition
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

//  function for drawing everything on the canvas
function draw() {

    //  drawing the ground
    ctx.drawImage(ground, 0, 0);

    //  looping over the snake to draw all cells
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = ( i == 0 ) ? "lime" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    //  drawing the food
    ctx.drawImage(foodImg, food.x, food.y);

    //  old snake head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //  which direction
    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;

    //  if the snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        }
    }
    else {
        //  removing the tail if doesnot eats the food
        snake.pop();
    }

    //  add new snake head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //  rules for Game Over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box ||
        snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    //  drawing the score and scoreboard
    ctx.fillStyle = 'white';
    ctx.font = '35px Verdana';
    ctx.fillText(score, 2 * box, 1.6 * box);

}

//-----------------------------------

//  calling draw function every 100ms
let game = setInterval(draw, 100);