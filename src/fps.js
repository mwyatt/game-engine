var fps = {
  fps: 0,
  frames: [],
  update: function(stage) {
    this.frames.push(stage.time.delta)
    var time = 0
    for (var f = 0; f < this.frames.length; f++) {
      time += this.frames[f]
    }
    if (time > 1000) {
      this.fps = this.frames.length
      this.frames = []
    }
  },
  render: function(stage) {
    stage.ctx.font = "11px Verdana";
    stage.ctx.fillStyle = "hsl(189, 20%, 70%)";
    stage.ctx.fillText(this.fps, stage.w - 20, stage.h - 20);
  },
}

module.exports = fps
