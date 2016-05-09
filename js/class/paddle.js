var entityFactory = require('./entity');

var Paddle = function() {
  this.w = 120;
  this.h = 30;
}

Paddle.prototype = entityFactory.prototype;

Paddle.prototype.mouseMove = function(mouse) {
  if (mouse.x && mouse.y) {
    this.x = mouse.x;
    this.y = mouse.y;
  };
};

module.exports = Paddle;
