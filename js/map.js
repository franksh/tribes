$.getScript("js/node_modules/simplex-noise/simplex-noise.js");

function GameMap () {

  Phaser.Tilemap.call(this);

  this.gen = new SimplexNoise();
  this.tile_texture_ids = {
    'grass_a': 0,
    'grass_b': 1,
    'sand_a': 2,
    'sand_b': 3,
    'water_a': 36,
    'water_b': 37,
    'snow_a': 38,
    'snow_b': 39,
    'forest_a': 72,
    'forest_b': 73,
    'forest_c': 74,
    'forest_d': 75,
    'stone_a': 20,
    'stone_item_lightest': 76,
    'stone_item_heavy': 79,
    'berry_a': 100,
  }
  this.walkables = [0, 100];

  this.map = null;
  this.layer = null;

}

GameMap.prototype = Object.create(Phaser.Tilemap.prototype);
GameMap.prototype.constructor = Phaser.Tilemap;

GameMap.prototype.generate_map = function(game, width_tiles, height_tiles) {
  /* Generates a Tilemap */
  let elevation_map = this.create_noise_map(MAP_WIDTH_TILES, MAP_HEIGHT_TILES, 0.9);
  let moisture_map = this.create_noise_map(MAP_WIDTH_TILES, MAP_HEIGHT_TILES, 1.0, 1.5);
  let map_csv = this.getCSVMap(elevation_map, moisture_map);
  //  Add data to the cache
  game.cache.addTilemap('dynamicMap', null, map_csv, Phaser.Tilemap.CSV);
  // Create map
  let map = game.add.tilemap('dynamicMap', 64, 64);
  this.map = map;
  //  'tiles' = cache image key, 16x16 = tile size
  // map.addTilesetImage('tiles_set_3', 'tiles', 30, 26);
  map.addTilesetImage('tiles_set_kenney', 'tiles', 64, 64, 32, 32);
  // map.addTilesetImage('tiles_set_kenney', 'tiles', 128, 128, 64, 64);
  // map.setTileSize(128,128);
  // map.addTilesetImage('data/kenney_medievalrtspack/Tilesheet/medieval_tilesheet.png', 'tiles', 64, 64)
  // map.tileWidth = 64;
  // map.tileHeight = 64;
  //  0 is important
  let layer = map.createLayer(0);

  //  Scroll it
  // layer.scale.set(0.5,0.5)
  // layer.resizeWorld();
  layer.resize(MAP_WIDTH, MAP_HEIGHT);
  layer.inputEnabled = true;

  this.map = map;
  this.layer = layer;

  return [map, layer];
}


GameMap.prototype.noise = function(nx, ny) {
  return this.gen.noise2D(nx, ny) / 2 + 0.5;
}

GameMap.prototype.create_noise_map = function (width, height, freq=1, pow=3){
  // See tutorial https://www.redblobgames.com/maps/terrain-from-noise/
  // Set new random seed;
  // freq: The frequency of the noise
  // pow: How flat vallyes are
  this.gen = new SimplexNoise();
  var data = [];
  let noise_xy;
  let f = freq;
  for (var y = 0; y < height; y++) {
    data.push([]);
    for (var x = 0; x < width; x++) {
      var nx = x/width - 0.5, ny = y/height - 0.5;
      // Add noise with two frequencies
      noise_xy = 1* this.noise(f*3*nx, f*3*ny);
      noise_xy += 0.5 * this.noise(f*4*nx, f*4*ny);
      noise_xy += 0.25 * this.noise(f*6*nx, f*6*ny);
      // noise_xy /= 1.5;
      noise_xy = Math.pow(noise_xy, pow);
      data[y].push(noise_xy);
    }
  }
  return data;
}

GameMap.prototype.get_biome = function(e, m){

  if (e > 2.1) {
    if (m > 0.7) return 'snow_a';
    return 'stone_a';
  }
  else if (e > 1.8) {
    return 'stone_a';
  }
  // else if (n > 1.3) {
    // tex = 'stone_lightest';
  // }
  else if (e > 0.4) {
    if (m>1.3) return 'forest_d';
    if (m>1.2) return 'forest_c';
    if (m>1.1) return 'forest_b';
    if (m>1.05) return 'forest_a';
    return 'grass_a';
  }

  else if (e < 0.1) {
    if (m > 0.5) return 'water_b';
    // if (m < 0.2) return 'sand_a';
    return 'grass_a';
  }
  // else if (e < 0.12) {
  //   if (m>0.5) return 'forest_c';
  //   return 'grass_a';
  // }
  else if (e < 0.3) {
    if (m < 0.3) return 'sand_a';
    return 'grass_a';
  }

  else {
    if (Math.random()<0.1) {
      return 'berry_a';
    }
    else {
      return 'grass_a';
    }
  }

}

GameMap.prototype.getCSVMap = function(elevation_map, moisture_map) {
  /* Generate the map from noise maps
  Converts values in tiles, according to biome map
  Returns csv map with tile inidcies
  */
  var data = '';

  for (var y = 0; y < MAP_HEIGHT_TILES; y++)
  {
      for (var x = 0; x < MAP_WIDTH_TILES; x++)
      {
          let e = elevation_map[y][x];
          let m = moisture_map[y][x];
          let tex = this.get_biome(e, m);


          let tileindex = this.tile_texture_ids[tex];
          if (tileindex==undefined) {
            console.log("No tile for given e and m:");
            console.log(e, m);
          }
          data += tileindex.toString();

          if (x < (MAP_WIDTH_TILES-1))
          {
              data += ',';
          }
      }

      if (y < (MAP_HEIGHT_TILES-1))
      {
          data += "\n";
      }
    }
    return data;
}

GameMap.prototype.getTileAtXY = function(x, y) {
  col = layer.getTileX(Math.abs(x));
  row = layer.getTileY(Math.abs(y));
  tile = gamemap.map.layers[0].data[row][col];
  return tile;
}

Phaser.Tilemap.prototype.is_tile_accessible = function(row, col) {
  tile_id = gamemap.map.layers[0].data[row][col].index
  return gamemap.walkables.includes(tile_id);
}

Phaser.Tilemap.prototype.getRandomAccessibleTile = function() {
  let valid_tile_found = false;
  while (!valid_tile_found) {
    row = game.rnd.between(0, MAP_HEIGHT_TILES-1);
    col = game.rnd.between(0, MAP_WIDTH_TILES-1);
    // console.log(row, col)
    if (this.is_tile_accessible(row, col)) {
      valid_tile_found = true;
    }
  }
  return {row: row, col: col}
}

Phaser.Tilemap.prototype.getRandomAccessiblePoint = function() {
  let valid_tile_found = false;
  while (!valid_tile_found) {
    row = game.rnd.between(0, MAP_HEIGHT_TILES-1);
    col = game.rnd.between(0, MAP_WIDTH_TILES-1);
    // console.log(row, col)
    if (this.is_tile_accessible(row, col)) {
      valid_tile_found = true;
    }
  }
  tile_coord = {row: row, col: col};
  position = get_point_from_tile_coord(tile_coord);
  return position;
}

/*
Return a random, accessible point in given range
Input:
- point: poistion around with to look
- Range: In pixel
*/
Phaser.Tilemap.prototype.getRandomAccessiblePointInRange = function(point, range) {

  // console.log(point);
  let valid_tile_found = false;
  let candidates = layer.getTiles(point.x-(range/2), point.y-(range/2), range, range);
  // console.log(candidates);
  let counter = 0;
  let candidate = null;
  while ((!valid_tile_found) & (counter<100)) {
    index = Math.floor(Math.random()*candidates.length);
    // console.log(index);
    candidate = candidates[index];
    // let tile_coords = get_tile_coord_from_point(new Phaser.Point(candidate.x, candidate.y))
    // console.log(row, col)
    if (this.is_tile_accessible(candidate.y, candidate.x)) {
      valid_tile_found = true;
      // console.log(candidate.y, candidate.x);
    }
    counter += 1;
  }
  tile_coord = {row: candidate.y, col: candidate.x};
  let target_position = get_point_from_tile_coord(tile_coord);
  if (counter>=100) {
    console.log("could not fine point, candidates:", candidates);
    target_position = this.getRandomAccessiblePoint();
  }
  // console.log(target_position);
  return target_position;
}

Phaser.Tilemap.prototype.check_tile_in_range = function(point, tileid, range) {

  let candidates = layer.getTiles(point.x-(range/2), point.y-(range/2), range, range)
  for (var i=0; i<candidates.length; i++){
    let candidate = candidates[i];
    if (candidate.index == tileid) {
      tile_coord = {row: candidate.y, col: candidate.x};
      target_position = get_point_from_tile_coord(tile_coord);
      return target_position;
    }
  }
  return false;
}

// // MAP GENERATION
// var gen = new SimplexNoise();
//
// function noise(nx, ny) {
//   // Rescale from -1.0:+1.0 to 0.0:1.0
//   return gen.noise2D(nx, ny) / 2 + 0.5;
// }
//
// function create_noise_map(width, height){
//   // See tutorial https://www.redblobgames.com/maps/terrain-from-noise/
//   data = [];
//   for (var y = 0; y < height; y++) {
//     data.push([]);
//     for (var x = 0; x < width; x++) {
//       var nx = x/width - 0.5, ny = y/height - 0.5;
//       // Add noise with two frequencies
//       noise_xy = 1* noise(3*nx, 3*ny);
//       noise_xy += 0.5 * noise(4*nx, 4*ny);
//       noise_xy += 0.25 * noise(6*nx, 6*ny);
//       // noise_xy /= 1.5;
//       noise_xy = Math.pow(noise_xy, 3);
//       data[y].push(noise_xy);
//     }
//   }
//
//   return data;
// }
