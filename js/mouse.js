var Mouse = {
  x: 0,
  vX: 0,
  vXHistory: 0
}

Mouse.storeVelocity = function() {
  this.vX = this.vXHistory - this.x;
  this.vXHistory = this.x;
}

module.exports = Mouse;
