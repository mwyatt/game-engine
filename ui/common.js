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

var ballFactory = function() {
  this.vMaxPositive = .35
  this.vMaxNegative = -.35
  this.spinDuration = 0

  this.w = 14
  this.h = 14
  this.radius = this.w / 2
  this.x = 0
  this.y = 0
  this.vX = 0
  this.vY = this.vMaxNegative
  this.spin = 0

  this.contactPaddle = function(paddle) {
    var hitresult = hitTest.ishit(paddle, this)
    if (hitresult == this.hittop || hitresult == this.hitleft || hitresult == this.hitright) {

      // ball go up
      if (this.vy > 0) {
        this.vy = -this.vy
      }

      // ball always above paddle
      if (this.getbottom() > paddle.gettop()) {
        this.y = paddle.y - paddle.h
      }

      // max spin 
      var mousevx = mouse.getvx()
      this.spin = mousevx > 10 ? 10 : mousevx
      this.spin = mousevx < -10 && mousevx < 0 ? -10 : this.spin

      var spinpositive = this.spin < 0 ? -this.spin : this.spin

      // reset vx if trying to spin
      if (spinpositive > 2) {
        this.vx = 0
      }

      this.spinduration = (spinpositive / 2) * 100
    }
  }

  this.bounceVertical = function() {
    this.vY = -this.vY
  }

  this.bounceHorisontal = function() {
    this.vX = -this.vX
  }

  this.hitStage = function() {

    // ball outside of play area?
    if (hitTest.getRight(this) > stageWidth) {
      this.x = stageWidth - this.w
    } else if (hitTest.getLeft(this) < 0) {
      this.x = 0
    } else if (hitTest.getTop(this) < 0) {
      this.y = 0
    } else if (hitTest.getBottom(this) > stageHeight) {
      this.y = stageHeight - this.w
    }

    // if this strikes the vertical walls
    if (hitTest.getRight(this) == stageWidth) {
      this.vX = -this.vX
    } else if (hitTest.getLeft(this) == 0) {
      this.vX = -this.vX
    }

    // if this strikes the horizontal walls
    if (hitTest.getBottom(this) == stageHeight) {
      this.vY = -this.vY
    } else if (hitTest.getTop(this) == 0) {
      this.vY = -this.vY
    }
  }

  this.moveVelocity = function() {
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
    ballG.x = this.x
    ballG.y = this.y
  }
}

var stageGutter = 20
var log = console.log
var timeThen = Date.now()
var timeNow
var timeDelta
var stageWidth = 640
var stageHeight = 480
var ballG = new PIXI.Graphics();
var renderer = new PIXI.WebGLRenderer(stageWidth, stageHeight, {backgroundColor : 0xefefef});
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var ballO = new ballFactory()

renderGame()
gameLoop()

function gameLoop() {
  requestAnimationFrame(gameLoop)

  timeNow = Date.now()
  timeDelta = timeNow - timeThen
  timeThen = timeNow

  update()

  //Render the stage to see the animation
  renderer.render(stage);
}

//Start the game loop

function renderGame() {
  renderBlocks()

  var quarterStageH = ((stageHeight / 2) / 2)
  ballO.x = (stageWidth / 2) - (ballO.w / 2)
  ballO.y = (quarterStageH * 3) -(ballO.h / 2)
  ballG.beginFill(0x666666);
  ballG.drawRect(ballO.x, ballO.y, ballO.w, ballO.h);
  ballG.endFill();
  stage.addChild(ballG);
}

function update() {
  ballO.moveVelocity()
}

function renderBlocks() {
  var blockTemplate = getBlockTemplate()
  var hSpace = stageWidth - (stageGutter * 2)
  var vSpace = stageHeight / 2
  var colTotal = parseInt(hSpace / blockTemplate.w)
  var rowTotal = parseInt(vSpace / blockTemplate.h)
  for (row = 1; row <= rowTotal; row++) {
    for (col = 1; col <= colTotal; col++) {
      renderBlock(row, col)
    }
  }
}

function renderBlock(row, col) {
  var blockT = getBlockTemplate()
  blockT.x = (col * blockT.w)
  blockT.y = (row * blockT.h)
  var blockG = new PIXI.Graphics();
  blockG.beginFill(0xcccccc);
  blockG.drawRect(blockT.x, blockT.y, blockT.w, blockT.h);
  blockG.endFill();
  stage.addChild(blockG);
}

// will this be a unique object?
function getBlockTemplate() {
  return {
    x: 0,
    y: 0,
    w: 20,
    h: 20,
  }
}
