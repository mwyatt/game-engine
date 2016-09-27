var Entity = require('./entity')

module.exports = class Block extends Entity {

  constructor(x, y) {
    super()
    this.w = 32
    this.h = 10
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
}
