var app = new PIXI.Application(800, 600, {backgroundColor : 0xffffff});
var pkeys = [];
var timeRun = 0;
var ship = {
  accelleration: 0,
  deceleration: .2,
  graphic: '',
  container: '',
  draw: function() {
    this.graphic = new PIXI.Graphics();
    this.container = new PIXI.Container();
    this.graphic.beginFill(0x66FF33);
    this.graphic.drawPolygon([-16, 32, 16, 32, 0, 0]);
    this.graphic.endFill();
    this.container.position.x = 100;
    this.container.position.y = 100;
    this.graphic.x = this.container.x;
    this.graphic.y = this.container.y;
    this.container.pivot.x = this.container.position.x;
    this.container.pivot.y = this.container.position.y + 16;
    this.container.addChild(this.graphic);
    app.stage.addChild(this.container);
  },
  move: function() {
    if (this.accelleration == 0) {
      return
    }
    this.container.position.x += Math.cos(this.container.rotation-(Math.PI)/2) * this.accelleration;
    this.container.position.y += Math.sin(this.container.rotation-(Math.PI)/2) * this.accelleration;
    this.accelleration -= this.deceleration
    if (this.accelleration < 0) {
      this.accelleration = 0
    }
  },
  accellerate: function(amount) {
    this.accelleration += amount
    if (this.accelleration > 10) {
      this.accelleration = 10
    }
  },
  rotate: function(amount) {
    this.container.rotation += amount;
  }
}

var rock = {
  vR: 0,
  graphic: '',
  container: '',
  draw: function() {
    this.graphic = new PIXI.Graphics();
    this.container = new PIXI.Container();
    this.graphic.beginFill(0x66FF33);
    this.graphic.drawPolygon([-16, 32, 16, 32, 0, 0]);
    this.graphic.endFill();
    this.container.position.x = 100;
    this.container.position.y = 100;
    this.graphic.x = this.container.x;
    this.graphic.y = this.container.y;
    this.container.pivot.x = this.container.position.x;
    this.container.pivot.y = this.container.position.y + 16;
    this.container.addChild(this.graphic);
    app.stage.addChild(this.container);
  },
}

window.onkeydown = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
  pkeys[code] = true;
}

window.onkeyup = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
  console.log(code)
  pkeys[code] = false;
};

document.body.appendChild(app.view);

ship.draw()

app.ticker.add(function(delta) {
  timeRun += delta;

// console.log(Math.round(timeRun))

  // ship
  if (pkeys[87]) {
    ship.accellerate(0.5 * delta);
  } else if (pkeys[83]) {
    ship.deceleration = .4;
  }
  if (pkeys[65]) {
    ship.rotate(-(0.12 * delta));
  } else if (pkeys[68]) {
    ship.rotate((0.12 * delta));
  }
  ship.move()

  // rock
  // every 10 seconds rock appearance will be faster
  // every 30 seconds rock division amount has a higher ceiling
  // rock birth rate is 1 every 3 s
  // rock division amount is 0
  // var rock = new rock()
});
