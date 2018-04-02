

function Building (game, x, y, key, tribe=1) {

  // Sprite / Body Setup
  Phaser.Sprite.call(this, game, x, y, key);
  this.anchor.set(0.25,0.25);
  game.physics.arcade.enable(this);
  this.body.collideWorldBounds = false;
  this.body.onCollide = new Phaser.Signal();
  this.inputEnabled = true;

  // Variables

  this.tribe = tribe;

  this.berrycount = 0;

}

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = Phaser.Sprite;

Building.prototype.setXYVicinity = function(point, range) {
  position = gamemap.map.getRandomAccessiblePointInRange(point, range)
  this.position = position;
}
