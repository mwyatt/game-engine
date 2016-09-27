var Entity = require('./entity')
var stage = require('./stage')

module.exports = class Paddle extends Entity {

  constructor() {
    super()
    this.w = 160
    this.h = 10
    this.x = 0
    this.y = stage.h 
  }

  mouseMove(mouse) {
    if (mouse.x) {
      this.x = mouse.x
    }
  }
}
