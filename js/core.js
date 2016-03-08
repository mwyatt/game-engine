var blocks = [];
var keysDown = {};
var timeThen = Date.now();
var timeNow;
var timeDelta;
var timeModified;
var canvasElement = document.createElement("canvas");

canvasElement.width = 800;
canvasElement.height = 600;

var Stage = {
  canvas: canvasElement,
  ctx: canvasElement.getContext("2d")
};

// common object to extend from
// global hitbox checks
var Entity = function() {
  this.w; // width
  this.h; // height
  this.x;
  this.y;
}

Entity.prototype.getTop = function() {
  return this.y;
}

Entity.prototype.getRight = function() {
  return this.x + this.w;
}

Entity.prototype.getBottom = function() {
  return this.y + this.h;
}

Entity.prototype.getLeft = function() {
  return this.x;
}

Entity.prototype.isHit = function(entity) {
  return this.getTop() > entity.getTop()
    && this.getRight() < entity.getLeft()
    && this.getLeft() < entity.getRight()
    && this.getBottom < entity.getBottom();
};

Entity.prototype.isHitTop = function(entity) {
  return entity.getBottom() >= this.getTop() && entity.getRight() >= this.getLeft() && entity.getLeft() <= this.getRight() && entity.getBottom() < this.getBottom();
}

Entity.prototype.isHitRight = function(entity) {
  return this.getTop() >= entity.getBottom() && this.getRight() >= entity.getLeft() && this.getBottom() >= entity.getTop() && this.getLeft() < entity.getLeft();
}

Entity.prototype.isHitBottom = function(entity) {
  return this.getTop() < entity.getTop() && this.getRight() >= entity.getLeft() && this.getBottom() <= entity.getTop() && this.getLeft() >= entity.getLeft();
}

Entity.prototype.isHitLeft = function(entity) {
  return this.getTop() <= entity.getBottom() && this.getRight() > entity.getRight() && this.getBottom() >= entity.getTop() && this.getLeft() >= entity.getRight();
}

// motion version of the entity
var EntityMobile = function() {
  this.g; // gravity
  this.s; // speed
  this.vX; // velocity
  this.vY; // velocity
}


var Ball = function() {
  this.speed = 250;
  this.x = 0;
  this.y = 0;
  this.vX = 5;
  this.vY = 5;
  this.vMax = 7;
  this.vDefault = 5;
  this.w = 10;
  this.h = 10;
  this.radius = 5;
  this.spin = 0;
  this.spinLife = 1;
}
Ball.prototype = Entity.prototype;

Ball.prototype.contactBlock = function() {
  for (var i = blocks.length - 1; i >= 0; i--) {
    if (i in blocks) {
      if (hitLocation = blocks[i].isHit(ball)) {

        // 
        if (hitLocation == 1 || hitLocation == 3) {
          
        };
        delete blocks[i];
      };
    };
  };
}

Ball.prototype.contactPaddle = function() {
  if (paddle.isHitTop(ball)) {

    // ball go up
    ball.vY = -ball.vY;

    // ball always above paddle
    ball.y -= paddle.height;

    // load ball with spin if there
    ball.spin = mouse.vX;
  };
}

Ball.prototype.moveVelocity = function() {
  timeModified
  this.x += this.vX;
  this.y += this.vY;
}

Ball.prototype.bounceWalls = function(canvas) {

  // if this strikes the vertical walls, invert the 
  // x-velocity vector of this
  if (this.x + this.w >= canvas.width) {
    this.vX = -this.vX;
  } else if (this.x -this.radius <= 0) {
    this.vX = -this.vX;
  };

  // if this strikes the horizontal walls, invert the 
  // x-velocity vector of this
  if (this.y + this.w >= canvas.height) {
    this.vY = -this.vY;
  } else if (this.y <= 0) {
    this.vY = -this.vY;
  };

  // goes outside canvas
  if (this.y < 0) {
    this.y = 0;
  } else if (this.x < 0) {
    this.x = 0;
  } else if (this.x > canvas.width) {
    this.x = canvas.width - this.w;
  } else if (this.y > canvas.height) {
    this.y = canvas.height - this.h;
  };
}

var Block = function() {
  this.w = 20;
  this.h = 20;
}
Block.prototype = Entity.prototype;

var Paddle = function() {
  this.w = 150;
  this.h = 10;
}
Paddle.prototype = Entity.prototype;

Paddle.prototype.mouseMove = function() {
  if (mouse.x && mouse.y) {
    paddle.x = mouse.x;
    paddle.y = mouse.y;
  };
};

var Mouse = function() {
  this.x = 0;
  this.y = 0;
  this.vX = 0;
  this.vXHistory = 0;
}

Mouse.prototype.storeVelocity = function() {
  mouse.vX = mouse.vXHistory - mouse.x;
  mouse.vXHistory = mouse.x;
}

for (var index = 30 - 1; index >= 0; index--) {
  blocks[index] = new Block;
  blocks[index].y = 20;
  blocks[index].x = (30 * index);
};

var mouse = new Mouse;

var ball = new Ball;
ball.x = 100;
ball.y = 100;

var paddle = new Paddle;


Stage.loop = function () {
  timeNow = Date.now();
  timeDelta = timeNow - timeThen;
  timeModified = timeDelta / 1000;

  // update positions of all things
  Stage.update(timeModified);

  // draw objects
  Stage.render();

  // store time to refer to at start
  timeThen = timeNow;
  
  // request to do this again asap
  window.requestAnimationFrame(Stage.loop);
};

// draw objects
Stage.render = function () {

  // clear first
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // bg
  this.ctx.fillStyle = '#eee';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  // paddle
  this.ctx.fillStyle = '#666';
  this.ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  // ball
  this.ctx.fillStyle = '#666';
  this.ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

  // block
  this.ctx.fillStyle = '#666';
  for (var i = blocks.length - 1; i >= 0; i--) {
    if (i in blocks) {
      this.ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);
    };
  };
};

// update game objects
Stage.update = function (modifier) {
  ball.bounceWalls(this.canvas);
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
