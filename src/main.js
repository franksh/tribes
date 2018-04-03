// GAME V3
// import Tribes from 'src/states/boot.js'
$.getScript("src/states/boot.js");
$.getScript("src/states/preload.js");

// var http = require("http");
//
// // require("./node_modules/phaser-ce/build/phaser.js")
// require("./node_modules/phaser-ce/build/phaser.js")
// require("./node_modules/simplex-noise/simplex-noise.js")
// require("./node_modules/phaser_plugin_pathfinding/bin/phaser_pathfinding-0.2.0.js")
// require("./node_modules/jquery/dist/jquery.js")

var Tribes = Tribes || {};

Tribes.Game = function () {
  Phaser.Game.call(this, WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, 'gameArea');
  this.state.add('Boot', Tribes.BootState, false);
  this.state.add('Preload', Tribes.PreloadState, false);

  this.state.start('Boot');
}

Tribes.Game.prototype = Object.create(Phaser.Game.prototype);
Tribes.Game.prototype.constructor = Phaser.Game;
