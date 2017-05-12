var buttonFactory = function() {
  this.x = 0
  this.y = 0
  this.w = 150
  this.h = 90
  this.text = ''
  this.selected

  this.action = function() {

  }

  this.update = function() {}

  this.render = function() {
    if (this.selected) {
      stage.ctx.fillStyle = 'hsl(189, 79%, 63%)'
    } else {
      stage.ctx.fillStyle = 'hsl(189, 79%, 53%)'
    }
    stage.ctx.fillRect(this.x, this.y, this.w, this.h)
    var fontSize = 32
    stage.ctx.font = fontSize + "px Arial";
    stage.ctx.fillStyle = "hsl(189, 79%, 93%)";
    stage.ctx.textAlign = "center";
    stage.ctx.textBaseline = "middle"
    var x = this.x + this.w / 2
    var y = this.y + (this.h / 2)
    stage.ctx.fillText(this.text, x, y);
  }
}
