var Entity = require('./entity')

module.exports = class Block extends Entity {

  constructor(x, y) {
    super()
    this.w = 35
    this.h = 15
    this.x = x
    this.y = y
    this.lives = 1
  }

  isDestroyed() {
    return this.lives < 1
  }

  takeDamage() {
    this.lives--
  }

  // render() {
  //   if (!this.destroyed) {
  //     canvasContext.fillStyle = '#666'
  //   } else {
  //     canvasContext.fillStyle = '#ccc'
  //   }
  //   canvasContext.fillRect(this.x, this.y, this.w, this.h)
  // }
}
