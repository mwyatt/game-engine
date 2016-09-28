var keysDown = []
var timeDelta
var Core = {
  w: 640,
  h: 480
}

Core.getKeyDown = function(keyCode) {
  return keysDown[keyCode]
}

Core.setKeyDown = function(keyCode) {
  console.log(keysDown)
  return keysDown[keyCode] = true
}

Core.removeKeyDown = function(keyCode) {
  delete keysDown[keyCode]
}

Core.getTimeDelta = function() {
  return timeDelta
}

module.exports = Core
