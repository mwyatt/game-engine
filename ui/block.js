var hitTest = require('./hittest')
var ballFactory = require('./ball')

var blockFactory = function() {
  this.type = 'block'
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
    var balls = stage.getSceneryByType('ball')

    for (var a = 0; a < balls.length; a++) {
      ball = balls[a]
      if (ball.zone && ball.zone.blocks != undefined) {
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
              if (block.power) {
                var paddles = stage.getSceneryByType('paddle')
                var paddle = paddles[0]
                if (block.power == 'paddleExpand') {
                  paddle.animationGrow.progress = 0
                }
                if (block.power == 'paddleShrink') {
                  paddle.animationShrink.progress = 0
                }
                if (block.power == 'newBall') {
                  var ball = new ballFactory()
                  ball.vX = .2
                  ball.vY = .2
                  ball.x = stage.w / 2 + ball.w / 2
                  ball.y = paddle.y - 70
                  ball.updateHitZone(stage.hitZones)
                  stage.scenery.push(ball)
                }
              }
            }
          }
        }
      }
    }

    if (blockHitThisFrame) {
      stage.countBlocks()
    }
  }

  this.render = function(stage) {

    // destroyed and animation played
    // if (this.isDestroyed() && this.animationDestroy.iteration >= this.animationDestroy.maxIteration) {
    //   return
    // }

    // if (this.isDestroyed()) {
    //   this.animationDestroy.progress += stage.time.delta
    //   if (this.animationDestroy.progress >= this.animationDestroy.length) {
    //     return this.animationDestroy.iteration = 1
    //   }
    //   var positiveDecimal = this.animationDestroy.progress / this.animationDestroy.length
    //   var opacity = 1 - (Math.round(positiveDecimal * 10) / 10)
    //   this.opacity = opacity
    // }

    // color
    var color = stage.palette.gray
    if (this.power == 'paddleExpand') {
      color = stage.palette.blue
    } else if (this.power == 'paddleShrink') {
      color = stage.palette.red
    }
    stage.ctx.fillStyle = color

    if (!this.isDestroyed()) {
      stage.ctx.fillRect(this.x, this.y, this.w, this.h)
    }
  }
}

module.exports = blockFactory
