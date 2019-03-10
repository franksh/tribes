// import Mario from '../sprites/Mario';
// import Goomba from '../sprites/Goomba';
import GameMap from "../components/map.js";
import Pathfinder from "../components/pathfinder";
import { CameraManager } from "../components/camera";
import { config as cfg } from "../config";
import { HQ } from "../sprites/buildings/HQ";
import { Worker } from "../sprites/units/Worker";
import { Gatherer } from "../sprites/units/Gatherer";

import Tribe from "../sprites/Tribe";
// import MyPointer from "../components/pointer";
import { PointerManager } from "../components/pointer";
import _ from "lodash";

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {}

    create() {
        // SET UP MANAGERS
        // Map
        // this.map = new GameMap(this, cfg.levelKey);
        // this.map.createMap();
        let mapConfig = this.loadMapConfig();
        this.map = new GameMap(this, mapConfig);
        // Camera
        this.cameraManager = new CameraManager(this);
        this.cameraManager.addAllCameras();
        // Pointer
        this.pointerManager = new PointerManager(this);
        // Pathfinding
        this.pathfinder = new Pathfinder(this);

        // Game loop
        this.logicTimer = this.time.addEvent({
            delay: 500,
            callback: this.updateLogic,
            callbackScope: this,
            timeScale: cfg.timeScale,
            loop: true
        });

        this.tribes = [];
        let tribe1 = new Tribe(1, true);
        this.tribes.push(tribe1);

        console.log(this);

        // // CREATE Test OBJECTS
        // this.tryCreateBuilding("hq", this.map.getGroundTileAt(0, 0), tribe1.id);

        // let worker = this.tryCreateUnit(
        //     "worker",
        //     this.map.getGroundTileAt(20, 10),
        //     tribe1.id
        // );

        // Create 20 gatherers
        // for (let i = 0; i <= 20; i++) {
        //     this.createUnitRandomTile("gatherer", 1);
        // }

        // let targetTile = this.map.getGroundTileAt(10, 10);
        // console.log(targetTile);
        // worker.setDestination(targetTile);
        // console.log(worker);

        // worker.moveToTile(targetTile);
        // this.physics.add.image(2000, 1000, 'worker1');

        console.log(this);
    }

    update(time, delta) {
        // Update Managers
        this.pointerManager.update();
        this.cameraManager.update();

        // Camera movement
        this.controls.update(delta);

        this.children.list.forEach(child => {
            child.update(time, delta);
        });
        // this.controlsMini.update(delta);
    }

    updateLogic() {
        // let children = this.children.list;
        // for (let i in children) {
        //     if ("updateLogic" in children[i]) {
        //         children[i].updateLogic();
        //     }
        // }
        this.children.list.forEach(child => {
            if ("updateLogic" in child) child.updateLogic();
        });
    }

    tileCollision(sprite, tile) {}

    /* * To be removed, supported natively now:
     * setCollisionByProperty(map) {
      Object.keys(map.tilesets[0].tileProperties).forEach(
        (id) => {

          if (map.tilesets[0].tileProperties[id].collide) {
            map.setCollision(parseInt(id) + 1);
          }
        }
      )
    } */

    tryCreateBuilding(key, tile, tribeId) {
        // Check if tile is builadble
        if (!this.map.isTileBuildable(tile)) return false;

        // TODO: Check if resources suffice

        // If success: Build at location
        this.createBuilding(key, tile, tribeId);
        return true;
    }

    createBuilding(key, tile, tribeId) {
        // Build entity at location
        if (key === "hq") {
            new HQ({ gameScene: this, tile, tribeId });
        }
        return true;
    }

    tryCreateUnit(key, tile, tribeId) {
        if (!this.map.isTileAccessible(tile)) return false;
        return this.createUnit(key, tile, tribeId);
    }

    createUnit(key, tile, tribeId) {
        if (key === "worker") {
            return new Worker({ gameScene: this, tile, tribeId });
        }
        if (key === "gatherer") {
            return new Gatherer({ gameScene: this, tile, tribeId });
        }
    }

    createUnitRandomTile(key, tribeId) {
        let tile = this.map.getRandomAccessibleTile();
        return this.createUnit(key, tile, tribeId);
    }

    getTribe(id) {
        return this.tribes.filter(function(tribe) {
            return tribe.id === id;
        })[0];
    }

    getGameObjectConfig(key) {
        let objConfig = _.filter(cfg.gameObjects, function(item) {
            return item.key === key;
        });
        if (objConfig) return objConfig[0];
    }

    getGameObjectProperty(key, property) {
        let objConfig = this.getGameObjectConfig(key);
        return objConfig[property];
    }

    loadMapConfig() {
        var levelKey = cfg.levelKey;
        let mapConfig = {};
        if (cfg.levelPremade) {
            // let layerData = this.parseLevelCSVToArray(levelKey);
            let tilemapData = this.parseLevelData(levelKey);
            mapConfig.tilemapData = tilemapData;
            mapConfig.width = tilemapData.layers[0].width;
            mapConfig.height = tilemapData.layers[0].height;
            mapConfig.tileWidth = tilemapData.tilewidth;
            mapConfig.tileHeight = tilemapData.tileheight;
        } else {
            mapConfig.levelKey = levelKey;
            mapConfig.width = cfg.MAP_WIDTH_TILES;
            mapConfig.height = cfg.MAP_HEIGHT_TILES;
            mapConfig.tileWidth = cfg.TILE_WIDTH;
            mapConfig.tileHeight = cfg.TILE_HEIGHT;
        }
        return mapConfig;
    }

    parseLevelData(levelKey) {
        let mapKey = "map" + levelKey;
        var tilemapData = this.cache.tilemap.get(mapKey).data;
        return tilemapData;
    }

    parseLevelCSVToArray(levelKey) {
        let mapKey = "map" + levelKey;
        var layerDataStr = this.cache.tilemap.get(mapKey).data;
        var lineStrings = layerDataStr.split("\n");
        var layerData = [];
        for (let lineStr of lineStrings) {
            if (lineStr.length > 1) {
                let lineData = [];
                for (let char of lineStr.split(",")) {
                    lineData.push(parseInt(char));
                }
                layerData.push(lineData);
            }
        }
        return layerData;
    }

    updateScore(score) {}

    removeFlag(step = 0) {}

    toggleTouch() {}

    record(delta) {}

    parseObjectLayers() {
        // The map has one object layer with enemies as stamped tiles,
        // each tile has properties containing info on what enemy it represents.
    }

    createHUD() {}
}

export default GameScene;
