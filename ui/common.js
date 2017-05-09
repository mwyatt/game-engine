var stage = {
  canvasEl: '',
  canvasRect: '',
  ctx: '',
  timeDelta: 0,
  w: 320,
  h: 320,
  gutter: 20,
}
var keysDown = []
var hitTest = hitTest
var ballFactory = ballFactory
var mouseFactory = mouseFactory
var blockFactory = blockFactory
var mouse = new mouseFactory()
var log = console.log
var timeThen = Date.now()
var timeNow
var ball = new ballFactory()
var balls = [ball]
var blocks = []
var log = console.log

setupStage()
setupEvents()
setupBalls()
setupBlocks()
loop()

function setupStage() {
  stage.canvasEl = document.createElement('canvas')
  stage.canvasEl.style.cursor = 'none'
  stage.canvasEl.width = stage.w
  stage.canvasEl.height = stage.h
  stage.canvasRect = stage.canvasEl.getBoundingClientRect()
  document.body.appendChild(stage.canvasEl)
  stage.ctx = stage.canvasEl.getContext('2d')
}

function setupEvents() {
  addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true
  }, false)

  addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode]
  }, false)

  stage.canvasEl.addEventListener('mousemove', function(e) {
    mouse.setX(e.clientX - stage.canvasRect.left)
    mouse.storeVelocity()
  }, false)
}

function setupBalls() {
  for (var b = 0; b < balls.length; b++) {
    var quarterStageH = ((stage.h / 2) / 2)
    ball.x = (stage.w / 2) - (ball.w / 2)
    ball.y = (quarterStageH * 3) -(ball.h / 2)
  }
}

function loop() {
  timeNow = Date.now()
  stage.timeDelta = timeNow - timeThen
  update()
  render()
  timeThen = timeNow
  window.requestAnimationFrame(loop)
}

function update() {
  var block
  var ball
  var hitBlockThisFrame
  var remainingBlocks = []
  var hitCount = 0

  // temp
  for (var b = 0; b < balls.length; b++) {
    ball = balls[b]
  }

  // work out where the ball is in relation to all other blocks
  // narrow down which ones could possibly be hit, using the grid they are placed?

  // currently checks only one ball
  // can only hit one block per frame
  for (var b = 0; b < blocks.length; b++) {
    var hit
    if (!hitBlockThisFrame) {
      block = blocks[b]
      var hitTop = hitTest.isHitTop(ball, block)
      var hitBottom = hitTest.isHitBottom(ball, block)
      var hitLeft = hitTest.isHitLeft(ball, block)
      var hitRight = hitTest.isHitRight(ball, block)
      hit = hitTop || hitBottom || hitLeft || hitRight
      if (hit) {
        hitCount++
        hitBlockThisFrame = true
        if (hitTop || hitBottom) {
            ball.bounceVertical()
        } else {
            ball.bounceHorisontal()
        } 
      }
    } else {
      hit = false
    }
    if (!hit) {
      remainingBlocks.push(block)
    }
  }
  log(hitCount, remainingBlocks.length)
  blocks = remainingBlocks
  
  for (var b = 0; b < balls.length; b++) {
    ball = balls[b]
    ball.moveVelocity(stage.timeDelta)
    ball.hitStage(stage)
  }
}

function render() {
  var ball

  // clear
  stage.ctx.clearRect(0, 0, stage.w, stage.h)
  stage.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  stage.ctx.fillRect(0, 0, stage.w, stage.h)

  // paddle
  // stage.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
  // stage.ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)

  // balls
  for (var b = 0; b < balls.length; b++) {
    ball = balls[b]
    stage.ctx.fillStyle = '#666'
    stage.ctx.beginPath()
    stage.ctx.arc(ball.x + (ball.w / 2), ball.y + (ball.h / 2), ball.w / 2, 0, Math.PI * 2, true)
    stage.ctx.fill()
  }

  // blocks
  for (var b = 0; b < blocks.length; b++) {
    blocks[b].render(stage)
  }

  // score
  // stage.ctx.font = "21px Arial";
  // stage.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  // stage.ctx.fillText(score, 20, core.h - 20);
}


function setupBlocks() {
  var hSpace = stage.w - (stage.gutter * 2)
  var vSpace = stage.h / 2
  var blockTemp = new blockFactory()
  var colTotal = parseInt(hSpace / blockTemp.w)
  var rowTotal = parseInt(vSpace / blockTemp.h)
  for (row = 1; row <= rowTotal; row++) {
    for (col = 1; col <= colTotal; col++) {
      var block = new blockFactory()
      block.x = (col * block.w)
      block.y = (row * block.h)
      blocks.push(block)
    }
  }
}
