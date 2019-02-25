import { TextButton, ImageButton } from "./buttons";

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
    getNextElementPosition() {
        let numberElements = this.elements.length;
        let x =
            this.x + parseInt(numberElements / this.elPerCol) * this.elWidth;
        let y = this.y + (numberElements % this.elPerCol) * this.elHeight;
        return { x, y };
    }

    addTextButton(text, callback) {
        // Create BUtton
        let pos = this.getNextElementPosition();
        let button = new TextButton(this.scene, pos.x, pos.y, text, callback);
        this.elements.push(button);
        this.scene.add.existing(button);
    }

    addImageButton(objectKey, callback) {
        // Create BUtton
        let pos = this.getNextElementPosition();
        let button = new ImageButton(
            this.scene,
            pos.x,
            pos.y,
            objectKey,
            callback
        );
        this.elements.push(button);
        this.scene.add.existing(button);
    }

    addBuildButton(text, entityKey) {
        // Set toggle Build callback
        let gameScene = this.scene.scene.get("GameScene");
        const callback = () =>
            gameScene.pointerManager.toggleBuildMode(entityKey);
        // Create Button
        let pos = this.getNextElementPosition();
        let button = new ImageButton(
            this.scene,
            pos.x,
            pos.y,
            entityKey,
            callback
        );

        button.emit("toggleBuildMode", entityKey);
        this.elements.push(button);
        this.scene.add.existing(button);
    }

    deactivateAllButtons() {
        for (let i = 0; i < this.elements.length; i++) {
            if ("setActive" in this.elements[i]) {
                this.elements[i].setActive(false);
            }
        }
    }

    addScoreField(key) {
        let pos = this.getNextElementPosition();
        let scoreField = new Phaser.GameObjects.Text(
            this.scene,
            pos.x,
            pos.y,
            "Food: 0",
            {
                font: "20px Lato",
                // font: "40px Arial",
                fill: "#000000"
            }
        );
        // scoreField.setResolution(2000);
        scoreField.key = key;
        this.elements.push(scoreField);
        this.scene.add.existing(scoreField);
    }
}
