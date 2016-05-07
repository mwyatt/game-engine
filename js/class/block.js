var entityFactory = require('./entity');

var Block = function() {
  this.w = 20;
  this.h = 20;
}

Block.prototype = entityFactory.prototype;

module.exports = Block;
