module.exports = class Entity {
  
  constructor() {
    this.hitTop = 1
    this.hitRight = 2
    this.hitBottom = 3
    this.hitLeft = 4
  }

  getTop() {
    return this.y
  }

  getRight() {
    return this.x + this.w
  }

  getBottom() {
    return this.y + this.h
  }

  getLeft() {
    return this.x
  }

  isInsideTopAndBottom(entity) {
    return this.getTop() <= entity.getBottom() && this.getBottom() >= entity.getTop()
  }

  isInsideLeftAndRight(entity) {
    return this.getLeft() <= entity.getRight() && this.getRight() >= entity.getLeft()
  }

  isHit(entity) {
    if (this.isHitTop(entity)) {
      return this.hitTop
    } else if (this.isHitBottom(entity)) {
      return this.hitBottom
    } else if (this.isHitRight(entity)) {
      return this.hitRight
    } else if (this.isHitLeft(entity)) {
      return this.hitLeft
    } 
  }

  isHitTop(entity) {
    return this.getTop() <= entity.getBottom() && this.isInsideLeftAndRight(entity) && this.getBottom() > entity.getBottom()
  }

  isHitRight(entity) {
    return this.getRight() >= entity.getLeft() && this.isInsideTopAndBottom(entity) && this.getLeft() < entity.getLeft()
  }

  isHitBottom(entity) {
    return this.getBottom() >= entity.getTop() && this.isInsideLeftAndRight(entity) && this.getTop() < entity.getTop()
  }

  isHitLeft(entity) {
    return this.getLeft() <= entity.getRight() && this.isInsideTopAndBottom(entity) && this.getRight() > entity.getRight()
  }
}
