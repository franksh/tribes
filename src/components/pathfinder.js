import { config } from "../config";

export default class Pathfinder {
    constructor(scene) {
        this.scene = scene;

        // Load easystar
        var easystarjs = require("easystarjs");
        this.easystar = new easystarjs.js();

        // Configure easystar
        // Here: accessible=0, otherwise1
        let accessibles = [0];
        this.easystar.setAcceptableTiles(accessibles);
        this.easystar.enableDiagonals();
        this.easystar.disableCornerCutting();

        // Internal copy of grid
        this.grid = undefined;

        // Initialize
        this.initializeMap();
        this.initializeListeners();
    }

    initializeMap() {
        this.updateGridFull();
    }

    initializeListeners() {
        let ee = this.scene.sys.events;
        ee.on("buildingCreated", this.updateGridSingleTile, this);
    }

    emitPathfindingUpdateEvent(tile = undefined) {
        let ee = this.scene.sys.events;
        ee.emit("pathfindingGridUpdated", tile);
    }

    /*
    Update the full grid from scratch
    */
    updateGridFull() {
        // Get Tile ID Grid
        var grid = [];
        for (let i = 0; i < config.MAP_HEIGHT_TILES; i++) {
            grid.push([]);
            for (let j = 0; j < config.MAP_WIDTH_TILES; j++) {
                if (this.scene.map.isTileAccessibleAt(j, i)) grid[i].push(0);
                else grid[i].push(1);
            }
        }
        this.easystar.setGrid(grid);
        this.grid = grid;

        this.emitPathfindingUpdateEvent();
    }

    /*
    Update grid when only a single tile chances.
    (More efficient in this case)
    */
    updateGridSingleTile(entity) {
        let tile = entity.tile;
        let { x, y } = tile;
        if (this.scene.map.isTileAccessibleAt(x, y)) {
            this.grid[y][x] = 0;
        } else {
            this.grid[y][x] = 1;
        }
        this.easystar.setGrid(this.grid);

        this.emitPathfindingUpdateEvent(tile);
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
