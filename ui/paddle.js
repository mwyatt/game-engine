var paddleFactory = function() {
  this.type = 'paddle'
  this.x = 0
  this.y = 0
  this.vX = .5
  this.w = 80
  this.h = 12
  this.timeCreated = Date.now()
  this.animationBounce = {
    length: 300,
    iteration: 0,
    maxIteration: 1,
    progress: 0
  }

  this.update = function(stage) {
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
