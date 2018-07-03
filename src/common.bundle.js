// var stage = require('./stage')
// var scenery = require('./scenery')

// scenery.renderStage()
// scenery.setupEvents()
// scenery.setupMenu()
// stage.loop()

var app = new PIXI.Application(800, 600, {backgroundColor : 0xffffff});
document.body.appendChild(app.view);

let triangle = new PIXI.Graphics();
triangle.beginFill(0x66FF33);
triangle.drawPolygon([
  -16, 32,             //First point
  16, 32,              //Second point
  0, 0                 //Third point
]);
triangle.endFill();
let triangleContainer = new PIXI.Container();

// move container to the (200, 150) 
triangleContainer.position.x = 100;
triangleContainer.position.y = 100;
triangle.x = triangleContainer.x / 2;
triangle.y = triangleContainer.y / 2;
// (93, 98.5) is center of center bunny sprite in local triangleContainer coordinates
// we want it to be in (200, 150) of global coords
triangleContainer.pivot.x = 20;
triangleContainer.pivot.y = 20;


triangleContainer.addChild(triangle);


app.stage.addChild(triangleContainer);

// var ship = new PIXI.Graphics();
// ship.beginFill(0xeeeeee);
// ship.lineStyle(2, 0xcccccc, 1);
// ship.moveTo(0, 0);
// ship.lineTo(0, -5);
// ship.lineTo(-10, -5);
// ship.lineTo(0, 15);
// ship.lineTo(10, -5);
// ship.lineTo(0, -5);
// ship.lineTo(0, 0);
// ship.endFill();
// // ship.pivot.set(0)
// ship.position.x = app.screen.width / 2,
// ship.position.y = app.screen.height / 2,
// app.stage.addChild(ship);

// Listen for animate update
app.ticker.add(function(delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    // ship.rotation += 0.01 * delta;
    triangleContainer.rotation += 0.01 * delta;
});

function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}
