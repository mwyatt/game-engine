var Mouse = {
  x: 0,
  vX: 0,
  vXHistory: 0
}

Mouse.storeVelocity = function() {
  this.vX = this.vXHistory - this.x;

  // look at the time passed going in one direction and how fast it has gone
  // vx should be at zero when still for a little while

  this.vXHistory = this.x;
}

module.exports = Mouse;
