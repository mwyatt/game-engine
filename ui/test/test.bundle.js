var include = require('./include')
var requestFrameId
var framesPassed = 0
var enterpressed
loop()

document.addEventListener('keyup', function(event) {
  enterpressed = event.which == 13
})

function loop() {

  requestFrameId = window.requestAnimationFrame(loop)
  framesPassed ++
  console.log('passed -> ' + framesPassed)

  
  if (enterpressed) {
    console.log('cancel -> ' + framesPassed)
    window.cancelAnimationFrame(requestFrameId);
    // requestFrameId = undefined;
  }
}
