var Entity = require('./entity')

module.exports = class Ball extends Entity {

  constructor() {
    super()
    this.w = 10
    this.h = 10
    this.radius = this.w / 2
    this.x = 0
    this.y = 0
    this.vX = .4
    this.vY = .4
    this.spin = 0
    this.spinDuration
  }

  contactPaddle(paddle, mouse) {
    if (paddle.isHitTop(this)) {

      // ball go up
      this.vY = -this.vY
      this.vX = 0

      // ball always above paddle
      this.y -= paddle.h

      // load ball with spin if there
      this.spin = mouse.vX > 10 ? 10 : mouse.vX
      this.spinDuration = 750
    }
  }

  bounceVertical() {
    this.vY = -this.vY
  }

  bounceHorisontal() {
    this.vX = -this.vX
  }

  hitStage(stage) {

    // if this strikes the vertical walls, invert the 
    // x-velocity vector of this
    if (this.x + this.w >= stage.w) {
      this.vX = -this.vX
    } else if (this.x -this.radius <= 0) {
      this.vX = -this.vX
    }

    // if this strikes the horizontal walls, invert the 
    // x-velocity vector of this
    if (this.y + this.w >= stage.h) {
      this.vY = -this.vY
    } else if (this.y <= 0) {
      this.vY = -this.vY
    }

    // goes outside canvas
    if (this.y < 0) {
      this.y = 0
    } else if (this.x < 0) {
      this.x = 0
    } else if (this.x > stage.w) {
      this.x = stage.w - this.w
    } else if (this.y > stage.h) {
      this.y = stage.h - this.h
    }
  }

  moveVelocity(timeDelta) {
    if (this.spinDuration > 0) {
      var spinPositive = this.spin < 0 ? -this.spin : this.spin
      var spinAmount = .002 * spinPositive
      this.spinDuration -= timeDelta
      if (this.spinDuration < 500) {
        if (this.spin > 0) {
          this.vX += spinAmount
        } else {
          this.vX -= spinAmount
        }
      }
    }

    this.vX = this.vX > 1 ? 1 : this.vX
    this.vY = this.vY > 1 ? 1 : this.vY

    this.x += parseInt(this.vX * timeDelta)
    this.y += parseInt(this.vY * timeDelta)
  }
}
