/*
Generic building class that extends Phaser sprites.
Classes for specific buildings extend this class.
*/

export default class Building extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        let objConfig = scene.getGameObjectConfig(key);
        const { spriteKey, scaleX, scaleY } = objConfig;
        super(scene, x, y, spriteKey);
        // config.scene.physics.world.enable(this);

        this.setScale(scaleX, scaleY);

        scene.add.existing(this);

        this.alive = true;
    }
}
