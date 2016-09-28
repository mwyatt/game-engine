var Block = require('./block')
var core = require('./core')
var BlockManager = {}

BlockManager.getLevel1Blocks = function() {
  var blockConfig = []
  var blocks = []
  var index = 0
  var exampleBlock = new Block(0, 0)
  var xDefault = -exampleBlock.w
  var y = 0
  var x = xDefault
  while (index < 100) {
    index++
    if ((x + exampleBlock.w) >= core.w) {
      y += exampleBlock.h
      x = xDefault
    }
    x += exampleBlock.w
    var randOneToTen = parseInt(Math.random() * 10)
    var lives = randOneToTen >= 5 ? 1 : 1
    blockConfig.push({x: x, y: y, type: 1, lives: lives})
  }
  blockConfig.forEach(function(config) {
    var block = new Block(config.x, config.y)
    block.lives = config.lives
    blocks.push(block)
  })
  return blocks
}

module.exports = BlockManager
