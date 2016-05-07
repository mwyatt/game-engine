var entityFactory = require('./entity');

var Paddle = function() {
  this.w = 150;
  this.h = 10;
}

Paddle.prototype = entityFactory.prototype;

Paddle.prototype.mouseMove = function(mouse) {
  if (mouse.x && mouse.y) {
    paddle.x = mouse.x;
    paddle.y = mouse.y;
  };
};

module.exports = Paddle;
