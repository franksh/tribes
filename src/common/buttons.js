export class TextButton extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, callback) {
        // const { key, entityKey, text, callback } = buttonCfg;

        super(scene, x, y, text, {});
        // this.entityKey = entityKey;

        this.setBackgroundColor("#555");
        this.setFill("#fff");
        this.setPadding(4, 2, 4, 2);
        this.isActive = false;
        // this.setStroke("#fff", 2);

        this.setInteractive({ useHandCursor: true })
            .on("pointerover", () => this.enterButtonHoverState())
            .on("pointerout", () => this.enterButtonRestState())
            .on("pointerdown", () => this.enterButtonActiveState())
            .on("pointerup", () => {
                this.enterButtonHoverState();
                this.toggleActive();
                callback();
            });
    }

    toggleActive() {
        this.isActive = !this.isActive;
    }

    setActive(status) {
        this.isActive = status;
        this.enterButtonRestState();
    }

    enterButtonHoverState() {
        this.setBackgroundColor("#990");
    }

    enterButtonRestState() {
        if (!this.isActive) {
            this.setBackgroundColor("#555");
        } else if (this.isActive) {
            this.setBackgroundColor("#099");
        }
    }

    enterButtonActiveState() {
        this.setBackgroundColor("#777");
    }
}

export class ImageButton extends Phaser.GameObjects.Image {
    constructor(scene, x, y, objectKey, callback) {
        // const { key, entityKey, text, callback } = buttonCfg;
        let gameScene = scene.scene.get("GameScene");
        let texture = gameScene.getGameObjectProperty(objectKey, "spriteKey");

        super(scene, x, y, texture, {});
        this.setScale(0.3);

        this.bounds = this.getBounds();
        this.graphics = scene.add.graphics();
        this.graphics.lineStyle(2, 0x111111, 1.0);
        this.graphics.strokeRectShape(this.bounds);
        this.graphics.fillStyle(0xaaaaaa, 1.0);
        this.graphics.fillRectShape(this.bounds);
        // this.setBackgroundColor("#555");
        // this.setFill("#fff");
        // this.setPadding(4, 2, 4, 2);
        this.isActive = false;
        // this.setStroke("#fff", 2);

        this.setInteractive({ useHandCursor: true })
            .on("pointerover", () => this.enterButtonHoverState())
            .on("pointerout", () => this.enterButtonRestState())
            .on("pointerdown", () => this.enterButtonActiveState())
            .on("pointerup", () => {
                this.enterButtonHoverState();
                this.toggleActive();
                callback();
            });
    }

    toggleActive() {
        this.isActive = !this.isActive;
    }

    setActive(status) {
        this.isActive = status;
        this.enterButtonRestState();
    }

    enterButtonHoverState() {
        // this.setTint(0xff0000);
        this.setAlpha(0.7);
        this.graphics.fillStyle(0xdddddd, 1.0);
        this.graphics.fillRectShape(this.bounds);

        // this.setBackgroundColor("#990");
    }

    enterButtonRestState() {
        if (!this.isActive) {
            // this.clearTint();
            this.setAlpha(1.0);
            this.graphics.fillStyle(0xaaaaaa, 1.0);
            this.graphics.fillRectShape(this.bounds);

            // this.setBackgroundColor("#555");
        } else if (this.isActive) {
            // this.setBackgroundColor("#099");
            this.graphics.fillStyle(0xaaaa00, 1.0);
            this.graphics.fillRectShape(this.bounds);
        }
    }

    enterButtonActiveState() {
        this.graphics.fillStyle(0x555555, 1.0);
        this.graphics.fillRectShape(this.bounds);
        // this.setBackgroundColor("#777");
    }
}
