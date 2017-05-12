var blockFactory = function() {
  this.power = ''
  this.x = 0
  this.y = 0
  this.w = 32
  this.h = 14
  this.lives = 1
  this.opacity = 1

  this.color = function() {

 // else if (this.lives == 2) {
 //      stage.ctx.fillStyle = '#333'
 //    } else if (this.lives == 1) {

    return 'hsla(100, 40%, 50%, ' + this.opacity + ')'
  }
  this.animationDestroy = {
    length: 300,
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

  this.update = function(stage) {
    var blockHitThisFrame
    var block
    var ball

    for (var a = 0; a < stage.balls.length; a++) {
      ball = stage.balls[a]
      for (var b = 0; b < ball.zone.blocks.length; b++) {
        block = ball.zone.blocks[b]
        if (!blockHitThisFrame && !block.isDestroyed()) {
          hitResult = hitTest.isHit(block, ball)
          if (hitResult) {
            block.takeDamage()
            blockHitThisFrame = true
            var correctionPos = hitTest.getOutsidePos(block, ball)
            // block.color = '#333'
            ball.x = correctionPos.x
            ball.y = correctionPos.y
            if (correctionPos.direction == 'v') {
              ball.bounceVertical()
            } else {
              ball.bounceHorisontal()
            }
          }
        }
      }
    }
  }

  this.render = function(stage) {

    // destroyed and animation played
    if (this.isDestroyed() && this.animationDestroy.iteration >= this.animationDestroy.maxIteration) {
      return
    }

    if (this.isDestroyed()) {
      this.animationDestroy.progress += stage.time.delta
      if (this.animationDestroy.progress >= this.animationDestroy.length) {
        return this.animationDestroy.iteration = 1
      }
      var positiveDecimal = this.animationDestroy.progress / this.animationDestroy.length
      var opacity = 1 - (Math.round(positiveDecimal * 10) / 10)
      this.opacity = opacity
    }
    stage.ctx.fillStyle = this.color()
    stage.ctx.fillRect(this.x, this.y, this.w, this.h)

    if (this.power.length) {
      stage.ctx.font = "8px Arial";
      stage.ctx.fillStyle = "#333";
      stage.ctx.textAlign = "center";
      stage.ctx.textBaseline = "middle"
      stage.ctx.fillText(this.power, this.x, this.y);
    }
  }
}
