// import Mario from '../sprites/Mario';
// import Goomba from '../sprites/Goomba';
import GameMap from "../components/map.js";
import Pathfinder from "../components/pathfinder";
import { CameraManager } from "../components/camera";
import { config as cfg } from "../config";
import { HQ } from "../sprites/buildings/HQ";
import { Worker } from "../sprites/units/Worker";
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
        this.map = new GameMap(this);
        this.map.createMap();
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

        let tribe1 = new Tribe(1, true);

        this.tryCreateBuilding("hq", this.map.getTileAt(0, 0), tribe1.id);
        // CREATE Test OBJECTS
        new HQ({
            gameScene: this,
            tile: this.map.getTileAt(1, 1),
            tribe: tribe1
        });

        let worker = this.tryCreateUnit(
            "worker",
            this.map.getTileAt(20, 10),
            tribe1.id
        );
        for (let i = 0; i <= 20; i++) {
            this.createUnitRandomTile("worker", 1);
        }
        let targetTile = this.map.getTileAt(10, 10);
        worker.setDestination(targetTile);
        // worker.moveToTile(targetTile);
        // this.physics.add.image(2000, 1000, 'worker1');

        console.log(worker);
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

    tryCreateBuilding(key, tile, tribe) {
        // Check if tile is builadble
        if (!this.map.isTileBuildable(tile)) return false;

        // TODO: Check if resources suffice

        // If success: Build at location
        this.createBuilding(key, tile, tribe);
        return true;
    }

    createBuilding(key, tile, tribe) {
        // Build entity at location
        if (key === "hq") {
            new HQ({ gameScene: this, tile, tribe });
        }
        return true;
    }

    tryCreateUnit(key, tile, tribe) {
        if (!this.map.isTileAccessible(tile)) return false;
        return this.createUnit(key, tile, tribe);
    }

    createUnit(key, tile, tribe) {
        if (key === "worker") {
            return new Worker({ gameScene: this, tile, tribe });
        }
    }

    createUnitRandomTile(key, tribe) {
        let tile = this.map.getRandomAccessibleTile();
        return this.createUnit(key, tile, tribe);
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
