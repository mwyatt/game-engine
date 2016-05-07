class Entity {
  
    constructor(w, h, x, y) {
      this.w = w;
      this.h = h;
      this.x = x;
      this.y = y;
    }

    getTop() {
      return this.y;
    }

    getRight() {
      return this.x + this.w;
    }

    getBottom() {
      return this.y + this.h;
    }

    getLeft() {
      return this.x;
    }

    isHit(entity) {
      return this.getTop() > entity.getTop()
        && this.getRight() < entity.getLeft()
        && this.getLeft() < entity.getRight()
        && this.getBottom < entity.getBottom();
    };

    isHitTop(entity) {
      return entity.getBottom() >= this.getTop() && entity.getRight() >= this.getLeft() && entity.getLeft() <= this.getRight() && entity.getBottom() < this.getBottom();
    }

    isHitRight(entity) {
      return this.getTop() >= entity.getBottom() && this.getRight() >= entity.getLeft() && this.getBottom() >= entity.getTop() && this.getLeft() < entity.getLeft();
    }

    isHitBottom(entity) {
      return this.getTop() < entity.getTop() && this.getRight() >= entity.getLeft() && this.getBottom() <= entity.getTop() && this.getLeft() >= entity.getLeft();
    }

    isHitLeft(entity) {
      return this.getTop() <= entity.getBottom() && this.getRight() > entity.getRight() && this.getBottom() >= entity.getTop() && this.getLeft() >= entity.getRight();
    }
}


class Ball extends Entity {

    constructor() {
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

    contactBlock() {
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

    contactPaddle() {
      if (paddle.isHitTop(ball)) {

        // ball go up
        ball.vY = -ball.vY;

        // ball always above paddle
        ball.y -= paddle.h;

        // load ball with spin if there
        ball.spin = mouse.vX;
      };
    }

    moveVelocity() {
      this.x += this.vX;
      this.y += this.vY;
    }

    bounceWalls() {

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
}



class Block extends Entity {

  this.w = 20;
  this.h = 20;
}


class Paddle extends Entity {


  this.w = 150;
  this.h = 10;


  Paddle.prototype.mouseMove = function() {
    if (mouse.x && mouse.y) {
      paddle.x = mouse.x;
      paddle.y = mouse.y;
    };
  };
}


class Mouse {

  constructor() {
    this.x = 0;
    this.y = 0;
    this.vX = 0;
    this.vXHistory = 0;
  }

  storeVelocity() {
    this.vX = this.vXHistory - this.x;
    this.vXHistory = this.x;
  }
}
