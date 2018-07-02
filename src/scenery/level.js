var level = {}
var stage = require('../stage')
var fps = require('../fps')
var shipFactory = require('../ship')
// var hitTest = require('./hittest')
// var ballFactory = require('./ball')
// var blockFactory = require('./block')

level.setup = function() {
  stage.scenery.clear()
  // setupEndCondition()
  setupShip()
  // setupBalls()
  // setupBlocks()
  // setupZones()
  // setupPauseOption()
  stage.scenery.add(fps)
  // score?
}

function setupShip() {
  var ship = new shipFactory()
  ship.x = stage.w / 2
  ship.y = stage.h / 2
  stage.scenery.add(ship)
}

function setupEndCondition() {
  var endCondition = {
    update: function(stage) {
      var balls = stage.getSceneryByType('ball')
      var livesLeft = 0
      for (var b = 0; b < balls.length; b++) {
        livesLeft += balls[b].lives
      }
      if (livesLeft < 1) {
        stage.scenery.add({
          update: function() {},
          render: function() {
            stage.ctx.fillStyle = 'hsla(100, 40%, 50%, 0.7)'
            stage.ctx.fillRect(0, 0, stage.w, stage.h)
            stage.ctx.font = "32px Arial";
            stage.ctx.fillStyle = "hsl(189, 79%, 93%)";
            stage.ctx.textAlign = "center";
            stage.ctx.textBaseline = "middle"
            var x = stage.w / 2
            var y = stage.h / 2
            stage.ctx.fillText('Game Over', x, y);
          }
        })
      }
    },
    render: function() {},
  }
  stage.scenery.add(endCondition)
}

function setupPauseOption() {
  stage.pause.possible = true
  var pause = {
    update: function() {},
    render: function(stage) {
      if (stage.pause.isPaused) {
        stage.ctx.fillStyle = 'hsla(100, 40%, 50%, 0.7)'
        stage.ctx.fillRect(0, 0, stage.w, stage.h)
        stage.ctx.font = "32px Arial";
        stage.ctx.fillStyle = "hsl(189, 79%, 93%)";
        stage.ctx.textAlign = "center";
        stage.ctx.textBaseline = "middle"
        var x = stage.w / 2
        var y = stage.h / 2
        stage.ctx.fillText('Paused', x, y);
      }
    },
  }
  stage.scenery.add(pause)
}

function setupZones() {
  var division = 3
  var divisionW = stage.w / division
  var divisionH = stage.h / division
  var block
  var zone
  var blocks = stage.getSceneryByType('block')

  for (var c = 0; c < division; c++) {
    for (var r = 0; r < division; r++) {
      stage.hitZones.push({
        x: divisionW * c,
        y: divisionH * r,
        w: divisionW,
        h: divisionH,
        blocks: [],
        render: function() {
          stage.ctx.fillRect(this.x, this.y, 5, 5)
        }
      })
    }
  }

  for (var b = 0; b < blocks.length; b++) {
    block = blocks[b]
    for (var z = 0; z < stage.hitZones.length; z++) {
      zone = stage.hitZones[z]
      if (hitTest.isHit(block, zone)) {
        zone.blocks.push(block)
      }
    }
  }
}


function setupBalls() {
  var balls = [
    new ballFactory(),
  ]
  
  for (var b = 0; b < balls.length; b++) {
    ball = balls[b]
    var quarterStageH = ((stage.h / 2) / 2)
    ball.x = (stage.w / 2) - (ball.w / 2)
    ball.y = (quarterStageH * 3) -(ball.h / 2)
    // ball.vX = parseFloat(Math.random().toFixed(2))
    // ball.vY = parseFloat(Math.random().toFixed(2))
    ball.vX = .2
    ball.vY = .2
    ball.updateHitZone(stage.hitZones)
    stage.scenery.add(ball)
  }
}

function setupBlocks() {
  var hSpace = stage.w - (stage.gutter * 2)
  var vSpace = stage.h / 2
  var blockTemp = new blockFactory()
  var colTotal = parseInt(hSpace / blockTemp.w)
  var rowTotal = parseInt(vSpace / blockTemp.h)
  var oneTo10

  // temp
  // var block = new blockFactory()
  // block.x = hSpace / 2
  // block.y = vSpace / 2
  // return blocks.push(block)

  for (row = 1; row <= rowTotal; row++) {
    for (col = 1; col <= colTotal; col++) {
      var block = new blockFactory()
      oneTo10 = Math.floor(Math.random() * (11 - 1) + 1)
      if (oneTo10 < 3) {
        block.power = 'newBall'
      } else if (oneTo10 < 6) {
        block.power = 'paddleShrink'
      } else if (oneTo10 < 10) {
        block.power = 'paddleExpand'
      }

      block.x = (col * block.w)
      block.y = (row * block.h)
      stage.scenery.add(block)
    }
  }
  stage.countBlocks()
}

module.exports = level