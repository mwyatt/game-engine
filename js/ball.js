var Entity = require('./entity')
var core = require('./core')
var mouse = require('./mouse')

module.exports = class Ball extends Entity {

  constructor() {
    super()
    this.w = 14
    this.h = 14
    this.radius = this.w / 2
    this.x = 0
    this.y = 0
    this.vX = 0
    this.vMaxPositive = .4
    this.vMaxNegative = -.4
    this.vY = this.vMaxNegative
    this.spin = 0
    this.spinDuration
  }

  contactPaddle(paddle) {
    var hitResult = paddle.isHit(this)
    if (hitResult == this.hitTop || hitResult == this.hitLeft || hitResult == this.hitRight) {

      // ball go up
      if (this.vY > 0) {
        this.vY = -this.vY
      }

      // ball always above paddle
      if (this.getBottom() > paddle.getTop()) {
        this.y = paddle.y - paddle.h
      }

      // max spin 
      var mouseVX = mouse.getVX()
      this.spin = mouseVX > 10 ? 10 : mouseVX
      this.spin = mouseVX < -10 && mouseVX < 0 ? -10 : this.spin

      var spinPositive = this.spin < 0 ? -this.spin : this.spin

      // reset vx if trying to spin
      if (spinPositive > 2) {
        this.vX = 0
      }

      this.spinDuration = (spinPositive / 2) * 100
    }
  }

  bounceVertical() {
    this.vY = -this.vY
  }

  bounceHorisontal() {
    this.vX = -this.vX
  }

  hitStage() {

    // ball outside of play area?
    if (this.getRight() > core.w) {
      this.x = core.w - this.w
    } else if (this.getLeft() < 0) {
      this.x = 0
    } else if (this.getTop() < 0) {
      this.y = 0
    } else if (this.getBottom() > core.h) {
      this.y = core.h - this.w
    }

    // if this strikes the vertical walls
    if (this.getRight() == core.w) {
      this.vX = -this.vX
    } else if (this.getLeft() == 0) {
      this.vX = -this.vX
    }

    // if this strikes the horizontal walls
    if (this.getBottom() == core.h) {
      this.vY = -this.vY
    } else if (this.getTop() == 0) {
      this.vY = -this.vY
    }
  }

  moveVelocity(timeDelta) {
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
