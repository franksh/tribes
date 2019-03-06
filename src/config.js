export const config = {
    TILE_WIDTH: 64,
    TILE_HEIGHT: 64,
    TILE_MARGIN: 32,
    TILE_SPACING: 32,
    MAP_WIDTH_TILES: 60, // make divisible by 4
    MAP_HEIGHT_TILES: 40,
    viewport: {
        WIDTH: 800,
        HEIGHT: 600
    },
    timeScale: 1,
    gameObjects: {
        HQ: {
            key: "hq",
            spriteKey: "house_simple",
            scaleX: 0.5,
            scaleY: 0.5,
            cost: 100
        }
    }
};

// var MAP_WIDTH_TILES = 100;
// var MAP_HEIGHT_TILES = 80;
// var TILE_WIDTH = 62;
// var TILE_HEIGHT = 62;
// var MAP_WIDTH = MAP_WIDTH_TILES * TILE_WIDTH;
// var MAP_HEIGHT = MAP_HEIGHT_TILES * TILE_HEIGHT;
