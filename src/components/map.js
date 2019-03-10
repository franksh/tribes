import "../config";
import { config } from "../config";
import SimplexNoise from "simplex-noise/simplex-noise";

export default class GameMap extends Phaser.Tilemaps.Tilemap {
    constructor(scene, mapConfig) {
        // Create the Tilmap Object with prepare config data
        // Map itself is created in initialize
        let mapData = new Phaser.Tilemaps.MapData(mapConfig);
        super(scene, mapData);
        this.scene = scene;
        this.mapConfig = mapConfig;

        this.initialize();
    }

    /* 
    Set further properties of the map,
    and finally generate map.
     */
    initialize() {
        this.tile_texture_ids = {
            grass_a: 0,
            grass_b: 1,
            sand_a: 2,
            sand_b: 3,
            water_a: 36,
            water_b: 37,
            snow_a: 38,
            snow_b: 39,
            forest_a: 72,
            forest_b: 73,
            forest_c: 74,
            forest_d: 75,
            stone_a: 20,
            stone_item_lightest: 76,
            stone_item_heavy: 79,
            berry_a: 100
        };
        this.accessibles = [0, 1, 2, 3, 100];

        this.noise_gen = new SimplexNoise();

        // The following padding is to account for "tile extrusion", see
        // https://github.com/sporadic-labs/tile-extruder
        // Needs to be done because the used tilesheet was extruded.
        let TILE_MARGIN_EXTRUDED = config.TILE_MARGIN + 1;
        let TILE_SPACING_EXTRUDED = config.TILE_SPACING + 2;

        this.tileset = this.addTilesetImage(
            "tiles",
            null,
            config.TILE_WIDTH,
            config.TILE_HEIGHT,
            TILE_MARGIN_EXTRUDED,
            TILE_SPACING_EXTRUDED
        );

        // Create map
        this.createMap();
    }

    createMap() {
        if (config.levelPremade) {
            this.createPremadeMap();
        } else {
            this.generateRandomMap();
            // this.createSimpleMap();
            // this.createEmptyMap();
            // this.createObstacleMap();
        }
    }

    createPremadeMap() {
        // Create each layer in Tilemap data
        // Make: GroundLayer, ResourceLayer
        let tilemapData = this.mapConfig.tilemapData;
        tilemapData.layers.forEach(this.makeLayer.bind(this));

        // Make: BuildingLayer
        this.makeBuildingLayer();
    }

    /* Create the layers in the tilemap.
    Usually these are:
    - Ground layer
    - Resource layer 
    */
    makeLayer(layerRaw) {
        let data = layerRaw.data;

        // Calculate layer data
        let layerData = [];
        // Subtract 1 from all values in data, bc JSON
        for (let i in data) data[i] = data[i] - 1;
        // Reshape the array (1D) to 2D and store
        let width = layerRaw.width;
        while (data.length) layerData.push(data.splice(0, width));

        // Generate layer and save
        let layerName = layerRaw.name;
        let layer = this.createBlankDynamicLayer(layerName, this.tileset);
        layer.putTilesAt(layerData, 0, 0);
        if (layerName === "GroundLayer") {
            layer = this.convertLayerToStatic(layer);
        }
    }

    // Layer for buildings, etc.
    makeBuildingLayer() {
        let layer = this.createBlankDynamicLayer("BuildingLayer", this.tileset);
        // console.log(layer);
    }

    // TILE UTILITY FUNCTIONS

    // Accessible = No ground obstacle and no resource present
    isTileAccessible(tile) {
        let tile_id = tile.index;
        let isAccessible =
            // Ground accessible
            this.accessibles.includes(tile_id) &
            // + No resource present
            (this.getResourceTileAt(tile.x, tile.y) === null) &
            // + No buildings present
            (this.getBuildingTileAt(tile.x, tile.y) === null);
        return isAccessible;
    }

    isTileAccessibleAt(i, j) {
        let tile = this.getGroundTileAt(i, j);
        return this.isTileAccessible(tile);
    }

    // Buildable = No ground obstacle and no resource present
    // At the moment these are the same
    isTileBuildable(tile) {
        return this.isTileAccessible(tile);
    }

    // Returns the center of the tile
    getTileCenter(tile) {
        let x = tile.pixelX + this.mapConfig.tileWidth / 2;
        let y = tile.pixelY + this.mapConfig.tileHeight / 2;
        return { x, y };
    }

    // Returns ground tile at coordinates, wrapper
    getGroundTileAtWorldXY(x, y) {
        return this.getTileAtWorldXY(
            x,
            y,
            false,
            this.scene.cameras.main,
            "GroundLayer"
        );
    }

    getGroundTileAt(x, y) {
        return this.getTileAt(x, y, null, "GroundLayer");
    }

    // Returns all tiles in a cirlce around x, y
    getGroundTilesCircleAt(x, y, radius) {
        // Create a circle with this as center
        let tile = this.getGroundTileAt(x, y);
        let coords = this.getTileCenter(tile);
        let circle = new Phaser.Geom.Circle(coords.x, coords.y, radius);
        // Get tile within circle
        let tiles = this.getTilesWithinShape(
            circle,
            undefined,
            this.scene.cameras.main,
            "GroundLayer"
        );
        return tiles;
    }

    getRandomAccessibleTileInCircle(x, y, radius) {
        let tiles = this.getGroundTilesCircleAt(x, y, radius);
        let tilesAccessible = [];
        for (let tile of tiles) {
            if (this.isTileAccessible(tile)) tilesAccessible.push(tile);
        }
        if (tilesAccessible.length == 0) return null;

        let randIdx = Phaser.Math.Between(0, tilesAccessible.length - 1);
        return tilesAccessible[randIdx];
    }

    getResourceTileAtWorldXY(x, y) {
        return this.getTileAtWorldXY(
            x,
            y,
            false,
            this.scene.cameras.main,
            "ResourceLayer"
        );
    }

    getResourceTileAt(x, y) {
        return this.getTileAt(x, y, null, "ResourceLayer");
    }

    getBuildingTileAtWorldXY(x, y) {
        return this.getTileAtWorldXY(
            x,
            y,
            false,
            this.scene.cameras.main,
            "BuildingLayer"
        );
    }

    getBuildingTileAt(x, y) {
        return this.getTileAt(x, y, null, "BuildingLayer");
    }

    putBuildingTileAt(x, y, tilesetID) {
        this.putTileAt(tilesetID, x, y, false, "BuildingLayer");
        // console.log(x, y, tilesetID);
    }

    getRandomAccessibleTile() {
        let tile = undefined;
        while (!tile) {
            let x = Phaser.Math.Between(0, config.MAP_WIDTH_TILES - 1);
            let y = Phaser.Math.Between(0, config.MAP_HEIGHT_TILES - 1);
            // console.log(row, col)
            if (this.isTileAccessibleAt(x, y)) {
                tile = this.getGroundTileAt(x, y);
            }
        }
        return tile;
    }

    // MAP GENERATING FUNCTIONS

    // For testing purposes
    createSimpleMap() {
        const layerData = [
            [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 2, 3, 0, 0, 0, 1, 2, 3, 0],
            [0, 5, 6, 7, 0, 0, 0, 5, 6, 7, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 14, 13, 14, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 14, 14, 14, 14, 14, 0, 0, 0, 15],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15],
            [35, 36, 37, 0, 0, 0, 0, 0, 15, 15, 15],
            [39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39]
        ];
        let groundLayer = this.createBlankDynamicLayer(
            "GroundLayer",
            this.tileset
        );
        groundLayer.putTilesAt(layerData, 0, 0);
        groundLayer = this.convertLayerToStatic(groundLayer);
    }

    createEmptyMap() {
        let layerData = [];
        for (let i = 0; i < config.MAP_HEIGHT_TILES; i++) {
            layerData.push([]);
            for (let j = 0; j < config.MAP_WIDTH_TILES; j++) {
                layerData[i].push(0);
            }
        }
        let groundLayer = this.createBlankDynamicLayer(
            "GroundLayer",
            this.tileset
        );
        groundLayer.putTilesAt(layerData, 0, 0);
        groundLayer = this.convertLayerToStatic(groundLayer);
    }

    createObstacleMap() {
        let layerData = [];
        for (let i = 0; i < config.MAP_HEIGHT_TILES; i++) {
            layerData.push([]);
            for (let j = 0; j < config.MAP_WIDTH_TILES; j++) {
                if (((j == 10) & (i > 10)) | ((j == 13) & (i < 15))) {
                    layerData[i].push(20);
                } else {
                    layerData[i].push(0);
                }
            }
        }
        let groundLayer = this.createBlankDynamicLayer(
            "GroundLayer",
            this.tileset
        );
        groundLayer.putTilesAt(layerData, 0, 0);
        groundLayer = this.convertLayerToStatic(groundLayer);
    }

    generateRandomMap() {
        let elevation_map = this.createNoiseMap(
            config.MAP_WIDTH_TILES,
            config.MAP_HEIGHT_TILES,
            0.9
        );
        let moisture_map = this.createNoiseMap(
            config.MAP_WIDTH_TILES,
            config.MAP_HEIGHT_TILES,
            1.0,
            1.5
        );
        let layerData = this.getLayerDataFromMaps(elevation_map, moisture_map);

        let groundLayer = this.createBlankDynamicLayer(
            "GroundLayer",
            this.tileset
        );
        groundLayer.putTilesAt(layerData, 0, 0);
        groundLayer = this.convertLayerToStatic(groundLayer);
        // groundLayer = this.createStaticLayer("GroundLayer", this.tileset);
        // groundLayer.putTilesAt(layerData, 0, 0);
    }

    getNoise(nx, ny) {
        return this.noise_gen.noise2D(nx, ny) / 2 + 0.5;
    }

    createNoiseMap(width, height, freq = 1, pow = 3) {
        // See tutorial https://www.redblobgames.com/maps/terrain-from-noise/
        // Set new random seed;
        // freq: The frequency of the noise
        // pow: How flat vallyes are
        this.noise_gen = new SimplexNoise();
        var data = [];
        let noise_xy;
        let f = freq;
        for (var y = 0; y < height; y++) {
            data.push([]);
            for (var x = 0; x < width; x++) {
                var nx = x / width - 0.5,
                    ny = y / height - 0.5;
                // Add noise with two frequencies
                noise_xy = 1 * this.getNoise(f * 3 * nx, f * 3 * ny);
                noise_xy += 0.5 * this.getNoise(f * 4 * nx, f * 4 * ny);
                noise_xy += 0.25 * this.getNoise(f * 6 * nx, f * 6 * ny);
                // noise_xy /= 1.5;
                noise_xy = Math.pow(noise_xy, pow);
                data[y].push(noise_xy);
            }
        }
        return data;
    }

    getBiome(e, m) {
        if (e > 2.1) {
            if (m > 0.7) return "snow_a";
            return "stone_a";
        } else if (e > 1.8) {
            return "stone_a";
        }
        // else if (n > 1.3) {
        // tex = 'stone_lightest';
        // }
        else if (e > 0.4) {
            if (m > 1.3) return "forest_d";
            if (m > 1.2) return "forest_c";
            if (m > 1.1) return "forest_b";
            if (m > 1.05) return "forest_a";
            return "grass_a";
        } else if (e < 0.1) {
            if (m > 0.5) return "water_b";
            // if (m < 0.2) return 'sand_a';
            return "grass_a";
        }
        // else if (e < 0.12) {
        //   if (m>0.5) return 'forest_c';
        //   return 'grass_a';
        // }
        else if (e < 0.3) {
            if (m < 0.3) return "sand_a";
            return "grass_a";
        } else {
            if (Math.random() < 0.1) {
                return "berry_a";
            } else {
                return "grass_a";
            }
        }
    }

    /* Generate the map from noise maps
      Converts values in tiles, according to biome map
      Returns array map with tile inidcies
      */
    getLayerDataFromMaps(elevation_map, moisture_map) {
        var data = [];
        for (var y = 0; y < config.MAP_HEIGHT_TILES; y++) {
            data.push([]);
            for (var x = 0; x < config.MAP_WIDTH_TILES; x++) {
                let e = elevation_map[y][x];
                let m = moisture_map[y][x];
                let tex = this.getBiome(e, m);

                let tileindex = this.tile_texture_ids[tex];
                if (tileindex == undefined) {
                    console.log("No tile for given e and m:");
                    console.log(e, m);
                }
                data[y].push(tileindex);
            }
        }
        return data;
    }
}
