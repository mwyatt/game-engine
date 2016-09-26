var keysDown = {}
var stage = require('./stage')

stage.init()
var canvasElement = stage.getCanvasElement()

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true
}, false)

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode]
}, false)

document.body.appendChild(canvasElement)

stage.loop()
