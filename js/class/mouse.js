var Mouse = function() {
  this.x = 0;
  this.y = 0;
  this.vX = 0;
  this.vXHistory = 0;
}

Mouse.prototype.storeVelocity = function() {
  this.vX = this.vXHistory - this.x;
  this.vXHistory = this.x;
}

module.exports = Mouse;
