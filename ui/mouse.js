var mouseFactory = function() {
  this.x = 0
  this.y = 0
  this.vX = 0
  this.vXHistory = 0

  this.storeVelocity = function() {
    // this.vX = this.vXHistory - this.x;

    // look at the time passed going in one direction and how fast it has gone
    // vx should be at zero when still for a little while

    this.vXHistory = this.x;
  }
}

module.exports = mouseFactory
