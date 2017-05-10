var paddleFactory = function() {
  this.x = 0
  this.y = 0
  this.w = 120
  this.h = 14
  this.animationBounce = {
    length: 300,
    iteration: 0,
    maxIteration: 1,
    progress: 0
  }

  this.mouseMove = function(mouse) {
    var mouseX = mouse.x
    if (mouseX) {
      this.x = mouseX - (this.w / 2)
    }
  }

  this.render = function(stage) {
    stage.ctx.fillStyle = '#ccc'
    stage.ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}
