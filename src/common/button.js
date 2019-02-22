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

export class Panel {
    constructor(scene, x, y, width, height) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.elements = [];
        this.elHeight = 30;
        this.elWidth = 100;

        this.elPerCol = parseInt(height / this.elHeight);
    }

    // Returns the position of the next button in panel
    getNextButtonPosition() {
        let numberElements = this.elements.length;
        let x =
            this.x + parseInt(numberElements / this.elPerCol) * this.elWidth;
        let y = this.y + (numberElements % this.elPerCol) * this.elHeight;
        return { x, y };
    }

    addButton(text, callback) {
        // Create BUtton
        let pos = this.getNextButtonPosition();
        let button = new TextButton(this.scene, pos.x, pos.y, text, callback);
        this.elements.push(button);
        this.scene.add.existing(button);
    }

    addBuildButton(text, entityKey) {
        // Set toggle Build callback
        let gameScene = this.scene.scene.get("GameScene");
        const callback = () =>
            gameScene.pointerManager.toggleBuildMode(entityKey);
        // Create Button
        let pos = this.getNextButtonPosition();
        let button = new TextButton(this.scene, pos.x, pos.y, text, callback);
        this.elements.push(button);
        this.scene.add.existing(button);
    }

    deactivateAllButtons() {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].setActive(false);
        }
    }
}
