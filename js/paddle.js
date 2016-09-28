var Entity = require('./entity')
var core = require('./core')
var mouse = require('./mouse')

module.exports = class Paddle extends Entity {

  constructor() {
    super()
    this.w = 120
    this.h = 14
    this.x = 0
    this.y = core.h 
  }

  mouseMove() {
    var mouseX = mouse.getX()
    if (mouseX) {
      this.x = mouseX
    }
  }
}
