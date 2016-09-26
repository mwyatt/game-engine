var Ball = require('./ball')
var Paddle = require('./paddle')
var mouse = require('./mouse')
var blockManager = require('./blockManager')
var mouse = require('./mouse')
var ball = new Ball()
var paddle = new Paddle()
var timeThen = Date.now()
var blocks = blockManager.getLevel1Blocks()
var canvasElement
var canvasContext
var timeNow
var timeDelta
var timeModified

var Stage = {
  w: 320,
  h: 600
}

Stage.getCanvasElement = function() {
  return canvasElement
}

Stage.getTimeDelta = function() {
  return timeDelta
}

Stage.getCanvasContext = function() {
  return canvasContext
}

Stage.init = function() {
  canvasElement = document.createElement('canvas')
  canvasContext = canvasElement.getContext('2d')
  canvasElement.width = this.w
  canvasElement.height = this.h
  ball.x = this.w / 2
  ball.y = this.h / 2

  canvasElement.addEventListener('mousemove', function(e) {
    var rect = canvasElement.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
    mouse.storeVelocity()
  }, false)
}

Stage.loop = function() {
  timeNow = Date.now()
  timeDelta = timeNow - timeThen
  timeModified = timeDelta
  Stage.update()
  Stage.render()
  timeThen = timeNow
  window.requestAnimationFrame(Stage.loop)
}

Stage.update = function() {
  paddle.mouseMove(mouse)
  ball.hitStage(this)
  ball.contactPaddle(paddle, mouse)
  ball.moveVelocity(timeDelta)
  blocks.forEach(function(block) {
    if (!block.isDestroyed()) {
      var hitResult = block.isHit(ball)
      if (hitResult) {
        if (hitResult === block.hitTop || hitResult === block.hitBottom) {
          ball.bounceVertical()
        } else if (hitResult === block.hitLeft || hitResult === block.hitRight) {
          ball.bounceHorisontal()
        }
        block.takeDamage()
      }
    }
  })
}

Stage.render = function() {
  canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height)

  canvasContext.fillStyle = '#eee'
  canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height)

  canvasContext.fillStyle = '#d6d6d6'
  canvasContext.fillRect(0, Stage.h / 1.5, Stage.w, Stage.h)

  blocks.forEach(function(block) {
    if (block.isDestroyed()) {
      return 
    } else if (block.lives == 2) {
      canvasContext.fillStyle = '#333'
    } else if (block.lives == 1) {
      canvasContext.fillStyle = '#666'
    }
    canvasContext.fillRect(block.x, block.y, block.w, block.h)
  })
  
  canvasContext.fillStyle = '#666'
  canvasContext.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)
  canvasContext.fillRect(ball.x, ball.y, ball.w, ball.h)
}

module.exports = Stage
