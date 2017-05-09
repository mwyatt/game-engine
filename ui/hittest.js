var hitTest = {
  hitTop: 1,
  hitRight: 2,
  hitBottom: 3,
  hitLeft: 4,
  getTop: function(el) {
    return el.y
  },
  getRight: function(el) {
    return el.x + el.w
  },
  getBottom: function(el) {
    return el.y + el.h
  },
  getLeft: function(el) {
    return el.x
  },
  isInsideTopAndBottom: function(el, el2) {
    return this.getTop(el) <= this.getBottom(el2) && this.getBottom(el) >= this.getTop(el2)
  },
  isInsideLeftAndRight: function(el, el2) {
    return this.getLeft(el) <= this.getRight(el2) && this.getRight(el) >= this.getLeft(el2)
  },
  isHit: function(el, el2) {
    if (this.isHitTop(el, el2)) {
      return this.hitTop
    } else if (this.isHitBottom(el, el2)) {
      return this.hitBottom
    } else if (this.isHitRight(el, el2)) {
      return this.hitRight
    } else if (this.isHitLeft(el, el2)) {
      return this.hitLeft
    } 
  },
  isHitTop: function(el, el2) {
    return this.getTop(el) <= this.getBottom(el2) && this.isInsideLeftAndRight(el, el2) && this.getBottom(el) > this.getBottom(el2)
  },
  isHitRight: function(el, el2) {
    return this.getRight(el) >= this.getLeft(el2) && this.isInsideTopAndBottom(el, el2) && this.getLeft(el) < this.getLeft(el2)
  },
  isHitBottom: function(el, el2) {
    return this.getBottom(el) >= this.getTop(el2) && this.isInsideLeftAndRight(el, el2) && this.getTop(el) < this.getTop(el2)
  },
  isHitLeft: function(el, el2) {
    return this.getLeft(el) <= this.getRight(el2) && this.isInsideTopAndBottom(el, el2) && this.getRight(el) > this.getRight(el2)
  },
}
