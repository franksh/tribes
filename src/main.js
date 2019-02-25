import "phaser";
import BootScene from "./scenes/BootScene";
import GameScene from "./scenes/GameScene";
import HudScene from "./scenes/HudScene";
import { config as cfg } from "./config";

// FUZZY TEXT HACK

let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;

//  const gameConfig = {
//      width: clientWidth,
//      height: clientHeight,
//      resolution: PIXEL_RATIO,
//      "callbacks.postBoot": function() {
//          document.getElementsByTagName("canvas")[0].style.width = clientWidth + "px"
//          document.getElementsByTagName("canvas")[0].style.height = clientHeight + "px"
//      }
//  };

export const PIXEL_RATIO = (function() {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        // The backing store size in relation to the canvas element
        bsr =
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio ||
            1;

    return dpr / bsr;
})();

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    // type: Phaser.WEBGL,
    type: Phaser.AUTO,
    // pixelArt: true,
    // roundPixels: true,
    scale: {
        parent: "game-container",
        width: cfg.viewport.WIDTH,
        height: cfg.viewport.HEIGHT
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH
    },
    // resolution: PIXEL_RATIO,
    // "callbacks.postBoot": function() {
    //     document.getElementsByTagName("canvas")[0].style.width =
    //         clientWidth + "px";
    //     document.getElementsByTagName("canvas")[0].style.height =
    //         clientHeight + "px";
    // },

    // renderer: Phaser.CANVAS,
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

// game.scale.pageAlignHorizontally = true;
// game.scale.pageAlignVertically = true;
// game.scale.refresh();
