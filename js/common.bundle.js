var keysDown = {}
var core = require('./core')

core.init()
var canvasElement = core.getCanvasElement()

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true
}, false)

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode]
}, false)

document.body.appendChild(canvasElement)

core.loop()
