
/**
 * canvas
 * context
 */
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// assets - background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "asset/bg.png";

// assets - paddle
var paddleReady = false;
var paddleImage = new Image();
paddleImage.onload = function () {
  paddleReady = true;
};
paddleImage.src = "asset/blicka.png";

// assets - ball
var ballReady = false;
var ballImage = new Image();
ballImage.onload = function () {
  ballReady = true;
};
ballImage.src = "asset/ball.png";

// game objects
var mouse = {
  x: 0,
  y: 0,
  speedX: 0,
  prevX: 0
};
var paddle = {
  width: 150,
  height: 25,
  x: 0,
  y: 0
};

var block = {
  width: 150,
  height: 150,
  x: 0,
  y: 0
};
var ball = {
  direction: 120,
  speed: 250,
  x: 50,
  y: 50,
  velocityX: 5,
  velocityY: 5,
  velocityMax: 7,
  velocityDefault: 5,
  width: 25,
  height: 25,
  radius: 5,
  spin: 0,
  getTop: function() {
    return this.y;
  },
  getRight: function() {
    return this.x + this.width;
  },
  getBottom: function() {
    return this.y + this.height;
  },
  getLeft: function() {
    return this.x;
  },
  hit: function(x, y) {
    return x >= this.getLeft() && x <= this.getRight() && y >= this.getTop() && y <= this.getBottom();
  }
};

// handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

canvas.addEventListener('mousemove', function(e) {
  var rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
}, false);


// update game objects
var update = function (modifier) {

  // ball moves its velocity
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // ball velocity limit
  if (ball.velocityX > 0 && ball.velocityX >= ball.velocityMax) {
    ball.velocityX = ball.velocityMax;
  } else if ((ball.velocityX + ball.velocityX) >= ball.velocityMax) {
    ball.velocityX = -ball.velocityMax;
  };

  // if ball strikes the vertical walls, invert the 
  // x-velocity vector of ball
  if (ball.x + ball.width >= canvas.width) {
    ball.velocityX = -ball.velocityX;
  } else if (ball.x -ball.radius <= 0) {
    ball.velocityX = -ball.velocityX;
  };

  // if ball strikes the horizontal walls, invert the 
  // x-velocity vector of ball
  if (ball.y + ball.width >= canvas.height) {
    ball.velocityY = -ball.velocityY;
  } else if (ball.y <= 0) {
    ball.velocityY = -ball.velocityY;
  };

  // ball leaves canvas
  if (ball.y < 0) {
    ball.y = 0;
  } else if (ball.x < 0) {
    ball.x = 0;
  } else if (ball.x > canvas.width) {
    ball.x = canvas.width - ball.width;
  } else if (ball.y > canvas.height) {
    ball.y = canvas.height - ball.height;
  };

  // collision ball with paddle
  // top
  if (ball.hit(paddle.x, paddle.y)
    (ball.y + ball.height) >= paddle.y
    && ball.y <= (paddle.y + paddle.height)
    && ball.x >= paddle.x
    && ball.x <= (paddle.x + paddle.width)
    ) {

    // ball go up
    ball.velocityY = -ball.velocityY;

    // ball always above paddle
    ball.y -= paddle.height;

    // load ball with spin
    ball.spin = mouse.speedX;
  };

  // mouse movement
  if (mouse.x && mouse.y) {
    paddle.x = mouse.x;
    paddle.y = mouse.y;
  };

  // mouse speed
  mouse.speedX = mouse.prevX - mouse.x;
  mouse.prevX = mouse.x;

  // block
  block.x = 20;
  block.y = 20;
};

// draw everything
var render = function () {

  // clear first
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // bg
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // paddle
  ctx.fillStyle = '#000';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  // ball
  ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

  // block
  ctx.fillRect(block.x, block.y, block.width, block.height);
};

// the main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
};

var doesBallHitBounds = function() {
  return (ball.x + ball.width >= canvas.width)
    || (ball.x -ball.radius <= 0)
    || (ball.y + ball.width >= canvas.height)
    || (ball.y <= 0);
};

// let's play this game!
var then = Date.now();
main();
