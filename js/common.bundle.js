var canvasElement
var mouse = require('./mouse')
var stage = require('./stage')
var core = require('./core')

// canvas
canvasElement = document.createElement('canvas')
canvasElement.style.cursor = 'none'
canvasElement.width = core.w
canvasElement.height = core.h
document.body.appendChild(canvasElement)
core.setCanvasAndCtx(canvasElement)

addEventListener('keydown', function (e) {
  core.setKeyDown(e.keyCode)
}, false)

addEventListener('keyup', function (e) {
  core.removeKeyDown(e.keyCode)
}, false)

canvasElement.addEventListener('mousemove', function(e) {
  var rect = canvasElement.getBoundingClientRect()
  mouse.setX(e.clientX - rect.left)
  mouse.storeVelocity()
}, false)

stage.loadMenu()
