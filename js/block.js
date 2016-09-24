var Entity = require('./entity')

module.exports = class Block extends Entity {

  constructor(x, y) {
    super()
    this.w = 20
    this.h = 20
    this.x = x
    this.y = y
    this.destroyed = false
  }

  isDestroyed() {
    return this.destroyed
  }

  render(canvasContext) {
    if (!this.destroyed) {
      canvasContext.fillStyle = '#666'
    } else {
      canvasContext.fillStyle = '#ccc'
    }
    canvasContext.fillRect(this.x, this.y, this.w, this.h)
  }
}
