var Block = require('./block')
    console.log(stage)
var BlockManager = {}

BlockManager.getLevel1Blocks = function() {
  var blockConfig = []
  var blocks = []
  var index = 0
  var xDefault = -12
  var blockSpacing = 22
  var y = 10
  var x = xDefault
  while (index < 50) {
    index++
    if (x > stage.w) {
      y += blockSpacing
      x = xDefault
    }
    x += blockSpacing
    var randOneToTen = parseInt(Math.random() * 10)
    var lives = randOneToTen >= 5 ? 1 : 2
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
