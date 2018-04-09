var Tribes = Tribes || {};


Tribes.PreloadState = function (game) {

  this.ready = false;

}


// Tribes.PreloadState = function () {
//   Phaser.State.call(this);
// }
// Tribes.PreloadState.prototype = Object.create(Phaser.State.prototype);
// Tribes.PreloadState.prototype.constructor = Tribes.PreloadState;

Tribes.PreloadState.prototype.preload = function () {

  // Load assets
  // this.load.setBaseURL('http://labs.phaser.io');

  // this.load.image('player', 'data/start.png');
  // game.load.tilemap('map_3', 'map_3.json', null, Phaser.Tilemap.TILED_JSON);
  // game.load.image('tiles', 'data/tile_set_3.png');
  this.load.image('tiles', 'assets/tiles/medieval_tilesheet copy.png')
  // game.load.image('tiles', 'data/kenney_medievalrtspack/Tilesheet/RTS_medieval@2.png')


  // game.load.spritesheet('player', 'data/dude.png', 32, 48)
  // game.load.image('worker1', 'data/kenney_medievalrtspack/PNG/Retina/Unit/medievalUnit_01.png')//, 32, 48)
  // game.load.image('fighter1', 'data/kenney_medievalrtspack/PNG/Retina/Unit/medievalUnit_03.png', 64,64)//, 32, 48)
  // game.load.image('berry_icon', 'data/kenney_medievalrtspack/PNG/Retina/Unit/medievalUnit_02.png', 32,32)//, 32, 48)
  this.load.image('worker1', 'assets/units/medievalUnit_01.png')//, 32, 48)
  this.load.image('fighter1', 'assets/units/medievalUnit_03.png', 64,64)//, 32, 48)
  this.load.image('berry_icon', 'assets/units/medievalUnit_02.png', 32,32)//, 32, 48)


  this.load.image('worker2', 'assets/units/medievalUnit_07.png')//, 32, 48)
  this.load.image('house_simple', 'assets/structures/medievalStructure_17.png', 128,128)//, 32, 48)

  this.load.image('grey_panel', 'assets/ui/grey_panel.png')
  this.load.image('white_panel', 'assets/ui/white_panel.png')


  // game.load.onLoadComplete.add(loadComplete, this)



}

Tribes.PreloadState.prototype.create = function() {
  console.log("Preload State Done")
  this.game.state.start('World');
}

// export default BootState;
