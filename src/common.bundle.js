var stage = require('./stage')
var scenery = require('./scenery')

scenery.renderStage()
scenery.setupEvents()
scenery.setupMenu()
stage.loop()
