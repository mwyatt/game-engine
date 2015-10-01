

// base object for things with
// width
// height
// x
// y
var Hitbox = function() {
  this.width;
  this.height;
  this.x;
  this.y;
}

Hitbox.prototype.getTop = function() {
  return this.y;
}

Hitbox.prototype.getRight = function() {
  return this.x + this.width;
}

Hitbox.prototype.getBottom = function() {
  return this.y + this.height;
}

Hitbox.prototype.getLeft = function() {
  return this.x;
}

// top 1
// right 2
// bottom 3
// left 4
// is this too much to test for each thing on each loop?
// must ensure that only hitboxes are tested that are likely to be hit
// may need detection to check when items are in certain areas
Hitbox.prototype.isHit = function(object) {

  // top
  if (object.getBottom() >= this.getTop() && object.getRight() >= this.getLeft() && object.getLeft() <= this.getRight() && object.getBottom() < this.getBottom()) {
    return 1;

  // right
  } else if (this.getTop() >= object.getBottom() && this.getRight() >= object.getLeft() && this.getBottom() >= object.getTop() && this.getLeft() < object.getLeft()) {
    return 2;

  // bottom
  } else if (this.getTop() < object.getTop() && this.getRight() >= object.getLeft() && this.getBottom() <= object.getTop() && this.getLeft() >= object.getLeft()) {
    return 3;

  // left
  } else if (this.getTop() <= object.getBottom() && this.getRight() > object.getRight() && this.getBottom() >= object.getTop() && this.getLeft() >= object.getRight()) {
    return 4;
  }
}

Hitbox.prototype.isHitTop = function(thing) {
  thing.getBottom() >= this.y
      && thing.y <= (this.y + this.height)
      && thing.x >= this.x
      && thing.x <= (this.x + this.width)
}

var MovingThing = function() {
  this.width;
  this.height;
  this.x;
  this.y;
  this.gravity;
  this.speed;
  this.vX;
  this.vY;
}

var Ball = function() {
  Hitbox.apply(this);
  MovingThing.apply(this);
  this.speed = 250;
  this.x = 50;
  this.y = 50;
  this.vX = 5;
  this.vY = 5;
  this.vMax = 7;
  this.vDefault = 5;
  this.width = 25;
  this.height = 25;
  this.radius = 5;
  this.spin = 0;
}
Ball.prototype = Hitbox.prototype;

Ball.prototype.fooBar = function(hi) {
  console.log(hi);
}

var thing = new Hitbox;
var ball = new Ball;

console.log(thing, thing.isHit(10, 20));
console.log(ball, ball.isHit(10, 20), ball.fooBar('ok'));






// setup canvas
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

var ball = {
  speed: 250,
  x: 50,
  y: 50,
  vX: 5,
  vY: 5,
  vMax: 7,
  vDefault: 5,
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
  ball.x += ball.vX;
  ball.y += ball.vY;

  // ball velocity limit
  if (ball.vX > 0 && ball.vX >= ball.vMax) {
    ball.vX = ball.vMax;
  } else if ((ball.vX + ball.vX) >= ball.vMax) {
    ball.vX = -ball.vMax;
  };

  // if ball strikes the vertical walls, invert the 
  // x-velocity vector of ball
  if (ball.x + ball.width >= canvas.width) {
    ball.vX = -ball.vX;
  } else if (ball.x -ball.radius <= 0) {
    ball.vX = -ball.vX;
  };

  // if ball strikes the horizontal walls, invert the 
  // x-velocity vector of ball
  if (ball.y + ball.width >= canvas.height) {
    ball.vY = -ball.vY;
  } else if (ball.y <= 0) {
    ball.vY = -ball.vY;
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
  if ((ball.y + ball.height) >= paddle.y
    && ball.y <= (paddle.y + paddle.height)
    && ball.x >= paddle.x
    && ball.x <= (paddle.x + paddle.width)
    ) {

    // ball go up
    ball.vY = -ball.vY;

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

function function_name () {
/// only image will have alpha affected:
context.globalAlpha = 0.5;
context.drawImage(image, x, y);
context.globalAlpha = 1.0;
}




var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
 
function loop() {
  clear();
  update();
  draw();
  queue();
}
 
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
 
function update() {
// stub
}
 
function draw() {
// stub
}
 
function queue() {
  window.requestAnimationFrame(loop);
}
 
loop();