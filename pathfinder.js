
function Pathfinder(game, map){

  Phaser.Plugin.PathFinderPlugin.call(this);
  // console.log(this)
  // game.plugins.add(this);
  // game.plugins.add(this);
  // this.walkables = [0];

  this.unreachable_tiles = [];

}

Pathfinder.prototype = Object.create(Phaser.Plugin.PathFinderPlugin.prototype);
Pathfinder.prototype.constructor = Phaser.Plugin.PathFinderPlugin;

Pathfinder.prototype.setPath = function(origin_point, target_point, unit) {

    this.setCallbackFunction(function(path) {
        // path = path || [];
        // Use this to paint paths (for debugging)
        // for(var i = 0, ilen = path.length; i < ilen; i++) {
        //     map.putTile(3, path[i].x, path[i].y);
        // }
        path_positions = [];
        if (path !== null) {
          path.forEach(function (path_coord) {
            path_positions.push( get_point_from_tile_coord({col: path_coord.x, row: path_coord.y}))
          })
          unit.path = path_positions;
          unit.path_step = 0;
        }
        else {
          unit.path = [];
        }
    });
    origin_coord = get_tile_coord_from_point(origin_point);
    target_coord = get_tile_coord_from_point(target_point);
    // or = [origin_coord.row, origin_coord.col];
    // ta = [target_coord.row, target_coord.col];
    or = [origin_coord.col, origin_coord.row];
    ta = [target_coord.col, target_coord.row];
    // console.log(or, ta);
    // pathfinder._easyStar.findPath(origin_coord[0], origin_coord[1], target_coord[0], target_coord[1], callb)
    pathfinder.preparePathCalculation(or, ta);
    pathfinder.calculatePath();
}


Pathfinder.prototype.testPath = function(origin_tile, target_tile, myflag){
  this.setCallbackFunction(function(path, myflag) {
    // Use this to paint paths (for debugging)
    // console.log(path);
    if (path !== null) {
      for(var i = 0, ilen = path.length; i < ilen; i++) {
          map.putTile(3, path[i].x, path[i].y);
      }
      myflag.a = true;
    }
    else {
      myflag.a = false;
    }
  })
  or = [origin_tile.col, origin_tile.row];
  ta = [target_tile.col, target_tile.row];
  this.preparePathCalculation(or, ta);
  this.calculatePath();
}



Pathfinder.prototype.testForUnreachableTiles = function(){
  origin = map.getRandomAccessibleTile()
  origin = [origin.col, origin.row];
  // origin = [Math.floor(MAP_HEIGHT_TILES/2), Math.floor(MAP_HEIGHT_TILES/2)];

  for (var row = 0; row < MAP_HEIGHT_TILES-1; row++)
  {
    for (var col = 0; col < MAP_WIDTH_TILES-1; col++)
    {
      if (map.is_tile_accessible(row, col)){
        this.setCallbackFunction(function(path) {
          // Use this to paint paths (for debugging)
          if (path !== null) {
            for(var i = 0, ilen = path.length; i < ilen; i++) {
                map.putTile(3, path[i].x, path[i].y);
            }
          }
          else {
            pathfinder.unreachable_tiles.push([row,col]);
          }
        });

        target = [col, row];
        this.preparePathCalculation(origin, target);
        this.calculatePath();
      }
    }
  }
}
