'use strict';
const canvas = document.getElementById('myCanvas');
canvas.style.display = 'none';
const ctx = canvas.getContext('2d');
const ballRadius = 50;
let x = canvas.width / 4;
let y = canvas.height - 195;
let dx = Math.floor(Math.random() * 3) + 2;
let dy = (Math.floor(Math.random() * 3) + 2);
const paddleHeight = 75;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = paddleHeight;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let number = Math.floor(Math.random() * 9) + 1;
let color1 = Math.floor(Math.random() * 256);
let color2 = Math.floor(Math.random() * 256);
let color3 = Math.floor(Math.random() * 256);
let color4 = Math.floor(Math.random() * 256);
let color5 = Math.floor(Math.random() * 256);
let color6 = Math.floor(Math.random() * 256);
let color7 = Math.floor(Math.random() * 256);
let color8 = Math.floor(Math.random() * 256);
let color9 = Math.floor(Math.random() * 256);

let which = Math.floor(Math.random()*2 );
console.log(which);

let score = 0;
let lives = 3;

let button = document.getElementById('butt');
button.style.color = `rgb(${255 - color1}, ${255 - color2}, ${255 - color3}`;
button.style.backgroundColor = `rgba(${color1}, ${color2}, ${color3}, .7)`;
if (which === 1) {
  button.innerText = "KERÄÄ VAIN PARITTOMIA NUMEROITA!";
} else {
  button.innerText = "KERÄÄ VAIN PARILLISIA NUMEROITA!";
}

/*
const audio1 = new Audio("Au.m4a");
const audio2 = new Audio("Kops.m4a");
const audio3 = new Audio("Jippii.m4a");
 */

//alert('Kerää parittomia ja vältä parillisia!');

const reset = () => {
  number = Math.floor(Math.random() * 9) + 1;
  color1 = Math.floor(Math.random() * 256);
  color2 = Math.floor(Math.random() * 256);
  color3 = Math.floor(Math.random() * 256);
  color4 = Math.floor(Math.random() * 256);
  color5 = Math.floor(Math.random() * 256);
  color6 = Math.floor(Math.random() * 256);
  color7 = Math.floor(Math.random() * 256);
  color8 = Math.floor(Math.random() * 256);
  color9 = Math.floor(Math.random() * 256);
  x = canvas.width / 4;
  y = canvas.height - 195;
  dx = Math.floor(Math.random() * 3) + 2;
  dy = (Math.floor(Math.random() * 3) + 2);
  //paddleX = (canvas.width - paddleWidth) / 2;
  //paddleY = paddleHeight;
};

//oldfashioned?
const keyDownHandler = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  } else if (e.key === 'Down' || e.key === 'ArrowDown') {
    downPressed = true;
  } else if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPressed = true;
  }
};
//oldfashioned?
const keyUpHandler = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  } else if (e.key === 'Down' || e.key === 'ArrowDown') {
    downPressed = false;
  } else if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPressed = false;
  }
};
/*
const mouseMoveHandler = (e)  => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
  const relativeY = e.clientY - canvas.offsetTop;
  if(relativeY > 0 && relativeY < canvas.height) {
    paddleY = relativeY - paddleWidth/2;
  }
}
 */

const hittingTheBall = () => {
  //if ((x > paddleX && x < paddleX + paddleWidth) && (y > paddleY && y < paddleY + paddleHeight))
  if ((x > (paddleX - ballRadius/(3/2)) && x < paddleX + paddleWidth + ballRadius/(3/2)) &&
      (y > (paddleY - ballRadius/(3/2)) && y < paddleY + paddleHeight + ballRadius/(3/2))) {
    if ((number % 2 !== 0 && which === 1) || (number % 2 === 0 && which === 0)) {
      score++;
      reset();
    } else {
      lives--;
      if (!lives) {
        if (score === 1) {
          alert(score + ' piste. Hyvä hyvä!');
        } else {
          alert(score + ' pistettä. Hyvä hyvä!');
        }
        //number = Math.floor(Math.random() * 9) + 1;
        document.location.reload();
      } else {
        reset();
      }
    }
  }
};

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = `rgb(${color1}, ${color2}, ${color3}`;
  ctx.fill();
  ctx.closePath();
};

const drawSmallerBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius - 13, 0, Math.PI * 2);
  ctx.fillStyle = `rgb(${color4}, ${color5}, ${color6}`;
  ctx.fill();
  ctx.closePath();
};

const drawNumber = (number) => {
  ctx.font = '50px Monaco';
  ctx.fillStyle = `rgb(${color7}, ${color8}, ${color9}`;
  ctx.fillText(number, x - ballRadius / 3, y + ballRadius / 3);
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = `rgb(${color3}, ${color7}, ${color1}`;
  ctx.strokeStyle = `rgb(${color7}, ${color8}, ${color9}`;
  ctx.lineWidth = 7;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

const drawSymbol = () => {
  ctx.font = '50px Monaco';
  ctx.fillStyle = `rgb(${color7}, ${color8}, ${color9}`;
  ctx.fillText("?", paddleX + paddleWidth/(6/2), paddleY + paddleHeight/(4/3));
};

const drawScore = () => {
  ctx.font = '15px Monaco';
  ctx.fillStyle = 'grey';
  ctx.fillText('Pisteet: ', 5, canvas.height - 10);
  ctx.fillStyle = 'dim grey';
  ctx.fillText(score, 85, canvas.height - 10);
};

const drawLives = () => {
  ctx.font = '15px Monaco';
  ctx.fillStyle = 'grey';
  ctx.fillText('Elämät: ', canvas.width - 85, canvas.height - 10);
  ctx.fillStyle = 'dim grey';
  ctx.fillText(lives, canvas.width - 15, canvas.height - 10);
};

const draw = () => {
  canvas.style.display = 'block';
  button.style.display = 'none';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawSmallerBall();
  drawNumber(number);
  drawPaddle();
  drawSymbol()
  drawScore();
  drawLives();
  hittingTheBall();

  //hitting the x walls
  if (x > canvas.width - ballRadius || x < ballRadius) {
    dx = -dx;
  }

  //hitting the y walls
  if (y + ballRadius > canvas.height) {
    dy = -dy;
  } else if (y < 0 - ballRadius) {
    if ((number % 2 !== 0 && which === 1) || (number % 2 === 0 && which === 0)) {
      lives--;
      if (!lives) {
        if (score === 1) {
          alert(score + ' piste. Hyvä alku!');
        } else {
          alert(score + ' pistettä. Hyvä hyvä!');
        }
        number = Math.floor(Math.random() * 9) + 1;
        document.location.reload();
      } else {
        reset();
      }
    } else {
      score++;
      reset();
    }
  }

  //moving the paddle
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  } else if (upPressed && paddleY > 0) {
    paddleY -= 7;
  } else if (downPressed && paddleY < canvas.height - paddleHeight) {
    paddleY += 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
button.addEventListener('click', draw);
//document.addEventListener("mousemove", mouseMoveHandler, false);

//draw();
