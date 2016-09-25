var canvasElement = document.createElement('canvas')
var canvasContext = canvasElement.getContext('2d')
var keysDown = {}
var timeThen = Date.now()
var timeNow
var timeDelta
var timeModified
var stage = require('./stage')
var mouse = require('./mouse')
var Ball = require('./ball')
var ball = new Ball()
var Paddle = require('./paddle')
var Block = require('./block')
var paddle = new Paddle()
var blocks = []

ball.x = 200
ball.y = 200

canvasElement.width = stage.w
canvasElement.height = stage.h

var index = 0
while (index < 50) {
  var ex = 25 * index
  var ye = 20
  var block = new Block(ex, ye)
  blocks.push(block)
  index++
}

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true
}, false)

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode]
}, false)

// store mouse pos
canvasElement.addEventListener('mousemove', function(e) {
  var rect = canvasElement.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
}, false)

// append canvas to dom
document.body.appendChild(canvasElement)

loop()

function loop() {
  timeNow = Date.now()
  timeDelta = timeNow - timeThen
  timeModified = timeDelta
  update()
  render()
  timeThen = timeNow
  window.requestAnimationFrame(loop)
}

function update() {
  paddle.mouseMove(mouse)
  ball.hitStage(stage)
  ball.contactPaddle(paddle, mouse)
  ball.moveVelocity(timeDelta)
  blocks.forEach(function(block) {
    if (!block.isDestroyed()) {
      var blockHit = block.isHit(ball)
      if (blockHit) {
        if (blockHit === (block.hitTop || block.hitBottom)) {
          ball.bounceVertical()
        } else if (blockHit === (block.hitLeft || block.hitRight)) {
          ball.bounceHorisontal()
        }
        block.destroyed = true
      }
    }
  })
}

function render() {
  stage.render(canvasElement, canvasContext)
  blocks.forEach(function(block) {
    block.render(canvasContext)
  })
  paddle.render(canvasContext)
  ball.render(canvasContext)
}
