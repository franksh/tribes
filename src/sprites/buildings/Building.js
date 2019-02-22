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

        // start still and wait until needed
        // this.body
        //     .setVelocity(0, 0)
        //     .setBounce(0, 0)
        //     .setCollideWorldBounds(false);
        // this.body.allowGravity = false;
        // this.beenSeen = false;

        // Standard sprite is 16x16 pixels with a smaller body
        // this.body.setSize(12, 12);
        // this.body.offset.set(10, 12);
    }
}
