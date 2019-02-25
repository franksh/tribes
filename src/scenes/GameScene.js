// import Mario from '../sprites/Mario';
// import Goomba from '../sprites/Goomba';
import GameMap from "../components/map.js";
import { CameraManager } from "../components/camera";
import { config as cfg } from "../config";
import { HQ } from "../sprites/buildings/HQ";
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

        // Game loop
        this.logicTimer = this.time.addEvent({
            delay: 1000,
            callback: this.updateLogic,
            callbackScope: this,
            timeScale: cfg.timeScale,
            loop: true
        });

        let tribe1 = new Tribe(1, true);

        // CREATE OBJECTS
        let hq = new HQ({
            gameScene: this,
            x: 100,
            y: 100,
            tribe: tribe1
        });

        console.log(this.children);
    }

    update(time, delta) {
        // Update Managers
        this.pointerManager.update();
        this.cameraManager.update();

        // Camera movement
        this.controls.update(delta);

        // this.controlsMini.update(delta);
    }

    updateLogic() {
        let children = this.children.list;
        // console.log(children);
        for (let i in children) {
            if ("updateLogic" in children[i]) {
                children[i].updateLogic();
            }
        }
        // for (let i = 0; i < children.length; i++) {
        //     if ("updateLogic" in children[i]) {
        //         children[i].updateLogic();
        //     }
        // }
        // console.log(
        //     this.logicTimer
        //         .getProgress()
        //         .toString()
        //         .substr(0, 4)
        // );
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

    createBuilding(key, x, y) {
        if (key === "hq") {
            let hq = new HQ({
                gameScene: this,
                x: x,
                y: y
            });
        }
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
