var blockFactory = function() {
  this.type = ''
  this.x = 0
  this.y = 0
  this.w = 16
  this.h = 16
  this.lives = 1
  this.color = '#666'
  this.animationDestroy = {
    length: 200,
    iteration: 0,
    maxIteration: 1,
    progress: 0
  }

  this.isDestroyed = function() {
    return this.lives < 1
  }

  this.takeDamage = function() {
    this.lives--
  }

  this.render = function(stage) {

    // destroyed and animation played
    if (this.isDestroyed() && this.animationDestroy.iteration >= this.animationDestroy.maxIteration) {
      return
    }

    if (this.isDestroyed()) {
      this.animationDestroy.progress += stage.timeDelta
      if (this.animationDestroy.progress >= this.animationDestroy.length) {
        return this.animationDestroy.iteration = 1
      }
      var positiveDecimal = this.animationDestroy.progress / this.animationDestroy.length
      var opacity = 1 - (Math.round(positiveDecimal * 10) / 10)
      stage.ctx.fillStyle = 'rgba(0, 0, 0, ' + opacity + ')'
    } else if (this.lives == 2) {
      stage.ctx.fillStyle = '#333'
    } else if (this.lives == 1) {
      stage.ctx.fillStyle = this.color
    }
    stage.ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}
