var paddleFactory = function() {
  this.type = 'paddle'
  this.x = 0
  this.y = 0
  this.vX = .5
  this.w = 80
  this.minW = 50
  this.maxW = 150
  this.h = 12
  this.timeCreated = Date.now()
  this.animationGrow = {
    length: 300,
    progress: 500,
    pixelChange: 20,
  }
  this.animationShrink = {
    length: 300,
    progress: 500,
    pixelChange: 20,
  }

  this.update = function(stage) {
    if (this.animationGrow.progress < this.animationGrow.length) {
      this.animationGrow.progress += stage.time.delta
      var percentage = Math.round(stage.time.delta / this.animationGrow.length * 100)
      this.w += this.animationGrow.pixelChange / 100 * percentage
    }
    if (this.animationShrink.progress < this.animationShrink.length) {
      this.animationShrink.progress += stage.time.delta
      var percentage = Math.round(stage.time.delta / this.animationShrink.length * 100)
      this.w -= this.animationShrink.pixelChange / 100 * percentage
    }
    if (this.w > this.maxW) {
      this.w = this.maxW
    }
    if (this.w < this.minW) {
      this.w = this.minW
    }

    if (!stage.pause.isPaused) {
      if (stage.keyCodes.a in stage.keysDown) {
        this.x -= Math.round(this.vX * stage.time.delta)
      } else if (stage.keyCodes.d in stage.keysDown) {
        this.x += Math.round(this.vX * stage.time.delta)
      } else {
        this.mouseMove(stage.mouse)
      }
      if (this.x + this.w > stage.w) {
        this.x = stage.w - this.w
      }
      if (this.x < 0) {
        this.x = 0
      }
    }
  },

  this.mouseMove = function(mouse) {
    var mouseX = mouse.x
    if (mouseX) {
      this.x = mouseX - (this.w / 2)
    }
  }

  this.render = function(stage) {
    stage.ctx.fillStyle = 'hsl(189, 50%, 50%)'
    stage.ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}

module.exports = paddleFactory
