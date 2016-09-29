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
    this.animationBounce = {
      length: 300,
      iteration: 0,
      maxIteration: 1,
      progress: 0
    }
  }

  mouseMove() {
    var mouseX = mouse.getX()
    if (mouseX) {
      this.x = mouseX
    }
  }

  render() {
    
  }
}
