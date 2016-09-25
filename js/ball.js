var Entity = require('./entity')

module.exports = class Ball extends Entity {

  constructor() {
    super()
    this.w = 10
    this.h = 10
    this.x = 0
    this.y = 0
    this.vX = .3
    this.vY = .3
    this.radius = 5
    this.spin = 0
    this.spinLife = 1
  }

  contactPaddle(paddle, mouse) {
    if (paddle.isHitTop(this)) {

      // ball go up
      this.vY = -this.vY

      // ball always above paddle
      this.y -= paddle.h

      // load ball with spin if there
      this.spin = mouse.vX
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
    this.x += this.vX * timeDelta
    this.y += this.vY * timeDelta
  }

  render(canvasContext) {
    canvasContext.fillStyle = '#666'
    canvasContext.fillRect(this.x, this.y, this.w, this.h)
  }
}
