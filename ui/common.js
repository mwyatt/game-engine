var stage = {
  canvasEl: '',
  canvasRect: '',
  ctx: '',
  timeDelta: 0,
  timePassed: 0,
  w: 320,
  h: 480,
  gutter: 20,
}
var keysDown = []
var hitTest = hitTest
var ballFactory = ballFactory
var mouseFactory = mouseFactory
var blockFactory = blockFactory
var paddleFactory = paddleFactory
var mouse = new mouseFactory()
var timeThen = Date.now()
var timeNow
var hitZones = []
var balls = [
  new ballFactory(),
  new ballFactory(),
  new ballFactory(),
  new ballFactory(),
  new ballFactory(),
  new ballFactory(),
]
var blocks = []
var frameInfo = []
var fps = 0
var paddle = new paddleFactory()

setupStage()
setupEvents()
setupPaddle()
setupBalls()
setupBlocks()
setupZones()
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

function setupZones() {
  // divide stage into segments
// store things into segments based on position
// then when ball is in segment test things inside it

  var division = 5
  var divisionW = stage.w / division
  var divisionH = stage.h / division
  var block
  var zone

  for (var c = 0; c < division; c++) {
    for (var r = 0; r < division; r++) {
      hitZones.push({
        x: divisionW * c,
        y: divisionH * r,
        w: divisionW,
        h: divisionH,
        blocks: [],
      })
    }
  }

  for (var b = 0; b < blocks.length; b++) {
    block = blocks[b]
    for (var z = 0; z < hitZones.length; z++) {
      zone = hitZones[z]
      if (hitTest.isHit(block, zone)) {
        zone.blocks.push(block)
      }
    }
  }
}

function setupEvents() {
  addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true
  }, false)

  addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode]
  }, false)

  stage.canvasEl.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX - stage.canvasRect.left
    mouse.y = e.clientY - stage.canvasRect.bottom
    mouse.storeVelocity()
  }, false)
}

function setupBalls() {
  var ball
  for (var b = 0; b < balls.length; b++) {
    ball = balls[b]
    var quarterStageH = ((stage.h / 2) / 2)
    ball.x = (stage.w / 2) - (ball.w / 2)
    ball.y = (quarterStageH * 3) -(ball.h / 2)
    // ball.vX = parseFloat(Math.random().toFixed(2))
    // ball.vY = parseFloat(Math.random().toFixed(2))
    ball.vX = .2
    ball.vY = .2
  }
}

function setupPaddle() {
    var quarterStageH = ((stage.h / 2) / 2)
    var vpos = (quarterStageH * 3) + (quarterStageH / 2) - (paddle.h / 2)
    paddle.x = (stage.w / 2) - (paddle.w / 2)
    paddle.y = vpos
}

function loop() {
  timeNow = Date.now()
  stage.timeDelta = timeNow - timeThen
  stage.timePassed += stage.timeDelta
  update()
  render()
  timeThen = timeNow
  window.requestAnimationFrame(loop)
}

function updateFps() {
  frameInfo.push(stage.timeDelta)
  var frameTime = 0
  for (var f = 0; f < frameInfo.length; f++) {
    frameTime += frameInfo[f]
  }
  if (frameTime > 1000) {
    fps = frameInfo.length
    frameInfo = []
  }
}

function updateBalls() {
  var zone

  for (var b = 0; b < balls.length; b++) {
    ball = balls[b]
    ball.moveVelocity(stage.timeDelta)
    ball.hitStage(stage)
    ball.hitPaddle(paddle)
    for (var z = 0; z < hitZones.length; z++) {
      zone = hitZones[z]
      if (hitTest.isHit(ball, zone)) {
        ball.zone = zone
      }
    }
  }
}

function updateBlocks() {
  var blockHitThisFrame
  var block
  var ball

  for (var a = 0; a < balls.length; a++) {
    ball = balls[a]
    for (var b = 0; b < ball.zone.blocks.length; b++) {
      block = ball.zone.blocks[b]
      if (!blockHitThisFrame && !block.isDestroyed()) {
        hitResult = hitTest.isHit(block, ball)
        if (hitResult) {
          block.takeDamage()
          blockHitThisFrame = true
          var correctionPos = hitTest.getOutsidePos(block, ball)
          block.color = '#333'
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

function update() {
  paddle.mouseMove(mouse)
  updateFps()
  updateBalls()
  updateBlocks()

  // work out where the ball is in relation to all other blocks
  // narrow down which ones could possibly be hit, using the grid they are placed?
}

function render() {
  var ball

  // clear
  stage.ctx.clearRect(0, 0, stage.w, stage.h)
  stage.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  stage.ctx.fillRect(0, 0, stage.w, stage.h)

  // fps
  stage.ctx.font = "12px Arial";
  stage.ctx.fillStyle = "#ccc";
  stage.ctx.fillText(fps, 30, 30);

  for (var z = 0; z < hitZones.length; z++) {
    stage.ctx.fillRect(hitZones[z].x, hitZones[z].y, 5, 5)
  }

  // paddle
  stage.ctx.fillStyle = '#ccc'
  stage.ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)

  // balls
  for (var b = 0; b < balls.length; b++) {
    ball = balls[b]
    // stage.ctx.fillStyle = '#ccc'
    // stage.ctx.fillRect(ball.x, ball.y, ball.w, ball.h)
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
}


function setupBlocks() {
  var hSpace = stage.w - (stage.gutter * 2)
  var vSpace = stage.h / 2
  var blockTemp = new blockFactory()
  var colTotal = parseInt(hSpace / blockTemp.w)
  var rowTotal = parseInt(vSpace / blockTemp.h)

  // temp
  // var block = new blockFactory()
  // block.x = hSpace / 2
  // block.y = vSpace / 2
  // return blocks.push(block)

  for (row = 1; row <= rowTotal; row++) {
    for (col = 1; col <= colTotal; col++) {
      var block = new blockFactory()
      block.x = (col * block.w)
      block.y = (row * block.h)
      blocks.push(block)
    }
  }
}
