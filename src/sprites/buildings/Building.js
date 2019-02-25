/*
Generic building class that extends Phaser sprites.
Classes for specific buildings extend this class.
*/

export default class Building extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, tribe) {
        // Create sprite
        let objConfig = scene.getGameObjectConfig(key);
        const { spriteKey, scaleX, scaleY } = objConfig;
        super(scene, x, y, spriteKey);

        // Set config properties
        this.setScale(scaleX, scaleY);
        this.tribe = tribe;
        console.log(tribe);
        // Add to scene
        scene.add.existing(this);

        // Add other properties
        this.alive = true;
    }
}
