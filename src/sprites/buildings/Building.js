import { EEXIST } from "constants";

/*
Generic building class that extends Phaser sprites.
Classes for specific buildings extend this class.
*/

export default class Building extends Phaser.GameObjects.Sprite {
    constructor(scene, tile, key, tribeId) {
        // Get sprite config
        let objConfig = scene.getGameObjectConfig(key);
        const { spriteKey, scaleX, scaleY, tilesetID } = objConfig;
        // Get position of tile
        let { x, y } = scene.map.getTileCenter(tile);

        // Create sprite
        super(scene, x, y, spriteKey);

        // Set config properties
        this.setScale(scaleX, scaleY);

        // Set other properties
        this.tile = tile;
        this.tribe = scene.getTribe(tribeId);
        this.tilesetId = tilesetID;

        // Handle effects on other objects
        // Add to scene

        scene.add.existing(this);
        // Building map
        scene.map.putBuildingTileAt(tile.x, tile.y, tilesetID);

        let ee = scene.sys.events;
        ee.emit("buildingCreated", this);

        // Pathfinder
        // scene.pathfinder.updateGrid();
        // TODO: Delete all saved paths, force recalculation

        // Add other properties
        // Example:
        this.alive = true;
    }
}
