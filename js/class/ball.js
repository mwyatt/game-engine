var entityFactory = require('./entity');

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

Ball.prototype = entityFactory.prototype;

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
    ball.y -= paddle.h;

    // load ball with spin if there
    ball.spin = mouse.vX;
    console.log(ball.spin);
  };
}

Ball.prototype.moveVelocity = function() {
  this.x += this.vX;
  this.y += this.vY;
}

Ball.prototype.bounceWalls = function() {

  // if this strikes the vertical walls, invert the 
  // x-velocity vector of this
  if (this.x + this.w >= Stage.canvas.width) {
    this.vX = -this.vX;
  } else if (this.x -this.radius <= 0) {
    this.vX = -this.vX;
  };

  // if this strikes the horizontal walls, invert the 
  // x-velocity vector of this
  if (this.y + this.w >= Stage.canvas.height) {
    this.vY = -this.vY;
  } else if (this.y <= 0) {
    this.vY = -this.vY;
  };

  // goes outside canvas
  if (this.y < 0) {
    this.y = 0;
  } else if (this.x < 0) {
    this.x = 0;
  } else if (this.x > Stage.canvas.width) {
    this.x = Stage.canvas.width - this.w;
  } else if (this.y > Stage.canvas.height) {
    this.y = Stage.canvas.height - this.h;
  };
}

module.exports = Ball;
