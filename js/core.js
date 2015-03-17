
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

// assets - blicka
var blickaReady = false;
var blickaImage = new Image();
blickaImage.onload = function () {
  blickaReady = true;
};
blickaImage.src = "asset/blicka.png";

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
var blicka = {
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
  spin: 0
}

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

  // residual spin affects the ball velocity
  if (ball.spin > 0) {
    ball.velocityX += 0.5;
    ball.speed = 500;
    ball.spin -= 0.3;
  } else if (ball.spin < 0) {
    ball.velocityX -= 0.5;
    ball.speed = 500;
    ball.spin += 0.3;
  };

  // no spin means normal ball
  if (ball.spin == 0) {
    ball.speed = 250;
  };

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

  // hit wall means no spin
  if (doesBallHitBounds) {
    ball.spin = 0;
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

  // collision ball with blicka
  // top
  if (
    (ball.y + ball.height) >= blicka.y
    && ball.y <= (blicka.y + blicka.height)
    && ball.x >= blicka.x
    && ball.x <= (blicka.x + blicka.width)
    ) {
    ball.velocityY = -ball.velocityY;
    ball.y -= blicka.height;
    ball.spin = mouse.speedX;
    mouse.speedX = 0;
  };

  // collision ball with block
  if (
    (ball.y + ball.height) >= blicka.y
    && ball.y <= (blicka.y + blicka.height)
    && ball.x >= blicka.x
    && ball.x <= (blicka.x + blicka.width)
    ) {
    ball.velocityY = -ball.velocityY;
    ball.y -= blicka.height;
    // ball.spin = mouse.speedX;
    mouse.speedX = 0;
  };

  // keyboard movement
  if (38 in keysDown || 87 in keysDown) { // Player holding up
    blicka.y -= blicka.speed * modifier;
  }
  if (40 in keysDown || 83 in keysDown) { // Player holding down
    blicka.y += blicka.speed * modifier;
  }
  if (37 in keysDown || 65 in keysDown) { // Player holding left
    blicka.x -= blicka.speed * modifier;
  }
  if (39 in keysDown || 68 in keysDown) { // Player holding right
    blicka.x += blicka.speed * modifier;
  }

  // mouse movement
  if (mouse.x && mouse.y) {
    blicka.x = mouse.x;
    blicka.y = mouse.y;
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

  // blicka
  ctx.fillStyle = '#000';
  ctx.fillRect(blicka.x, blicka.y, blicka.width, blicka.height);

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
