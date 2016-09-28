var core = require('./core')
var keyCodes = require('./keyCodes')
var Ball = require('./ball')
var Paddle = require('./paddle')
var MenuButton = require('./menuButton')
var blockManager = require('./blockManager')
var ball = new Ball()
var paddle = new Paddle()
var timeThen = Date.now()
var blocks = blockManager.getLevel1Blocks()
var canvasElement
var canvasContext
var timeNow
var timeDelta
var timeModified
var Stage = {}
var score = 0
var fps = 0
var showmenu = true
var buttonNewGame

Stage.setCanvasElement = function(element) {
  canvasContext = element.getContext('2d')
  canvasElement = element
}

Stage.loadMenu = function() {
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
}

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

function renderCanvas() {
  canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height)
  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.1)'
  canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height)
}

function renderMenu() {
  canvasContext.fillStyle = buttonNewGame.selected ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)'
  canvasContext.fillRect(buttonNewGame.x, buttonNewGame.y, buttonNewGame.w, buttonNewGame.h)
  canvasContext.font = "21px Arial";
  canvasContext.fillStyle = "rgba(0, 0, 0, 0.5)";
  canvasContext.fillText(buttonNewGame.text, 30, 30);
}

function renderLevel() {

  // blocks
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

  // paddle
  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.3)'
  canvasContext.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)

  // ball
  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.3)'
  canvasContext.beginPath()
  canvasContext.arc(ball.x, ball.y, ball.w / 2, 0, Math.PI * 2, true)
  canvasContext.fill()

  // score
  canvasContext.font = "21px Arial";
  canvasContext.fillStyle = "rgba(0, 0, 0, 0.3)";
  canvasContext.fillText(score, 20, core.h - 20);
}

module.exports = Stage
