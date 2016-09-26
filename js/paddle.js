var Entity = require('./entity')

module.exports = class Paddle extends Entity {

  constructor() {
    super()
    this.w = 160
    this.h = 10
    this.x = 0
    this.y = 0
  }

  mouseMove(mouse) {
    if (mouse.x && mouse.y) {
      this.x = mouse.x
      this.y = mouse.y
    }
  }
}
