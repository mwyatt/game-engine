var Mouse = {}
var mouseX = 0
var mouseVX = 0
var mouseVXHistory = 0

Mouse.getX = function() {
  return mouseX
}

Mouse.setX = function(value) {
  mouseX = value
}

Mouse.getVX = function() {
  return mouseVX
}

Mouse.storeVelocity = function() {
  mouseVX = mouseVXHistory - mouseX;

  // look at the time passed going in one direction and how fast it has gone
  // vx should be at zero when still for a little while

  mouseVXHistory = mouseX;
}

module.exports = Mouse;
