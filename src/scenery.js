var stage = require('./stage')
var level = require('./scenery/level')
var scenery = {}
var buttonFactory = require('./temp/button')
var buttonGroupFactory = require('./temp/buttonGroup')
var fps = require('./fps')

scenery.setupMenu = function() {
  var button = {
    w: 150,
    h: 90,
    update: function(stage) {
      if (stage.keyCodes.enter in stage.keysDown) {
        level.setup()
      }
    },
    render: function(stage) {
      stage.ctx.fillRect(this.x, this.y, this.w, this.h)
      var fontSize = 32
      stage.ctx.font = fontSize + "px Arial";
      stage.ctx.fillStyle = "#ccc";
      stage.ctx.textAlign = "center";
      stage.ctx.textBaseline = "middle"
      var x = this.x + this.w / 2
      var y = this.y + (this.h / 2)
      stage.ctx.fillText(this.text, x, y);
    }
  }
  button.x = stage.w / 2 - button.w / 2
  button.y = stage.h / 2 - button.h / 2
  button.text = 'Hit enter to start'
  // button.action = function() {
  //   setupLevel()
  // }

  stage.scenery.add(button)
  // stage.scenery.add(fps)
}

scenery.renderStage = function() {
  stage.canvasEl = document.createElement('canvas')
  stage.canvasEl.style.cursor = 'none'
  stage.canvasEl.width = stage.w
  stage.canvasEl.height = stage.h
  stage.canvasRect = stage.canvasEl.getBoundingClientRect()
  document.body.appendChild(stage.canvasEl)
  stage.ctx = stage.canvasEl.getContext('2d')
}

scenery.setupEvents = function() {
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
    if (event.keyCode == stage.keyCodes.f2) {

      // time to party?
      stage.canvasEl.webkitRequestFullscreen()
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

module.exports = scenery
