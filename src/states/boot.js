var Tribes = Tribes || {};

Tribes.BootState = function(game) {

};

Tribes.BootState.prototype.init = function () {

    this.game.time.advancedTiming = true;

    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.input.maxPointers = 1;

    // Maybe fixes scrolling problem?
    this.scale.compatibility.scrollTo = false;

    //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    this.stage.disableVisibilityChange = false;


    if (this.game.device.desktop)
    {
        //  If you have any desktop specific settings, they can go in here
        this.scale.pageAlignHorizontally = true;
    }
    else
    {
        //  Same goes for mobile settings.
        //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(480, 260, 1024, 768);
        this.scale.forceLandscape = true;
        this.scale.pageAlignHorizontally = true;
    }

};

// Tribes.BootState = function (game) {
//   Phaser.State.call(this);
// }
//
// Tribes.BootState.prototype = Object.create(Phaser.State.prototype);
// Tribes.BootState.prototype.constructor = Tribes.BootState;


Tribes.BootState.prototype.preload = function () {

  // Load images required for preloader here
}


Tribes.BootState.prototype.create = function() {
  console.log("Boot State Done")

  this.game.state.start('Preload')
}
