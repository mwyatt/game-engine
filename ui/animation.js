// make this dynamic so can be used as an engine for all animations for all objects
// but how?

var animation = {
  iteration: 0,
  timePassed: 0,

  timeDuration: 300, // ms
  maxIteration: 1,

  renderFrame: function(delta) {
    this.timePassed += delta
    if (this.timePassed >= this.timeDuration) {
      this.iteration ++
      if (this.iteration >= this.maxIteration) {
        return
      }
      this.timePassed = 0
    }
    return this.timeDuration - this.timePassed
  }

      var positiveDecimal = this.animationDestroy.progress / this.animationDestroy.timeDuration
      var opacity = 1 - (Math.round(positiveDecimal * 10) / 10)
      this.opacity = opacity


}


300ms

0ms - 100ms
  y-2px
  y -2px
