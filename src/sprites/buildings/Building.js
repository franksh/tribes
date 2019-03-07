/*
Generic building class that extends Phaser sprites.
Classes for specific buildings extend this class.
*/

export default class Building extends Phaser.GameObjects.Sprite {
    constructor(scene, tile, key, tribeId) {
        // Get sprite config
        let objConfig = scene.getGameObjectConfig(key);
        const { spriteKey, scaleX, scaleY } = objConfig;
        // Get position of tile
        let { x, y } = scene.map.getTileCenter(tile);

        // Create sprite
        super(scene, x, y, spriteKey);

        // Set config properties
        this.setScale(scaleX, scaleY);

        // Set other properties
        this.tile = tile;
        this.tribeId = tribeId;
        // Add to scene
        scene.add.existing(this);

        // Add other properties
        this.alive = true;
    }
}
