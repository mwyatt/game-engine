module.exports = class Entity {
  
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

    // find out if entity is past left side?
    isPastLeft(entity) {

    }

    // isHit(entity) {
    //   return this.getTop() > entity.getTop()
    //     && this.getRight() < entity.getLeft()
    //     && this.getLeft() < entity.getRight()
    //     && this.getBottom < entity.getBottom()
    // }

    isHitTop(entity) {
      return entity.getBottom() >= this.getTop() && entity.getRight() >= this.getLeft() && entity.getLeft() <= this.getRight() && entity.getBottom() < this.getBottom()

      return this.getTop() > entity.getTop() && this.getRight() >= entity.getLeft() && this.getBottom() <= entity.getTop() && this.getLeft() <= entity.getRight()
    }

    // isHitRight(entity) {
    //   return this.getTop() >= entity.getBottom() && this.getRight() >= entity.getLeft() && this.getBottom() >= entity.getTop() && this.getLeft() < entity.getLeft()
    // }

    isHitBottom(entity) {
      return this.getTop() < entity.getTop() && this.getRight() >= entity.getLeft() && this.getBottom() >= entity.getTop() && this.getLeft() <= entity.getRight()
    }

    // isHitLeft(entity) {
    //   return this.getTop() <= entity.getBottom() && this.getRight() > entity.getRight() && this.getBottom() >= entity.getTop() && this.getLeft() >= entity.getRight()
    // }
}
