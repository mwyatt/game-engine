

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
Hitbox.prototype.isHit = function(entity) {

  // top
  if (entity.getBottom() >= this.getTop() && entity.getRight() >= this.getLeft() && entity.getLeft() <= this.getRight() && entity.getBottom() < this.getBottom()) {
    return 1;

  // right
  } else if (this.getTop() >= entity.getBottom() && this.getRight() >= entity.getLeft() && this.getBottom() >= entity.getTop() && this.getLeft() < entity.getLeft()) {
    return 2;

  // bottom
  } else if (this.getTop() < entity.getTop() && this.getRight() >= entity.getLeft() && this.getBottom() <= entity.getTop() && this.getLeft() >= entity.getLeft()) {
    return 3;

  // left
  } else if (this.getTop() <= entity.getBottom() && this.getRight() > entity.getRight() && this.getBottom() >= entity.getTop() && this.getLeft() >= entity.getRight()) {
    return 4;
  }
}

// Hitbox.prototype.isHitTop = function(entity) {
//   return entity.getBottom() >= this.getTop()
//     && entity.getTop() <= this.getBottom()
//     && entity.getLeft() >= this.getLeft()
//     && entity.getLeft() <= this.getRight();
// }

var EntityMoving = function() {
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
  this.speed = 250;
  this.x = 0;
  this.y = 0;
  this.vX = 5;
  this.vY = 5;
  this.vMax = 7;
  this.vDefault = 5;
  this.width = 10;
  this.height = 10;
  this.radius = 5;
  this.spin = 0;
  this.spinLife = 1;
}
Ball.prototype = Hitbox.prototype;

Ball.prototype.moveV = function() {

  // factor in spin
  if (this.spin) {
    // console.log(this.spin);
  };

  this.x += this.vX;
  this.y += this.vY;
}

var Block = function() {
  this.speed = 250;
  this.x = 0;
  this.y = 0;
  this.width = 20;
  this.height = 20;
}
Block.prototype = Hitbox.prototype;


Ball.prototype.bounceCanvas = function(canvas) {

  // if this strikes the vertical walls, invert the 
  // x-velocity vector of this
  if (this.x + this.width >= canvas.width) {
    this.vX = -this.vX;
  } else if (this.x -this.radius <= 0) {
    this.vX = -this.vX;
  };

  // if this strikes the horizontal walls, invert the 
  // x-velocity vector of this
  if (this.y + this.width >= canvas.height) {
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
    this.x = canvas.width - this.width;
  } else if (this.y > canvas.height) {
    this.y = canvas.height - this.height;
  };
}

var Paddle = function() {
  this.x = 0;
  this.y = 0;
  this.width = 150;
  this.height = 10;
}
Paddle.prototype = Hitbox.prototype;

var Mouse = function() {
  this.x = 0;
  this.y = 0;
  this.speedX = 0;
  this.prevX = 0;
}

// game objects
var mouse = new Mouse;
var ball = new Ball;
ball.x = 100;
ball.y = 100;

var paddle = new Paddle;

var blocks = [];
for (var i = 30 - 1; i >= 0; i--) {
  blocks[i] = new Block;
  blocks[i].y = 20;
  blocks[i].x = (30 * i);
};

// setup canvas and context
var canvasElement = document.createElement("canvas");
canvasElement.width = 800;
canvasElement.height = 600;
var stage = {
  canvas: canvasElement,
  ctx: canvasElement.getContext("2d")
};

// the loop game loop
var timeThen = Date.now();
var timeNow;
var timeDelta;
stage.loop = function () {
  timeNow = Date.now();
  timeDelta = timeNow - timeThen;

  // update positions of all things
  stage.update(timeDelta / 1000);

  // draw objects
  stage.render();

  // store time to refer to at start
  timeThen = timeNow;
  
  // request to do this again asap
  window.requestAnimationFrame(stage.loop);
};

// draw objects
stage.render = function () {

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

modifiers = 0;

// update game objects
stage.update = function (modifier) {

  // ball moves its velocity
  ball.moveV();

  // ball bouncing off wall
  ball.bounceCanvas(this.canvas);

  // collision ball with paddle
  // top
  if (paddle.isHit(ball) == 1) {

    // ball go up
    ball.vY = -ball.vY;

    // ball always above paddle
    ball.y -= paddle.height;

    // load ball with spin if there
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

  // ball hits block
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
};


/**
 * events
 */
// store keys down in assoc array
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// store mouse pos
stage.canvas.addEventListener('mousemove', function(e) {
  var rect = stage.canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
}, false);

// append canvas to dom
document.body.appendChild(stage.canvas);

// let's play this game!
stage.loop();
