var ballFactory = ballFactory
var buttonFactory = buttonFactory
var mouseFactory = mouseFactory
var blockFactory = blockFactory
var paddleFactory = paddleFactory
var stage = {
  canvasEl: '',
  canvasRect: '',
  ctx: '',
  time: {delta: 0, passed: 0},
  w: 640,
  h: 480,
  gutter: 20,
  mouse: new mouseFactory(),
  keysDown: {},
  hitZones: [],

  // does not feel good being here
  balls: [],
  paddle: '',
}
var hitTest = hitTest
var timeThen = Date.now()
var timeNow
var scenery = []
var blocks = []
var frameInfo = []
var fps = 0

setupStage()
setupEvents()
setupSceneMenu()
// setupSceneLevel()
loop()

function clearScenery() {
  scenery.splice(0, scenery.length)
}

function setupSceneMenu() {
  var buttonPlay = new buttonFactory()
  var buttonX = stage.w / 2 - buttonPlay.w / 2
  buttonPlay.x = buttonX
  buttonPlay.y = 20
  buttonPlay.text = 'Option1'
  buttonPlay.action = function() {
    clearScenery()
    setupSceneLevel()
  }

  var buttonOptions = new buttonFactory()
  buttonOptions.x = buttonX
  buttonOptions.y = 20 + 10 + buttonPlay.h
  buttonOptions.text = 'Option2'
  buttonOptions.action = function() {
    clearScenery()
    setupSceneOptions()
  }

  var buttonGroup = {
    buttons: [buttonPlay, buttonOptions],
    selectedIndex: 0,
    navCodes: [38, 40, 13],
    keyTimesDepressedCache: {
      38: 0,
      40: 0,
      13: 0,
    },
    render: function() {
      for (var b = 0; b < this.buttons.length; b++) {
        this.buttons[b].render()
      }
    },
    update: function() {
      for (var b = 0; b < this.buttons.length; b++) {
        this.buttons[b].selected = 0
      }
      this.buttons[this.selectedIndex].selected = 1
      var navCode
      for (var b = 0; b < this.navCodes.length; b++) {
        navCode = this.navCodes[b]
        if (navCode in stage.keysDown) {
          if (this.keyTimesDepressedCache[navCode] != stage.keysDown[navCode].time.depressed) {
            if (navCode == 40) {
              this.selectedIndex ++
            } else if (navCode == 38) {
              this.selectedIndex --
            }
            if (this.selectedIndex < 0) {
              this.selectedIndex = 0
            }
            if (this.selectedIndex > this.buttons.length - 1) {
              this.selectedIndex = this.buttons.length - 1
            }
            if (navCode == 13) {
              this.buttons[this.selectedIndex].action()
            }
            this.keyTimesDepressedCache[navCode] = stage.keysDown[navCode].time.depressed
          }
        }
      }
    },
  }
  scenery.push(buttonGroup)
}

function setupSceneLevel() {
  setupPaddle()
  setupBalls()
  setupBlocks()
  setupZones()
  // score?
}

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
var division = 5
var divisionW = stage.w / division
var divisionH = stage.h / division
var block
var zone

for (var c = 0; c < division; c++) {
  for (var r = 0; r < division; r++) {
    stage.hitZones.push({
      x: divisionW * c,
      y: divisionH * r,
      w: divisionW,
      h: divisionH,
      blocks: [],
      render: function() {
        stage.ctx.fillRect(this.x, this.y, 5, 5)
      }
    })
  }
}

for (var b = 0; b < blocks.length; b++) {
  block = blocks[b]
  for (var z = 0; z < stage.hitZones.length; z++) {
    zone = stage.hitZones[z]
    if (hitTest.isHit(block, zone)) {
      zone.blocks.push(block)
    }
  }
}
}

function setupEvents() {
  addEventListener('keydown', function (event) {
    if (event.keyCode in stage.keysDown == false) {
      stage.keysDown[event.keyCode] = {
        code: event.keyCode,
        time: {depressed: stage.time.passed}
      }
    }
  }, false)

  addEventListener('keyup', function (event) {
    var leaveCode = event.keyCode
    delete stage.keysDown[leaveCode]
  }, false)

  stage.canvasEl.addEventListener('mousemove', function(e) {
    stage.mouse.x = e.clientX - stage.canvasRect.left
    stage.mouse.y = e.clientY - stage.canvasRect.bottom
    stage.mouse.storeVelocity()
  }, false)
}

function setupBalls() {
  var balls = [
    new ballFactory(),
  ]
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
    stage.balls.push(ball)
    scenery.push(ball)
  }
}

function setupPaddle() {
  var paddle = new paddleFactory()
  var quarterStageH = ((stage.h / 2) / 2)
  var vpos = (quarterStageH * 3) + (quarterStageH / 2) - (paddle.h / 2)

  paddle.x = (stage.w / 2) - (paddle.w / 2)
  paddle.y = vpos
  stage.paddle = paddle
  scenery.push(paddle)
}

function loop() {
  timeNow = Date.now()
  stage.time.delta = timeNow - timeThen
  stage.time.passed += stage.time.delta
  update()
  render()
  timeThen = timeNow
  window.requestAnimationFrame(loop)
}

function updateFps() {
  frameInfo.push(stage.time.delta)
  var frameTime = 0
  for (var f = 0; f < frameInfo.length; f++) {
    frameTime += frameInfo[f]
  }
  if (frameTime > 1000) {
    fps = frameInfo.length
    frameInfo = []
  }
}

function update() {
  updateFps()

  for (var s = 0; s < scenery.length; s++) {
    scenery[s].update(stage)
  }
}

function render() {

  // clear
  stage.ctx.clearRect(0, 0, stage.w, stage.h)
  stage.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  stage.ctx.fillRect(0, 0, stage.w, stage.h)

  // fps
  stage.ctx.font = "12px Arial";
  stage.ctx.fillStyle = "#666";
  stage.ctx.fillText(fps, stage.w - 30, stage.h - 30);
  
  for (var s = 0; s < scenery.length; s++) {
    scenery[s].render(stage)
  }
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
      scenery.push(block)
    }
  }
}
