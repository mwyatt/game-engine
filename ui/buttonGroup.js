var buttonGroupFactory = function() {
  this.buttons = []
  this.selectedIndex = 0
  this.navCodes = [38, 40, 13]
  this.keyTimesDepressedCache = {
    38: 0,
    40: 0,
    13: 0,
  }

  this.render = function(stage) {
    for (var b = 0; b < this.buttons.length; b++) {
      this.buttons[b].render(stage)
    }
  }

  this.update = function(stage) {
    for (var b = 0; b < this.buttons.length; b++) {
      this.buttons[b].selected = 0
    }
    this.buttons[this.selectedIndex].selected = 1
    var navCode
    for (var b = 0; b < this.navCodes.length; b++) {
      navCode = this.navCodes[b]
      if (navCode in stage.keysDown) {
        if (this.keyTimesDepressedCache[navCode] != stage.keysDown[navCode].time.depressed) {
          if (navCode == 40) {
            this.selectedIndex ++
          } else if (navCode == 38) {
            this.selectedIndex --
          }
          if (this.selectedIndex < 0) {
            this.selectedIndex = 0
          }
          if (this.selectedIndex > this.buttons.length - 1) {
            this.selectedIndex = this.buttons.length - 1
          }
          if (navCode == 13) {
            this.buttons[this.selectedIndex].action()
          }
          this.keyTimesDepressedCache[navCode] = stage.keysDown[navCode].time.depressed
        }
      }
    }
  }
}

module.exports = buttonGroupFactory
