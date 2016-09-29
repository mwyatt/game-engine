var keysDown = []
var timeDelta
var canvas
var canvasCtx
var Core = {
  w: 640,
  h: 480
}

Core.setCanvasAndCtx = function(element) {
  canvas = element
  canvasCtx = element.getContext('2d')
}

Core.getCanvas = function() {
  return canvas
}

Core.getCanvasCtx = function() {
  return canvasCtx
}

Core.getKeyDown = function(keyCode) {
  return keysDown[keyCode]
}

Core.setKeyDown = function(keyCode) {
  return keysDown[keyCode] = true
}

Core.removeKeyDown = function(keyCode) {
  delete keysDown[keyCode]
}

Core.getTimeDelta = function() {
  return timeDelta
}

Core.setTimeDelta = function(value) {
  timeDelta = value
}

module.exports = Core
