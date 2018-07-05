var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('sky', 'phaser-tutorial/assets/sky.png');
  this.load.image('ground', 'phaser-tutorial/assets/platform.png');
  this.load.image('star', 'phaser-tutorial/assets/star.png');
  this.load.image('bomb', 'phaser-tutorial/assets/bomb.png');
  this.load.spritesheet('dude', 
   'phaser-tutorial/assets/dude.png',
   { frameWidth: 32, frameHeight: 48 }
   );
}

function create ()
{
  this.add.image(400, 300, 'sky');

      platforms = this.physics.add.staticGroup();

      platforms.create(400, 568, 'ground').setScale(2).refreshBody();

      platforms.create(600, 400, 'ground');
      platforms.create(50, 250, 'ground');
      platforms.create(750, 220, 'ground');
}

function update ()
{
}
