var Mouse = function() {
  this.x = 0;
  this.y = 0;
  this.vX = 0;
  this.vXHistory = 0;
}

Mouse.prototype.storeVelocity = function() {
  mouse.vX = mouse.vXHistory - mouse.x;
  mouse.vXHistory = mouse.x;
}

module.exports = Mouse;
