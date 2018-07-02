var mouseFactory = require('./mouse')
var keyCodes = require('./utility/keycode')
var requestFrameId
var timeThen = Date.now()
var timeNow
var oneTime = 0

var stage = {
  palette: {
    blue: 'hsla(200, 75%, 60%, 1)',
    red: 'hsla(5, 90%, 60%, 1)',
    gray: 'hsla(0, 0%, 60%, 1)',
  },
  canvasEl: '',
  canvasRect: '',
  ctx: '',
  time: {
    delta: 0,
    passed: 0
  },
  w: 970,
  h: 600,
  mouse: new mouseFactory(),
  keyCodes: keyCodes,
  keysDown: {},
  scenery: {
    items: [],
    add: function(item) {
      stage.scenery.items.push(item)
    },
    clear: function() {
      stage.scenery.items = []
    }
  },
  pause: {
    isPaused: '',
    possible: '',
  },
  loop: function() {
    timeNow = Date.now()
    stage.time.delta = timeNow - timeThen
    stage.time.passed += stage.time.delta
    stage.update()
    stage.render()
    timeThen = timeNow
    requestFrameId = window.requestAnimationFrame(stage.loop)
  },
  update: function() {
    for (var s = 0; s < stage.scenery.items.length; s++) {
      stage.scenery.items[s].update(stage)
    }
  },
  render: function() {
    stage.ctx.clearRect(0, 0, stage.w, stage.h)
    stage.ctx.fillStyle = '#ffffff'
    stage.ctx.fillRect(0, 0, stage.w, stage.h)

    if (!oneTime) {
      // console.log(stage.scenery.items)
      oneTime = 1
    }

    for (var s = 0; s < stage.scenery.items.length; s++) {
      stage.scenery.items[s].render(stage)
    }
  },

  // sceneryId: 0,
  // getNewId: function(){
  //   return this.sceneryId++
  // },
  // getSceneryByType: function(type) {
  //   var scenery = []
  //   for (var s = 0; s < this.scenery.length; s++) {
  //     if ('type' in this.scenery[s] && this.scenery[s].type == type) {
  //       scenery.push(this.scenery[s])
  //     }
  //   }
  //   return scenery
  // },
}

module.exports = stage
