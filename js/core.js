var stage = require('./stage')
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
var Core = {}
var score = 0
var fps = 0

Core.getCanvasElement = function() {
  return canvasElement
}

Core.getTimeDelta = function() {
  return timeDelta
}

Core.getCanvasContext = function() {
  return canvasContext
}

Core.init = function() {
  canvasElement = document.createElement('canvas')
  canvasElement.style.cursor = 'none'
  canvasContext = canvasElement.getContext('2d')
  canvasElement.width = stage.w
  canvasElement.height = stage.h
  ball.x = stage.w / 2
  ball.y = stage.h / 2
  paddle.x = (stage.w / 2) + (paddle.w / 2)
  paddle.y = stage.h - 30

  canvasElement.webkitRequestFullScreen(canvasElement.ALLOW_KEYBOARD_INPUT)

  canvasElement.addEventListener('mousemove', function(e) {
    var rect = canvasElement.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.storeVelocity()
  }, false)
}

Core.loop = function() {
  timeNow = Date.now()
  timeDelta = timeNow - timeThen
  timeModified = timeDelta
  Core.update()
  Core.render()
  timeThen = timeNow
  window.requestAnimationFrame(Core.loop)
}

Core.update = function() {
  paddle.mouseMove(mouse)
  ball.hitStage()
  ball.contactPaddle(paddle, mouse)
  ball.moveVelocity(timeDelta)
  var hitThisFrame
  blocks.forEach(function(block) {
    if (!block.isDestroyed()) {
      var hitResult = block.isHit(ball)
      if (hitResult && !hitThisFrame) {
        hitThisFrame = true
        if (hitResult === block.hitTop || hitResult === block.hitBottom) {
          ball.bounceVertical()
        } else if (hitResult === block.hitLeft || hitResult === block.hitRight) {
          ball.bounceHorisontal()
        }
        block.takeDamage()
        score += 10
      }
    }
  })
}

Core.render = function() {
  canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height)

  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.1)'
  canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height)

  blocks.forEach(function(block) {
    if (block.isDestroyed()) {
      return 
    } else if (block.lives == 2) {
      canvasContext.fillStyle = '#333'
    } else if (block.lives == 1) {
      canvasContext.fillStyle = 'rgba(0, 0, 0, 0.2)'
    }
    canvasContext.fillRect(block.x, block.y, block.w, block.h)
  })
  
  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.3)'
  canvasContext.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)
  canvasContext.fillRect(ball.x, ball.y, ball.w, ball.h)

  canvasContext.font = "21px Arial";
  canvasContext.fillStyle = "rgba(0, 0, 0, 0.3)";
  canvasContext.fillText(score, 20, stage.h - 20);
}

module.exports = Core
