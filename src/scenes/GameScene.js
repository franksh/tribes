// import Mario from '../sprites/Mario';
// import Goomba from '../sprites/Goomba';
import GameMap from "../helpers/map.js";
import { CameraManager } from "../helpers/camera";
import { config as cfg } from "../config";

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: "GameScene"
        });
    }

    preload() {}

    create() {
        // This scene is either called to run in attract mode in the background of the title screen
        // or for actual gameplay. Attract mode is based on a JSON-recording.
        if (this.registry.get("attractMode")) {
            this.attractMode = {
                recording: this.sys.cache.json.entries.entries.attractMode,
                current: 0,
                time: 0
            };
        } else {
            this.attractMode = null;
        }
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
        // this.cameras.add(0, 0, 1000, 1000, true, "main");
        // console.log(this.cameras.main);
        // console.log(this);

        // let config = this.game.config;
        // let camera = new Phaser.Cameras.Scene2D.Camera(config);
        // // this.cameras.main = camera;
        // this.cameras.addExisting(camera, true);
        // console.log(this.cameras);

        this.cameras.main.setSize(800, 800);
        let cameraMargin = 2 * cfg.TILE_WIDTH;
        let mapWidth = cfg.MAP_WIDTH_TILES * cfg.TILE_WIDTH;
        let mapHeight = cfg.MAP_HEIGHT_TILES * cfg.TILE_HEIGHT;
        let mapRatio = mapHeight / mapWidth;

        this.cameras.main
            .setBounds(
                -cameraMargin,
                -cameraMargin,
                mapWidth + 2 * cameraMargin,
                mapHeight + 2 * cameraMargin
            )
            .setName("main")
            .setZoom(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();

        var controlConfig = {
            camera: this.cameras.main,
            left: this.cursors.left,
            right: this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            zoomIn: this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.Q
            ),
            zoomOut: this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.E
            ),
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
            controlConfig
        );
        // this.controls = new Phaser.Cameras.Controls.FixedKeyControl(
        //     controlConfig
        // );
        this.controls.start();

        //  The miniCam is 400px wide, so can display the whole world at a zoom of 0.2
        let minimapSize = 150; // width in pixels
        let minimapWidth = minimapSize;
        let minimapHeight = minimapSize * mapRatio;
        let minimapZoom = minimapSize / mapWidth;
        this.minimap = this.cameras
            .add(100, 10, minimapWidth, minimapHeight)
            .setBounds(0, 0, mapWidth, mapHeight)
            .setZoom(minimapZoom)
            .setName("mini");
        this.minimap.setBackgroundColor(0x002244);
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
            console.log("left");
            // this.cameras.main.setScroll();
            // this.cameras.main.scrollX += 1;
            // console.log(this.cameras);
        }

        this.controls.update(delta);
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

    cleanUp() {
        // Never called since 3.10 update (I called it from create before). If Everything is fine, I'll remove this method.
        // Scenes isn't properly destroyed yet.
        let ignore = [
            "sys",
            "anims",
            "cache",
            "registry",
            "sound",
            "textures",
            "events",
            "cameras",
            "make",
            "add",
            "scene",
            "children",
            "cameras3d",
            "time",
            "data",
            "input",
            "load",
            "tweens",
            "lights",
            "physics"
        ];
        let whatThisHad = [
            "sys",
            "anims",
            "cache",
            "registry",
            "sound",
            "textures",
            "events",
            "cameras",
            "make",
            "add",
            "scene",
            "children",
            "cameras3d",
            "time",
            "data",
            "input",
            "load",
            "tweens",
            "lights",
            "physics",
            "attractMode",
            "destinations",
            "rooms",
            "eightBit",
            "music",
            "map",
            "tileset",
            "groundLayer",
            "mario",
            "enemyGroup",
            "powerUps",
            "keys",
            "blockEmitter",
            "bounceTile",
            "levelTimer",
            "score",
            "finishLine",
            "touchControls"
        ];
        whatThisHad.forEach(key => {
            if (ignore.indexOf(key) === -1 && this[key]) {
                switch (key) {
                    case "enemyGroup":
                    case "music":
                    case "map":
                        this[key].destroy();
                        break;
                }
                this[key] = null;
            }
        });
    }
}

export default GameScene;
