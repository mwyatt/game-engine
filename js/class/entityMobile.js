var entityFactory = require('./entity');

// motion version of the entity
var EntityMobile = function() {
  this.g; // gravity
  this.s; // speed
  this.vX; // velocity
  this.vY; // velocity
}

EntityMobile.prototype = entityFactory.prototype;

module.exports = EntityMobile;
