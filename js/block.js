var Entity = require('./entity')
var core = require('./core')

module.exports = class Block extends Entity {

  constructor(x, y) {
    super()
    this.w = 32
    this.h = 20
    this.x = x
    this.y = y
    this.lives = 1
    this.animationDestroy = {
      length: 200,
      iteration: 0,
      maxIteration: 1,
      progress: 0
    }
  }

  isDestroyed() {
    return this.lives < 1
  }

  takeDamage() {
    this.lives--
  }

  render() {

    // destroyed and animation played
    if (this.isDestroyed() && this.animationDestroy.iteration >= this.animationDestroy.maxIteration) {
      return
    }

    var timeDelta = core.getTimeDelta()
    var canvasCtx = core.getCanvasCtx()
    if (this.isDestroyed()) {
      this.animationDestroy.progress += timeDelta
      if (this.animationDestroy.progress >= this.animationDestroy.length) {
        return this.animationDestroy.iteration = 1
      }
      var positiveDecimal = this.animationDestroy.progress / this.animationDestroy.length
      var opacity = 1 - (Math.round(positiveDecimal * 10) / 10)
      canvasCtx.fillStyle = 'rgba(0, 0, 0, ' + opacity + ')'
    } else if (this.lives == 2) {
      canvasCtx.fillStyle = '#333'
    } else if (this.lives == 1) {
      canvasCtx.fillStyle = 'rgba(0, 0, 0, 1)'
    }
    canvasCtx.fillRect(this.x, this.y, this.w, this.h)
  }
}
