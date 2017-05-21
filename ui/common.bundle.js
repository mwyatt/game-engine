var requestFrameId
var stage = require('./stage')
var scenery = require('./scenery')
var timeThen = Date.now()
var timeNow

scenery.setupStage()
scenery.setupEvents()
scenery.setupSceneLogo()
loop()

function loop() {
  timeNow = Date.now()
  stage.time.delta = timeNow - timeThen
  stage.time.passed += stage.time.delta
  update()
  render()
  timeThen = timeNow
  requestFrameId = window.requestAnimationFrame(loop)
}

function update() {
  for (var s = 0; s < stage.scenery.length; s++) {
    stage.scenery[s].update(stage)
  }
}

function render() {

  // clear
  stage.ctx.clearRect(0, 0, stage.w, stage.h)
  stage.ctx.fillStyle = 'hsl(189, 20%, 90%)'
  stage.ctx.fillRect(0, 0, stage.w, stage.h)
  
  for (var s = 0; s < stage.scenery.length; s++) {
    stage.scenery[s].render(stage)
  }
}
