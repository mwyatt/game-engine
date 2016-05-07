var Entity = function() {
  this.w;
  this.h;
  this.x;
  this.y;
}

Entity.prototype.getTop = function() {
  return this.y;
}

Entity.prototype.getRight = function() {
  return this.x + this.w;
}

Entity.prototype.getBottom = function() {
  return this.y + this.h;
}

Entity.prototype.getLeft = function() {
  return this.x;
}

Entity.prototype.isHit = function(entity) {
  return this.getTop() > entity.getTop()
    && this.getRight() < entity.getLeft()
    && this.getLeft() < entity.getRight()
    && this.getBottom < entity.getBottom();
};

Entity.prototype.isHitTop = function(entity) {
  return entity.getBottom() >= this.getTop() && entity.getRight() >= this.getLeft() && entity.getLeft() <= this.getRight() && entity.getBottom() < this.getBottom();
}

Entity.prototype.isHitRight = function(entity) {
  return this.getTop() >= entity.getBottom() && this.getRight() >= entity.getLeft() && this.getBottom() >= entity.getTop() && this.getLeft() < entity.getLeft();
}

Entity.prototype.isHitBottom = function(entity) {
  return this.getTop() < entity.getTop() && this.getRight() >= entity.getLeft() && this.getBottom() <= entity.getTop() && this.getLeft() >= entity.getLeft();
}

Entity.prototype.isHitLeft = function(entity) {
  return this.getTop() <= entity.getBottom() && this.getRight() > entity.getRight() && this.getBottom() >= entity.getTop() && this.getLeft() >= entity.getRight();
}

module.exports = Entity;
