var hitTest = require('./hittest')

var ballFactory = function() {
  this.type = 'ball'
  this.lives = 1
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
    if (!stage.pause.isPaused && this.isAlive()) {
      this.updateHitZone(stage.hitZones)
      this.moveVelocity(stage.time.delta)
      this.hitStage(stage)
      this.hitPaddle(stage)
    }
  },

  this.isAlive = function() {
    return this.lives > 0
  }

  this.updateHitZone = function(hitZones) {
    var zone
    for (var z = 0; z < hitZones.length; z++) {
      zone = hitZones[z]
      if (hitTest.isHit(this, zone)) {
        this.zone = zone
      }
    }
  },

  this.render = function(stage) {
    if (this.isAlive()) {
      stage.ctx.fillStyle = 'hsla(0, 80%, 60%, 1)'
      stage.ctx.beginPath()
      stage.ctx.arc(this.x + (this.w / 2), this.y + (this.h / 2), this.w / 2, 0, Math.PI * 2, true)
      stage.ctx.fill()
    }
  }

  this.hitPaddle = function(stage) {
    var paddles = stage.getSceneryByType('paddle')
    var paddle = paddles[0]
    if (!paddle) {
      return
    }
    var result = hitTest.isHit(paddle, this)
    if (result) {
      var maxSpin = 10
      var correctionPos = hitTest.getOutsidePos(paddle, this)
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

    // damage taken
    if (hitTest.getBottom(this) == stage.h) {
      this.lives --
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

module.exports = ballFactory
