// import { EasyStar } from "../../node_modules/easystarjs/bin/easystar-0.4.3";
// import "../../node_modules/easystarjs/bin/easystar-0.4.3";
import { config } from "../config";

export default class Pathfinder {
    constructor(scene) {
        this.scene = scene;
        // this.easystar = new EasyStar.js();
        // for node.js
        var easystarjs = require("easystarjs");
        this.easystar = new easystarjs.js();

        this.easystar.enableDiagonals();
        this.easystar.disableCornerCutting();

        this.initializeMap();
    }

    initializeMap() {
        // Get Tile ID Grid
        var grid = [];
        for (let i = 0; i < config.MAP_HEIGHT_TILES; i++) {
            grid.push([]);
            for (let j = 0; j < config.MAP_WIDTH_TILES; j++) {
                grid[i].push(this.scene.map.getTileAt(j, i).index);
            }
        }
        this.easystar.setGrid(grid);

        // Get Accessible Tiles
        let accessibles = this.scene.map.accessibles;
        this.easystar.setAcceptableTiles(accessibles);

        // setTimeout(() => {
        //     this.findPathAndLog(0, 0, 2, 2);
        // }, 2000);
    }

    findPath(fromX, fromY, toX, toY, callback) {
        this.easystar.findPath(fromX, fromY, toX, toY, callback);
        this.easystar.calculate();
    }

    findPathAndLog(fromX, fromY, toX, toY) {
        this.easystar.findPath(fromX, fromY, toX, toY, function(path) {
            if (path === null) {
                console.log("No path");
            } else {
                console.log(path);
            }
        });
        this.easystar.calculate();
    }
}
