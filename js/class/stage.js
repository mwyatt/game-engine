var entityFactory = require('./entity');
var mouseFactory = require('./mouse');
var ballFactory = require('./ball');
var blockFactory = require('./block');
var paddleFactory = require('./paddle');

var mouse = new mouseFactory();
var ball = new ballFactory();
var paddle = new paddleFactory;
var canvasElement = document.createElement('canvas');

var blocks = [];
var keysDown = {};
var timeThen = Date.now();
var timeNow;
var timeDelta;
var timeModified;

ball.x = 100;
ball.y = 100;

for (var index = 30 - 1; index >= 0; index--) {
  blocks[index] = new blockFactory();
  blocks[index].y = 20;
  blocks[index].x = (30 * index);
};

canvasElement.width = 800;
canvasElement.height = 600;

var Stage = function() {
  this.canvas = canvasElement;
  this.ctx = canvasElement.getContext('2d');
  this.loop(this);
};

Stage.prototype.loop = function (stage) {
  timeNow = Date.now();
  timeDelta = timeNow - timeThen;
  timeModified = timeDelta;
  var stage = this;

  this.update();
  this.render();
  timeThen = timeNow;
  window.requestAnimationFrame(function() {
    stage.loop(stage);
  });
};

Stage.prototype.render = function () {

  // clear 
  this.ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // bg
  this.ctx.fillStyle = '#eee';
  this.ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

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

Stage.prototype.update = function () {
  ball.bounceWalls(this);
  ball.contactPaddle(paddle, mouse);
  ball.moveVelocity();
  paddle.mouseMove(mouse);
  mouse.storeVelocity();
};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// store mouse pos
canvasElement.addEventListener('mousemove', function(e) {
  var rect = canvasElement.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
}, false);

// append canvas to dom
document.body.appendChild(canvasElement);

module.exports = Stage;
