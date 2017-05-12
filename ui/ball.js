var hitTest = hitTest

var ballFactory = function() {
  this.type = 'ball'
  this.vMaxPositive = .35
  this.vMaxNegative = -.35
  this.timeCreated = Date.now()

  this.spin = 0
  this.spinDuration = 0

  this.w = 12
  this.h = 12
  this.radius = this.w / 2
  this.x = 0
  this.y = 0
  this.vX = 0
  this.vY = 0
  this.zone

  this.update = function(stage) {
    var zone
    this.moveVelocity(stage.time.delta)
    this.hitStage(stage)
    this.hitPaddle(stage)
    for (var z = 0; z < stage.hitZones.length; z++) {
      zone = stage.hitZones[z]
      if (hitTest.isHit(this, zone)) {
        this.zone = zone
      }
    }
  },

  this.render = function(stage) {
    stage.ctx.fillStyle = 'hsla(0, 80%, 60%, 1)'
    stage.ctx.beginPath()
    stage.ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 2, 0, Math.PI * 2, true)
    stage.ctx.fill()
  }

  this.hitPaddle = function(stage) {
    var result = hitTest.isHit(stage.paddle, this)
    if (result) {
      var maxSpin = 10
      var correctionPos = hitTest.getOutsidePos(stage.paddle, this)
      this.x = correctionPos.x
      this.y = correctionPos.y
      if (correctionPos.direction == 'v') {
        this.bounceVertical()
      } else {
        this.bounceHorisontal()
      }
      
      // max spin cap
      this.spin = stage.mouse.vX > maxSpin ? maxSpin : stage.mouse.vX
      this.spin = stage.mouse.vX < -maxSpin && stage.mouse.vX < 0 ? -maxSpin : this.spin

      var spinPositive = this.spin < 0 ? -this.spin : this.spin

      // reset vx if trying to spin
      // wont seem natural?
      if (spinPositive > 2) {
        this.vx = 0
      }
      this.spinDuration = parseInt((spinPositive / 2) * 100)
    }
  }

  this.bounceVertical = function() {
    this.vY = -this.vY
  }

  this.bounceHorisontal = function() {
    this.vX = -this.vX
  }

  this.hitStage = function(stage) {

    // ball outside of play area?
    if (hitTest.getRight(this) > stage.w) {
      this.x = stage.w - this.w
    } else if (hitTest.getLeft(this) < 0) {
      this.x = 0
    } else if (hitTest.getTop(this) < 0) {
      this.y = 0
    } else if (hitTest.getBottom(this) > stage.h) {
      var balls = stage.getSceneryByType('ball')
      for (var b = 0; b < balls.length; b++) {
        if (balls[b].timeCreated == this.timeCreated) {
          balls.splice(b, 1)
        }
      }
      for (var s = 0; s < stage.scenery.length; s++) {
        if ('type' in stage.scenery[s] && stage.scenery[s].timeCreated == this.timeCreated) {
          stage.scenery.splice(s, 1)
        }
      }
      this.y = stage.h - this.w
    }

    // if this strikes the vertical walls
    if (hitTest.getRight(this) == stage.w) {
      this.vX = -this.vX
    } else if (hitTest.getLeft(this) == 0) {
      this.vX = -this.vX
    }

    // if this strikes the horizontal walls
    if (hitTest.getBottom(this) == stage.h) {
      this.vY = -this.vY
    } else if (hitTest.getTop(this) == 0) {
      this.vY = -this.vY
    }
  }

  this.moveVelocity = function(timeDelta) {
    if (this.spinDuration > 0) {
      this.spinDuration -= timeDelta
      var spinPositive = this.spin < 0 ? -this.spin : this.spin
      var spinAmount = (timeDelta / 10000) * spinPositive
      if (this.spin > 0) {
        this.vX += spinAmount
      } else {
        this.vX -= spinAmount
      }
    }

    // throttle v
    if (this.vX > 0 && this.vX > this.vMaxPositive) {
      this.vX = this.vMaxPositive
    } else if (this.vX < 0 && this.vX < this.vMaxNegative) {
      this.vX = this.vMaxNegative
    }

    this.x += Math.round(this.vX * timeDelta)
    this.y += Math.round(this.vY * timeDelta)
  }
}
