// $.getScript("node_modules/phaser-ce/build/phaser.js");
//

function Unit (game, x, y, key, tribe=1) {

  // Sprite / Body Setup
  Phaser.Sprite.call(this, game, x, y, key);
  this.anchor.set(0.25,0.25);
  game.physics.arcade.enable(this);
  this.body.collideWorldBounds = false;
  this.body.onCollide = new Phaser.Signal();
  this.body.setSize(32,32,32,32);
  this.inputEnabled = true;
  this.events.onInputDown.add(clickSignal.clickedUnit, this);

  // Path variables
  this.target = false;
  this.path = [];
  this.path_step = -1;
  this.speed_fast = 150;
  this.speed_slow = 50;

  this.tribe = tribe;
  this.home = null;

  this.state = 'searching';
  this.task = 'berries';
  this.berries_location = null;

  this.berrycount = 0;
}

Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Phaser.Sprite;
// Unit.prototype.sayHi = function() {console.log("Hi");}


/* Find a random (but accessible) position for the unit
*/
Unit.prototype.setXYrandom = function() {

  position = gamemap.getRandomAccessiblePoint();
  this.position = position;
  // this.body.moveTo(position.x, position.y);
}

Unit.prototype.setXYVicinity = function(point, range) {

  position = this.game.gamemap.getRandomAccessiblePointInRange(point, range)
  this.position = position;
}

Unit.prototype.update = function() {

  this.updateStatus();
  this.updateTask();
  this.updateMovement();

}

Unit.prototype.updateStatus = function() {

  let tile = this.game.gamemap.getTileAtXY(this.centerX, this.centerY);
  let tileid = tile.index;

  // Check if berries present, if yes collect
  if((this.task=='berries') & (tileid==100)) {
    this.berrycount += 1;
  }
  // Check if at home
  if(Phaser.Point.distance(this.position, this.home.position)<5) {
    this.home.berrycount += this.berrycount;
    this.berrycount = 0;
  }
}


Unit.prototype.updateTask = function () {

  if (this.path.length == 0) {
    if (this.task == 'berries') {
      // No berries known
      if (this.berries_location == null) {
        let tileid = this.game.gamemap.tile_texture_ids['berry_a'];
        // console.log("searching berries");
        target_pos = this.game.gamemap.check_tile_in_range(this.position, tileid, 500);
        if (target_pos) {
          // console.log("found berries!", target_pos);
          this.berries_location = target_pos;
          this.move_to(target_pos);

        }
        else {
          // Seach for berries
          this.move_to_random_in_range(300);
        }
      }
      else if (this.berries_location != null) {
        // Otherwise: Check if collecting more berries is in order
        dist = Phaser.Point.distance(this.position, this.berries_location);
        if (this.berrycount<100) {
          if (dist>64) {
            this.move_to(this.berries_location);
          }
          else if (dist<64) {
            this.state = 'collecting';
          }
        }
        else {
          this.state = 'returning';
          this.move_to(this.home.position);
        }
      }
    }
  }
}



Unit.prototype.updateMovement = function() {
  // If Path: move along Path
  if (this.path.length > 0) {
    next_position = this.path[this.path_step];

    if (!this.reached_target_position(next_position)) {
      velocity = new Phaser.Point(next_position.x - this.position.x,
                             next_position.y - this.position.y);
      velocity.normalize();
      if (this.state=='idle') speed = this.speed_slow;
      if (this.state=='searching') speed = this.speed_fast;
      else speed = this.speed_fast;
      this.body.velocity.x = velocity.x * speed;
      this.body.velocity.y = velocity.y * speed;
    }
    else
    {
      this.position.x = next_position.x;
      this.position.y = next_position.y;
      if (this.path_step < this.path.length - 1) {
          this.path_step += 1;
      }
      else
      {
        this.path = [];
        this.path_step = -1;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
      }
    }
  }
  // Else: Set random target
  else if ((this.path.length == 0) & (this.status=='idle')) {
    // this.move_to_random();
    this.move_to_random_in_range(300);

  }
}

Unit.prototype.reached_target_position = function (target_position) {
  // - target_position: Phaser.Point
  if (!(target_position instanceof Phaser.Point)) alert("reached_target_pos got wrong input");
  var distance;
  distance = Phaser.Point.distance(this.position, target_position);
  return distance<5;
}

Unit.prototype.move_to = function (target_position) {
  pathfinder.setPath(this.position, target_position, this)
}

Unit.prototype.move_to_random = function () {
  target_position = this.game.gamemap.getRandomAccessiblePoint();
  this.move_to(target_position);
}

Unit.prototype.move_to_random_in_range = function (range) {
  target_position = this.game.gamemap.getRandomAccessiblePointInRange(this.position, range);
  // console.log(target_position);
  this.move_to(target_position);
}

// Unit.prototype.move_through_path = function (path) {
//   console.log(this);
//   if (path !== null) {
//     this.path = path;
//     this.path_step = 0;
//   }
//   else {
//     this.path = [];
//   }
// }
