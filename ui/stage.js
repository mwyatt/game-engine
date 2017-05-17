// var scenes = require('./scenery')
var mouseFactory = require('./mouse')
var keyCodes = {
  a: 65,
  d: 68,
  enter: 13,
  numpad: {
    minus: 109,
    plus: 107
  },
  down: 40,
  up: 38,
  esc: 27,
  backspace: 8,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  minus: 189,
  plus: 187,
  tab: 9 // works as android enter / next
}
var palette = {
  blue: 'hsla(200, 75%, 60%, 1)',
  red: 'hsla(5, 90%, 60%, 1)',
  gray: 'hsla(0, 0%, 60%, 1)',
}

var stage = {
  palette: palette,
  sceneryId: 0,
  getNewId: function(){
    return this.sceneryId++
  },
  canvasEl: '',
  canvasRect: '',
  ctx: '',
  time: {delta: 0, passed: 0},
  w: 480,
  h: 520,
  gutter: 20,
  mouse: new mouseFactory(),
  keysDown: {},
  keyCodes: keyCodes,
  hitZones: [],
  scenery: [],
  pause: {
    isPaused: '',
    possible: '',
  },
  countBlocks: function() {
    var blocks = this.getSceneryByType('block')
    if (blocks.length < 1) {
      // scenes.setupSceneLevel()
    }
  },
  getSceneryByType: function(type) {
    var scenery = []
    for (var s = 0; s < this.scenery.length; s++) {
      if ('type' in this.scenery[s] && this.scenery[s].type == type) {
        scenery.push(this.scenery[s])
      }
    }
    return scenery
  },
}

module.exports = stage
