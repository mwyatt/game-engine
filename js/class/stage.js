var entityFactory = require('./class/entity');
var mouseFactory = require('./class/mouse');
var ballFactory = require('./class/ball');
var paddleFactory = require('./class/paddle');

var mouse = new mouseFactory();
var ball = new ballFactory();
var paddle = new paddleFactory;

var blocks = [];
var keysDown = {};
var timeThen = Date.now();
var timeNow;
var timeDelta;
var timeModified;

ball.x = 100;
ball.y = 100;

for (var index = 30 - 1; index >= 0; index--) {
  blocks[index] = new Block;
  blocks[index].y = 20;
  blocks[index].x = (30 * index);
};

var canvasElement = document.createElement("canvas");

canvasElement.width = 800;
canvasElement.height = 600;

var Stage = {
  canvas: canvasElement,
  ctx: canvasElement.getContext("2d")
};

Stage.loop = function () {
  timeNow = Date.now();
  timeDelta = timeNow - timeThen;
  timeModified = timeDelta;
  // timeModified = timeDelta / 1000;

  Stage.update();
  Stage.render();
  timeThen = timeNow;
  window.requestAnimationFrame(Stage.loop);
};

Stage.render = function () {

  // clear first
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // bg
  this.ctx.fillStyle = '#eee';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  // paddle
  this.ctx.fillStyle = '#666';
  this.ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);

  // ball
  this.ctx.fillStyle = '#666';
  this.ctx.fillRect(ball.x, ball.y, ball.w, ball.h);

  // block
  this.ctx.fillStyle = '#666';
  for (var i = blocks.length - 1; i >= 0; i--) {
    if (i in blocks) {
      this.ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h);
    };
  };
};

Stage.update = function () {
  ball.bounceWalls();
  ball.contactPaddle();
  ball.moveVelocity();
  paddle.mouseMove();
  mouse.storeVelocity();
};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// store mouse pos
Stage.canvas.addEventListener('mousemove', function(e) {
  var rect = Stage.canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
}, false);

// append canvas to dom
document.body.appendChild(Stage.canvas);

// let's play this game!
Stage.loop();

module.exports = Stage;
