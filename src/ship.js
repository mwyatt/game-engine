var shipFactory = function() {
  this.x = 0
  this.y = 0
  this.v = .5
  this.w = 10
  this.h = 10
  this.r = 0
  this.timeCreated = Date.now()
  this.update = function(stage) {
    if (stage.keyCodes.w in stage.keysDown) {
      this.y -= Math.round(this.v * stage.time.delta)
    } else if (stage.keyCodes.s in stage.keysDown) {
      this.y += Math.round(this.v * stage.time.delta)
    }
    if (stage.keyCodes.a in stage.keysDown) {
      this.r -= Math.round(this.v * stage.time.delta)
    } else if (stage.keyCodes.d in stage.keysDown) {
      this.r += Math.round(this.v * stage.time.delta)
    }
    if (this.r > 360 || this.r < 0) {
      this.r = 0
    }
  },
  this.render = function(stage) {
    stage.ctx.fillStyle = 'hsl(189, 50%, 50%)'
    stage.ctx.rotate(1)
    console.log([this.x, this.y])
    stage.ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}

module.exports = shipFactory
