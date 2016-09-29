var Stage = {}
var core = require('./core')
var keyCodes = require('./keyCodes')
var Ball = require('./ball')
var Paddle = require('./paddle')
var MenuButton = require('./menuButton')
var blockManager = require('./blockManager')
var ball = new Ball()
var paddle = new Paddle()
var timeThen = Date.now()
var blocks
var canvasCtx
var timeNow
var score = 0
var fps = 0
var showmenu = true
var buttonNewGame

Stage.loadMenu = function() {
  canvasCtx = core.getCanvasCtx()
  buttonNewGame = new MenuButton('New Game')
  buttonNewGame.selected = true
  loop()
}

function loadLevel() {
  showmenu = false
  ball.x = core.w / 2
  ball.y = core.h / 2
  paddle.x = (core.w / 2) + (paddle.w / 2)
  paddle.y = core.h - 30
  blocks = blockManager.getLevel1Blocks()
}

function loop() {
  timeNow = Date.now()
  core.setTimeDelta(timeNow - timeThen)
  update()
  render()
  timeThen = timeNow
  window.requestAnimationFrame(loop)
}

function update() {
  if (showmenu) {
    updateMenu()
  } else {
    updateLevel()
  }
}

function render() {
  renderCanvas()
  if (showmenu) {
    renderMenu()
  } else {
    renderLevel()
  }
}

function updateMenu() {
  if (core.getKeyDown(keyCodes.enter)) {
    showmenu = false
    loadLevel()
  }
}

function updateLevel() {
  paddle.mouseMove()
  ball.hitStage()
  ball.contactPaddle(paddle)
  ball.moveVelocity()
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

function renderCanvas() {
  canvasCtx.clearRect(0, 0, core.w, core.h)
  canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  canvasCtx.fillRect(0, 0, core.w, core.h)
}

function renderMenu() {
  canvasCtx.fillStyle = buttonNewGame.selected ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)'
  canvasCtx.fillRect(buttonNewGame.x, buttonNewGame.y, buttonNewGame.w, buttonNewGame.h)
  canvasCtx.font = "21px Arial";
  canvasCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
  canvasCtx.fillText(buttonNewGame.text, 30, 30);
}

function renderLevel() {

  // blocks
  blocks.forEach(function(block) {
    block.render()
  })

  // paddle
  canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.3)'
  canvasCtx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)

  // ball
  canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.3)'
  canvasCtx.beginPath()
  canvasCtx.arc(ball.x + (ball.w / 2), ball.y + (ball.h / 2), ball.w / 2, 0, Math.PI * 2, true)
  canvasCtx.fill()

  // score
  canvasCtx.font = "21px Arial";
  canvasCtx.fillStyle = "rgba(0, 0, 0, 0.3)";
  canvasCtx.fillText(score, 20, core.h - 20);
}

module.exports = Stage
