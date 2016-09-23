var Stage = {
  w: 800,
  h: 600
}

Stage.render = function(canvasElement, canvasContext) {
  canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height)
  canvasContext.fillStyle = '#eee'
  canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height)
}

module.exports = Stage
