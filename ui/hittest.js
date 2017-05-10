var hitTest = {
  hitTop: 1,
  hitRight: 2,
  hitBottom: 3,
  hitLeft: 4,

  getTop: function(el1) {
    return el1.y
  },

  getRight: function(el1) {
    return el1.x + el1.w
  },

  getBottom: function(el1) {
    return el1.y + el1.h
  },

  getLeft: function(el1) {
    return el1.x
  },

  isInsideTopAndBottom: function(el1, el2) {
    return this.getTop(el1) <= this.getBottom(el2) && this.getBottom(el1) >= this.getTop(el2)
  },

  isInsideLeftAndRight: function(el1, el2) {
    return this.getLeft(el1) <= this.getRight(el2) && this.getRight(el1) >= this.getLeft(el2)
  },

  // isHit: function(el1, el2) {
  //   if (this.isHitTop(el1, el2)) {
  //     return this.hitTop
  //   } else if (this.isHitBottom(el1, el2)) {
  //     return this.hitBottom
  //   } else if (this.isHitRight(el1, el2)) {
  //     return this.hitRight
  //   } else if (this.isHitLeft(el1, el2)) {
  //     return this.hitLeft
  //   } 
  // },

  isHit: function(el1, el2) {
    return el1.x < el2.x + el2.w && el1.x + el1.w > el2.x && el1.y < el2.y + el2.h && el1.h + el1.y > el2.y
  },

  // which side is this closest to?
  getOutsidePos: function(el1, el2) {
    var hitTop = this.isHitTop(el1, el2)
    var hitRight = this.isHitRight(el1, el2)
    var hitBottom = this.isHitBottom(el1, el2)
    var hitLeft = this.isHitLeft(el1, el2)
    var intersect = {}
    var hitSides = {w: 0, h: 0}
    var correctionPos = {x: el2.x, y: el2.y}

    // only two of these is possible
    if (hitTop) {
      hitSides.h = this.hitTop
      intersect.h = this.getBottom(el2) - this.getTop(el1)
    }
    if (hitLeft) {
      hitSides.w = this.hitLeft
      intersect.w = this.getRight(el2) - this.getLeft(el1)
    }
    if (hitBottom) {
      hitSides.h = this.hitBottom
      intersect.h = this.getBottom(el1) - this.getTop(el2)
    }
    if (hitRight) {
      hitSides.w = this.hitRight
      intersect.w = this.getRight(el1) - this.getLeft(el2)
    }
    if (intersect.w > intersect.h) {
      correctionPos.direction = 'v'
      if (hitSides.h === this.hitTop) {
        correctionPos.y = el1.y - el2.h
      } else {
        correctionPos.y = this.getBottom(el1)
      }
    } else {
      correctionPos.direction = 'h'
      if (hitSides.w === this.hitLeft) {
        correctionPos.x = el1.x - el2.w
      } else {
        correctionPos.x = this.getRight(el1)
      }
    }
    return correctionPos
  },

  isHitTop: function(el1, el2) {
    return this.getTop(el1) <= this.getBottom(el2) && this.isInsideLeftAndRight(el1, el2) && this.getBottom(el1) > this.getBottom(el2)
  },

  isHitRight: function(el1, el2) {
    return this.getRight(el1) >= this.getLeft(el2) && this.isInsideTopAndBottom(el1, el2) && this.getLeft(el1) < this.getLeft(el2)
  },

  isHitBottom: function(el1, el2) {
    return this.getBottom(el1) >= this.getTop(el2) && this.isInsideLeftAndRight(el1, el2) && this.getTop(el1) < this.getTop(el2)
  },

  isHitLeft: function(el1, el2) {
    return this.getLeft(el1) <= this.getRight(el2) && this.isInsideTopAndBottom(el1, el2) && this.getRight(el1) > this.getRight(el2)
  },
}
