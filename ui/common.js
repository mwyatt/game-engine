var requestFrameId
var ballFactory = ballFactory
var buttonFactory = buttonFactory
var buttonGroupFactory = buttonGroupFactory
var mouseFactory = mouseFactory
var blockFactory = blockFactory
var paddleFactory = paddleFactory
var sceneryId = 0
var endConditionMet = 0
var keyCodes = {
  a: 65,
  d: 68,
  enter: 13,
  numpad: {
    minus: 109,
    plus: 107
  },
  down: 40,
  up: 38,
  esc: 27,
  backspace: 8,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  minus: 189,
  plus: 187,
  tab: 9 // works as android enter / next
}
var stage = {
  getNewId: function(){
    return sceneryId++
  },
  canvasEl: '',
  canvasRect: '',
  ctx: '',
  time: {delta: 0, passed: 0},
  w: 480,
  h: 320,
  gutter: 20,
  mouse: new mouseFactory(),
  keysDown: {},
  keyCodes: keyCodes,
  hitZones: [],
  scenery: [],
  pause: {
    isPaused: '',
    possible: '',
  },

  getSceneryByType: function(type) {
    var scenery = []
    for (var s = 0; s < this.scenery.length; s++) {
      if ('type' in this.scenery[s] && this.scenery[s].type == type) {
        scenery.push(this.scenery[s])
      }
    }
    return scenery
  },
}
var hitTest = hitTest
var timeThen = Date.now()
var timeNow
var frameInfo = []
var fps = 0

setupStage()
setupEvents()
setupSceneMenu()
loop()

function clearScenery() {
  stage.hitZones = []
  stage.scenery = []
}

function setupSceneMenu() {
  var buttonPlay = new buttonFactory()
  var buttonX = stage.w / 2 - buttonPlay.w / 2
  buttonPlay.x = buttonX
  buttonPlay.y = stage.h / 2 - ((buttonPlay.h * 2 + 10) / 2)
  buttonPlay.text = 'Play'
  buttonPlay.action = function() {
    clearScenery()
    setupSceneLevel()
  }

  // var buttonOptions = new buttonFactory()
  // buttonOptions.x = buttonX
  // buttonOptions.y = buttonPlay.y + buttonPlay.h + 10
  // buttonOptions.text = 'Op2'
  // buttonOptions.action = function() {
  //   clearScenery()
  //   setupSceneOptions()
  // }

  var buttonGroup = new buttonGroupFactory()
  buttonGroup.buttons.push(buttonPlay)
  // buttonGroup.buttons.push(buttonOptions)

  stage.scenery.push(buttonGroup)
}

function setupSceneLevel() {
  setupEndCondition()
  setupPaddle()
  setupBalls()
  setupBlocks()
  setupZones()
  setupPauseOption()
  // score?
}

function setupEndCondition() {
  var endCondition = {
    update: function() {
      var balls = stage.getSceneryByType('ball')
      var livesLeft = 0
      for (var b = 0; b < balls.length; b++) {
        livesLeft += balls[b].lives
      }
      if (livesLeft < 1) {
        endConditionMet = 1
        stage.scenery.push({
          update: function() {
            stage.ctx.fillStyle = 'hsla(100, 40%, 50%, 0.7)'
            stage.ctx.fillRect(0, 0, stage.w, stage.h)
            stage.ctx.font = "32px Arial";
            stage.ctx.fillStyle = "hsl(189, 79%, 93%)";
            stage.ctx.textAlign = "center";
            stage.ctx.textBaseline = "middle"
            var x = stage.w / 2
            var y = stage.h / 2
            stage.ctx.fillText('Game Over', x, y);
          },
          render: function() {}
        })
      }
    },
    render: function() {},
  }
  stage.scenery.push(endCondition)
}

function setupPauseOption() {
  stage.pause.possible = true
  var pause = {
    update: function() {},
    render: function(stage) {
      if (stage.pause.isPaused) {
        stage.ctx.fillStyle = 'hsla(100, 40%, 50%, 0.7)'
        stage.ctx.fillRect(0, 0, stage.w, stage.h)
        stage.ctx.font = "32px Arial";
        stage.ctx.fillStyle = "hsl(189, 79%, 93%)";
        stage.ctx.textAlign = "center";
        stage.ctx.textBaseline = "middle"
        var x = stage.w / 2
        var y = stage.h / 2
        stage.ctx.fillText('Paused', x, y);
      }
    },
  }
  stage.scenery.push(pause)
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
  var blocks = stage.getSceneryByType('block')

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
  window.addEventListener('keydown', function (event) {
    var keyConfig
    if (event.keyCode in stage.keysDown == false) {
      keyConfig = {
        code: event.keyCode,
        time: {depressed: stage.time.passed}
      }
      stage.keysDown[event.keyCode] = keyConfig

      if (stage.keyCodes.esc == keyConfig.code && stage.pause.possible) {
        stage.pause.isPaused = stage.pause.isPaused ? 0 : 1
      }
    }
  }, false)

  window.addEventListener('keyup', function (event) {
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
    stage.scenery.push(ball)
  }
}

function setupPaddle() {
  var paddle = new paddleFactory()
  var quarterStageH = ((stage.h / 2) / 2)
  var vpos = (quarterStageH * 3) + (quarterStageH / 2) - (paddle.h / 2)

  paddle.x = (stage.w / 2) - (paddle.w / 2)
  paddle.y = vpos
  stage.scenery.push(paddle)
}

function loop() {
  requestFrameId = window.requestAnimationFrame(loop)
  timeNow = Date.now()
  stage.time.delta = timeNow - timeThen
  stage.time.passed += stage.time.delta

  if (endConditionMet) {
    stage.pause.isPaused = true
    // window.cancelAnimationFrame(requestFrameId)
    // clearScenery()
    // setupSceneMenu()
    // endConditionMet = 0
    // loop()
  }

  update()
  render()
  timeThen = timeNow
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
  for (var s = 0; s < stage.scenery.length; s++) {
    stage.scenery[s].update(stage)
  }
}

function render() {

  // clear
  stage.ctx.clearRect(0, 0, stage.w, stage.h)
  stage.ctx.fillStyle = 'hsl(189, 20%, 90%)'
  stage.ctx.fillRect(0, 0, stage.w, stage.h)

  // fps
  stage.ctx.font = "11px Verdana";
  stage.ctx.fillStyle = "hsl(189, 20%, 70%)";
  stage.ctx.fillText(fps, stage.w - 20, stage.h - 20);
  
  for (var s = 0; s < stage.scenery.length; s++) {
    stage.scenery[s].render(stage)
  }
}

function setupBlocks() {
  var hSpace = stage.w - (stage.gutter * 2)
  var vSpace = stage.h / 2
  var blockTemp = new blockFactory()
  var colTotal = parseInt(hSpace / blockTemp.w)
  var rowTotal = parseInt(vSpace / blockTemp.h)
  var oneTo10

  // temp
  // var block = new blockFactory()
  // block.x = hSpace / 2
  // block.y = vSpace / 2
  // return blocks.push(block)

  for (row = 1; row <= rowTotal; row++) {
    for (col = 1; col <= colTotal; col++) {
      var block = new blockFactory()
      oneTo10 = Math.floor(Math.random() * (11 - 1) + 1)
      if (oneTo10 < 3) {
        block.power = 'newBall'
      } else if (oneTo10 < 6) {
        block.power = 'paddleShrink'
      } else if (oneTo10 < 10) {
        block.power = 'paddleExpand'
      }

      block.x = (col * block.w)
      block.y = (row * block.h)
      stage.scenery.push(block)
    }
  }
}
