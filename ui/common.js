var hitTest = hitTest
var ballFactory = ballFactory
var stageGutter = 20
var log = console.log
var timeThen = Date.now()
var timeNow
var timeDelta
var stageWidth = 640
var stageHeight = 480
var ballG = new PIXI.Graphics();
var renderer = new PIXI.WebGLRenderer(stageWidth, stageHeight, {backgroundColor : 0xefefef});
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var ballO = new ballFactory()

renderGame()
gameLoop()

function gameLoop() {
  requestAnimationFrame(gameLoop)

  timeNow = Date.now()
  timeDelta = timeNow - timeThen
  timeThen = timeNow

  update()

  //Render the stage to see the animation
  renderer.render(stage);
}

//Start the game loop

function renderGame() {
  renderBlocks()

  var quarterStageH = ((stageHeight / 2) / 2)
  ballO.x = (stageWidth / 2) - (ballO.w / 2)
  ballO.y = (quarterStageH * 3) -(ballO.h / 2)
  console.log(ballO, (stageWidth / 2) - (ballO.w / 2), (quarterStageH * 3) -(ballO.h / 2))
  ballG.beginFill(0x666666);
  ballG.drawRect(ballO.x, ballO.y, ballO.w, ballO.h);
  ballG.endFill();
  stage.addChild(ballG);
}

function update() {
  ballO.moveVelocity(timeDelta)
}

function renderBlocks() {
  var blockTemplate = getBlockTemplate()
  var hSpace = stageWidth - (stageGutter * 2)
  var vSpace = stageHeight / 2
  var colTotal = parseInt(hSpace / blockTemplate.w)
  var rowTotal = parseInt(vSpace / blockTemplate.h)
  for (row = 1; row <= rowTotal; row++) {
    for (col = 1; col <= colTotal; col++) {
      renderBlock(row, col)
    }
  }
}

function renderBlock(row, col) {
  var blockT = getBlockTemplate()
  blockT.x = (col * blockT.w)
  blockT.y = (row * blockT.h)
  var blockG = new PIXI.Graphics();
  blockG.beginFill(0xcccccc);
  blockG.drawRect(blockT.x, blockT.y, blockT.w, blockT.h);
  blockG.endFill();
  stage.addChild(blockG);
}

// will this be a unique object?
function getBlockTemplate() {
  return {
    x: 0,
    y: 0,
    w: 20,
    h: 20,
  }
}
