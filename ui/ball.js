var hitTest = hitTest

var ballFactory = function() {
  this.vMaxPositive = .35
  this.vMaxNegative = -.35
  this.spinDuration = 0

  this.w = 12
  this.h = 12
  this.radius = this.w / 2
  this.x = 0
  this.y = 0
  this.vX = 0
  this.vY = 0
  this.spin = 0
  this.zone

  this.render = function(stage) {
    stage.ctx.fillStyle = '#666'
    stage.ctx.beginPath()
    stage.ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 2, 0, Math.PI * 2, true)
    stage.ctx.fill()
  }

  this.hitPaddle = function(paddle) {
    var result = hitTest.isHit(paddle, this)
    if (result) {
      var correctionPos = hitTest.getOutsidePos(paddle, this)
      this.x = correctionPos.x
      this.y = correctionPos.y
      if (correctionPos.direction == 'v') {
        ball.bounceVertical()
      } else {
        ball.bounceHorisontal()
      }
      
      // max spin 
      // var mousevx = mouse.getvx()
      // this.spin = mousevx > 10 ? 10 : mousevx
      // this.spin = mousevx < -10 && mousevx < 0 ? -10 : this.spin

      // var spinpositive = this.spin < 0 ? -this.spin : this.spin

      // // reset vx if trying to spin
      // if (spinpositive > 2) {
      //   this.vx = 0
      // }

      // this.spinduration = (spinpositive / 2) * 100
    }
  }

  this.bounceVertical = function() {
    this.vY = -this.vY
  }

  this.bounceHorisontal = function() {
    this.vX = -this.vX
  }

  this.hitStage = function(stage) {

    // ball outside of play area?
    if (hitTest.getRight(this) > stage.w) {
      this.x = stage.w - this.w
    } else if (hitTest.getLeft(this) < 0) {
      this.x = 0
    } else if (hitTest.getTop(this) < 0) {
      this.y = 0
    } else if (hitTest.getBottom(this) > stage.h) {
      this.y = stage.h - this.w
    }

    // if this strikes the vertical walls
    if (hitTest.getRight(this) == stage.w) {
      this.vX = -this.vX
    } else if (hitTest.getLeft(this) == 0) {
      this.vX = -this.vX
    }

    // if this strikes the horizontal walls
    if (hitTest.getBottom(this) == stage.h) {
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
  }
}
