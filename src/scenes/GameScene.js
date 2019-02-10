// import Mario from '../sprites/Mario';
// import Goomba from '../sprites/Goomba';
import GameMap from "../helpers/map.js";
import { CameraManager } from "../helpers/camera";
import { config as cfg } from "../config";

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {}

    create() {
        // This scene is either called to run in attract mode in the background of the title screen
        // or for actual gameplay. Attract mode is based on a JSON-recording.
        // if (this.registry.get("attractMode")) {
        //     this.attractMode = {
        //         recording: this.sys.cache.json.entries.entries.attractMode,
        //         current: 0,
        //         time: 0
        //     };
        // } else {
        //     this.attractMode = null;
        // }
        console.log("Game scene");

        // Add and play the music
        // this.music = this.sound.add("overworld");
        // this.music.play({
        //     loop: true
        // });

        // LOAD MAP
        // const map = new GameMap(this, mapConfig);
        this.map = new GameMap(this);
        this.map.createMap();

        // CAMERA
        //  The world is 3200 x 600 in size
        // this.cameras.add
        // this.cameras.main.setBounds(0, 0, 3200, 600).setName("main");

        // console.log(this.cameras);
        // this.cameras = new CameraManager(this);

        // let config = this.game.config;
        // let camera = new Phaser.Cameras.Scene2D.Camera(config);
        // console.log(this.cameras);
        // this.cameras.addExisting(camera, true);
        // this.cameras.add(0, 0, 1000, 1000, true, "main");
        // console.log(this.cameras.main);
        // console.log(this.cameras);

        // this.cameras.remove(this.cameras.main);
        // let camera = new MainCamera(
        //     0,
        //     0,
        //     this.game.config.width,
        //     this.game.config.height
        // );
        // this.cameras.addExisting(camera, true);

        // // this.cameras.main = camera;
        // this.cameras.addExisting(camera, true);
        // console.log(camera);

        this.cameraManager = new CameraManager(this);
        this.cameraManager.addAllCameras();

        // this.minimap.scrollX = 1600;
        // this.minimap.scrollY = 300;

        // var minimapControlConfig = {
        //     camera: this.cameras.getCamera("mini"),
        //     left: this.cursors.left,
        //     right: this.cursors.right,
        //     up: this.cursors.up,
        //     down: this.cursors.down,
        //     zoomIn: this.input.keyboard.addKey(
        //         Phaser.Input.Keyboard.KeyCodes.Q
        //     ),
        //     zoomOut: this.input.keyboard.addKey(
        //         Phaser.Input.Keyboard.KeyCodes.E
        //     ),
        //     acceleration: 0.06,
        //     drag: 0.0005,
        //     maxSpeed: 1.0
        // };

        // this.controlsMini = new Phaser.Cameras.Controls.SmoothedKeyControl(
        //     minimapControlConfig
        // );
    }

    update(time, delta) {
        if (this.cursors.left.isDown) {
            // console.log("left");
            // this.cameras.main.setScroll();
            // this.cameras.main.scrollX += 1;
            // console.log(this.cameras);
        }

        // Camera movement
        this.controls.update(delta);
        // Limit camera zoom
        this.cameras.main.setZoom(Math.min(this.cameras.main.zoom, 0.5));
        this.cameras.main.setZoom(Math.max(this.cameras.main.zoom, 0.3));

        // this.controlsMini.update(delta);
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
