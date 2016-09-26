var Block = require('./block')
var stage = require('./stage')
var BlockManager = {}

BlockManager.getLevel1Blocks = function() {
  var blockConfig = []
  var blocks = []
  var index = 0
  while (index < 50) {
    var x = 25 * index
    var y = 20
    var randOneToTen = parseInt(Math.random() * 10)
    var lives = randOneToTen >= 5 ? 1 : 2
    blockConfig.push({x: x, y: y, type: 1, lives: lives})
    index++
  }
  blockConfig.forEach(function(config) {
    var block = new Block(config.x, config.y)
    block.lives = config.lives
    blocks.push(block)
  })
  return blocks
}

module.exports = BlockManager
