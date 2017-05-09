var mouseFactory = function() {
  this.x = 0
  this.vX = 0
  this.vXHistory = 0

  this.storeVelocity = function() {
    mouseVX = mouseVXHistory - mouseX;

    // look at the time passed going in one direction and how fast it has gone
    // vx should be at zero when still for a little while

    mouseVXHistory = mouseX;
  }
}
