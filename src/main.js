import "phaser";
import BootScene from "./scenes/BootScene";
import GameScene from "./scenes/GameScene";
import HudScene from "./scenes/HudScene";
import { config as cfg } from "./config";

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    // type: Phaser.WEBGL,
    type: Phaser.AUTO,
    // pixelArt: true,
    // roundPixels: true,
    parent: "game-container",
    width: cfg.viewport.WIDTH,
    height: cfg.viewport.HEIGHT,
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

        GameScene,
        HudScene
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
