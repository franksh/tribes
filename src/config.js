export const config = {
    TILE_WIDTH: 64,
    TILE_HEIGHT: 64,
    TILE_MARGIN: 32,
    TILE_SPACING: 32,
    MAP_WIDTH_TILES: 40, // make divisible by 4
    MAP_HEIGHT_TILES: 30,
    levelPremade: true,
    levelKey: "TestSimple",
    viewport: {
        WIDTH: 800,
        HEIGHT: 600
    },
    timeScale: 1,
    gameSpeed: 1,
    baseUnitSpeed: 200,
    gameObjects: {
        HQ: {
            key: "hq",
            spriteKey: "house_simple",
            tilesetID: 113,
            scaleX: 0.5,
            scaleY: 0.5,
            cost: 100
        },
        worker: {
            key: "worker",
            spriteKey: "worker1",
            scaleX: 0.8,
            scaleY: 0.8,
            speedMod: 0.5
        },
        gatherer: {
            key: "gatherer",
            spriteKey: "gatherer1",
            scaleX: 0.8,
            scaleY: 0.8,
            speedMod: 1
        }
    }
};

// var MAP_WIDTH_TILES = 100;
// var MAP_HEIGHT_TILES = 80;
// var TILE_WIDTH = 62;
// var TILE_HEIGHT = 62;
// var MAP_WIDTH = MAP_WIDTH_TILES * TILE_WIDTH;
// var MAP_HEIGHT = MAP_HEIGHT_TILES * TILE_HEIGHT;
