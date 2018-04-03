var Tribes = Tribes || {};


Tribes.WorldState = function(game) {

}


// Tribes.WorldState = function (game) {
//   Phaser.State.call(this);
// }
// Tribes.WorldState.prototype = Object.create(Phaser.State.prototype);
// Tribes.WorldState.prototype.constructor = Tribes.WorldState;

Tribes.WorldState.prototype.preload = function () {

}


Tribes.WorldState.prototype.create = function() {
  console.log("World State Done")


  // Physics
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  // KEYS, Input
  cursors = this.game.input.keyboard.createCursorKeys();
  // keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
  // keyA.onDown.add(moveplayer, this);
  // for zoomingo n mouse wheel
  this.game.input.mouse.mouseWheelCallback = mouseWheel;
  // Mouse Hover
  this.game.input.addMoveCallback(mouseHover, this);
  // Mouse Click
  clickSignal = new ClickSignal();
  this.game.input.onDown.add(clickSignal.clicked, this);

  // MAP GENERATION
  this.game.gamemap = new Tribes.GameMap()
  let maplayer = this.game.gamemap.generate_map(this.game);
  map = maplayer[0];
  layer = maplayer[1];


  // Pathfinding
  pathfinder = this.game.plugins.add(new Pathfinder(this.game, map));
  pathfinder.setGrid(map.layers[0].data, this.game.gamemap.walkables);
  pathfinder._easyStar.enableDiagonals();
  // pathfinder = game.plugins.add(new Pathfinder(map));
  // pathfinder._easyStar.enableCornerCutting();

  // HUD
  hud = this.game.plugins.add(new HUD(this.game, this.game.world));


  // t = game.add.text(100, 100, "this text is fixed to the camera", { font: "32px Arial", fill: "#ffffff", align: "center" });
  // t.x0 = 100;
  // t.y0 = 100;
  // t.fixedToCamera = false;
  // t.setScaleMinMax(1,1,1,1);
  // t.cameraOffset.setTo(200, 500);

  // ADD UNITS
  hq1 = new Building(this.game, 2000, 1000, 'house_simple', tribe=1)
  hq1.setXYVicinity(hq1.position, 1000);
  this.game.world.add(hq1);

  hq2 = new Building(this.game, 2000, 3000, 'house_simple', tribe=2)
  hq2.setXYVicinity(hq2.position, 1000);
  this.game.world.add(hq2);

  player = new Unit(this.game, 64, 64, 'fighter1')
  this.game.world.add(player);
  player.setXYVicinity(hq1.position, 2000);
  player.home = hq1;

  // unit = new Unit(game, 0, 0, 'worker');
  // game.world.add(unit);
  tribe1 = this.game.add.physicsGroup();
  for (var i=0; i<30; i++){
    x = this.game.rnd.between(0, MAP_WIDTH_TILES) * 64;
    y = this.game.rnd.between(0, MAP_HEIGHT_TILES) * 64;
    // x = (MAP_WIDTH_TILES-1)*64;
    // x = scaleDist(x);
    // y = scaleDist(y);
    let moople = new Unit(this.game, x, y, 'worker1', tribe=1);
    // moople.setXYrandom();
    moople.setXYVicinity(hq1.position, 2000);
    moople.home = hq1;
    // console.log(moople);
    tribe1.add(moople);
    // game.physics.arcade.enable(moople);
    // var moople = mooples.create(x, y, 'worker')
  }

  tribe2 = this.game.add.physicsGroup();
  for (var i=0; i<30; i++){
    x = this.game.rnd.between(0, MAP_WIDTH_TILES) * 64;
    y = this.game.rnd.between(0, MAP_HEIGHT_TILES) * 64;
    // x = (MAP_WIDTH_TILES-1)*64;
    // x = scaleDist(x);
    // y = scaleDist(y);
    let moople = new Unit(this.game, x, y, 'worker1', tribe=2);
    // moople.setXYrandom();
    moople.setXYVicinity(hq2.position, 2000);
    moople.home = hq2;
    // console.log(moople);
    tribe2.add(moople);
    // game.physics.arcade.enable(moople);
    // var moople = mooples.create(x, y, 'worker')
  }

  // Set Camera
  this.game.world.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);
  this.game.world.scale.set(worldScale);

  // Time

  this.game.startTime = new Date();
  this.game.timeElapsed = 0;
  console.log(this.game);
  this.game.createTimer();
  this.game.gameTimer = this.game.time.events.loop(GAME_SPEED,
                  function(){this.game.updateTimer()})


  //	A mask is a Graphics object
  // var mask_group = game.add.group();
  fog = this.game.add.graphics(0, 0);
  // var mask = Phaser.Graphics(game, 0, 0,);
  // mask_group.add(mask);

  //	Shapes drawn to the Graphics object must be filled.
  //	Here we'll draw a circle

}
