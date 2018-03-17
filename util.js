
function distXY(p1, p2) {
  // Returns the distance between two points p=(x,y)
  x = p1[0]-p2[0];
  y = p1[1]-p2[1];
  return [x,y];
}


function scaleDist(d) {
  // Scales Distances according to the world Scale
  return d*worldScale;
}

function get_tile_coord_from_point(point) {
  var row, col;
  row = Math.abs(Math.floor(point.y / TILE_HEIGHT));
  col = Math.abs(Math.floor(point.x / TILE_WIDTH));
  return {row: row, col: col}
}

function get_point_from_tile_coord(tile_coord) {
  var x, y;
  x = (tile_coord.col * TILE_WIDTH); //+ TILE_WIDTH/2;
  y = (tile_coord.row * TILE_HEIGHT); //+ TILE_HEIGHT/2;
  return new Phaser.Point(x,y);
}

// Camera MOVEMENT

function pivotBoundX(dx){
    // Check if pivot would extend camera over map borders
    // If yes, return dx=0
    if ((dx<0)&((game.world.pivot.x+CAMERA_MARGIN)<0)){
      return 0;
    }
    else if ((dx>0)&(game.world.pivot.x-CAMERA_MARGIN>(MAP_WIDTH-WINDOW_WIDTH*1/worldScale))){
      return 0;
    }
    else return dx;
    // return Phaser.Math.clamp(dx, game.world.pivot.x, )
}

function pivotBoundY(dy){
    // Check if pivot would extend camera over map borders
    // If yes, return dy=0
    if ((dy<0)&((game.world.pivot.y+CAMERA_MARGIN)<0)){
      return 0;
    }
    else if ((dy>0)&(game.world.pivot.y-CAMERA_MARGIN>(MAP_HEIGHT-WINDOW_HEIGHT*1/worldScale))){
      return 0;
    }
    else return dy;
    // return Phaser.Math.clamp(dx, game.world.pivot.x, )
}

function mouseWheel(event) {
  zooming = true;
  if(game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
    zoomDirection = 'in';
    worldScale += 0.02 * worldScale;
  } else {
    zoomDirection = 'out';
    worldScale -= 0.02 * worldScale;
  }
}
