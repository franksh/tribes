import "phaser";
import BootScene from "./scenes/BootScene";
import GameScene from "./scenes/GameScene";
import TitleScene from "./scenes/TitleScene";
import { config as cfg } from "./config";

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    // type: Phaser.WEBGL,
    type: Phaser.AUTO,
    // pixelArt: true,
    // roundPixels: true,
    parent: "game-container",
    width: cfg.TILE_WIDTH * cfg.MAP_WIDTH_TILES,
    height: cfg.TILE_HEIGHT * cfg.MAP_HEIGHT_TILES,
    // physics: {
    //     default: "arcade",
    //     arcade: {
    //         gravity: {
    //             y: 800
    //         },
    //         debug: false
    //     }
    // },
    scene: [
        BootScene,
        // TitleScene,
        GameScene
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
