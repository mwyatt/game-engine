var hitTest = hitTest

var ballFactory = function() {
  this.vMaxPositive = .35
  this.vMaxNegative = -.35
  this.spinDuration = 0

  this.w = 14
  this.h = 14
  this.radius = this.w / 2
  this.x = 0
  this.y = 0
  this.vX = -.1
  this.vY = -.1
  this.spin = 0

  this.contactPaddle = function(paddle) {
    var hitresult = hitTest.ishit(paddle, this)
    if (hitresult == this.hittop || hitresult == this.hitleft || hitresult == this.hitright) {

      // ball go up
      if (this.vy > 0) {
        this.vy = -this.vy
      }

      // ball always above paddle
      if (this.getbottom() > paddle.gettop()) {
        this.y = paddle.y - paddle.h
      }

      // max spin 
      var mousevx = mouse.getvx()
      this.spin = mousevx > 10 ? 10 : mousevx
      this.spin = mousevx < -10 && mousevx < 0 ? -10 : this.spin

      var spinpositive = this.spin < 0 ? -this.spin : this.spin

      // reset vx if trying to spin
      if (spinpositive > 2) {
        this.vx = 0
      }

      this.spinduration = (spinpositive / 2) * 100
    }
  }

  this.bounceVertical = function() {
    this.vY = -this.vY
  }

  this.bounceHorisontal = function() {
    this.vX = -this.vX
  }

  this.hitStage = function() {

    // ball outside of play area?
    if (hitTest.getRight(this) > stageWidth) {
      this.x = stageWidth - this.w
    } else if (hitTest.getLeft(this) < 0) {
      this.x = 0
    } else if (hitTest.getTop(this) < 0) {
      this.y = 0
    } else if (hitTest.getBottom(this) > stageHeight) {
      this.y = stageHeight - this.w
    }

    // if this strikes the vertical walls
    if (hitTest.getRight(this) == stageWidth) {
      this.vX = -this.vX
    } else if (hitTest.getLeft(this) == 0) {
      this.vX = -this.vX
    }

    // if this strikes the horizontal walls
    if (hitTest.getBottom(this) == stageHeight) {
      this.vY = -this.vY
    } else if (hitTest.getTop(this) == 0) {
      this.vY = -this.vY
    }
  }

  this.moveVelocity = function(timeDelta) {
    if (this.spinDuration > 0) {
      this.spinDuration -= timeDelta
      var spinPositive = this.spin < 0 ? -this.spin : this.spin
      var spinAmount = (timeDelta / 10000) * spinPositive
      if (this.spin > 0) {
        this.vX += spinAmount
      } else {
        this.vX -= spinAmount
      }
    }

    // throttle v
    if (this.vX > 0 && this.vX > this.vMaxPositive) {
      this.vX = this.vMaxPositive
    } else if (this.vX < 0 && this.vX < this.vMaxNegative) {
      this.vX = this.vMaxNegative
    }

    this.x += Math.round(this.vX * timeDelta)
    this.y += Math.round(this.vY * timeDelta)
    ballG.x = this.x
    ballG.y = this.y
    console.log(ballG.x, ballG.y)
  }
}
