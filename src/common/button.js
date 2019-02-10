export class TextButton extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, callback) {
        super(scene, x, y, text, style);

        this.setBackgroundColor("#555");
        this.setFill("#fff");
        this.setPadding(4, 2, 4, 2);
        // this.setStroke("#fff", 2);

        this.setInteractive({ useHandCursor: true })
            .on("pointerover", () => this.enterButtonHoverState())
            .on("pointerout", () => this.enterButtonRestState())
            .on("pointerdown", () => this.enterButtonActiveState())
            .on("pointerup", () => {
                this.enterButtonHoverState();
                callback();
            });
    }

    enterButtonHoverState() {
        this.setBackgroundColor("#999");
    }

    enterButtonRestState() {
        this.setBackgroundColor("#555");
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

    addButton(text, callback) {
        let numberElements = this.elements.length;
        let x =
            this.x + parseInt(numberElements / this.elPerCol) * this.elWidth;
        let y = this.y + (numberElements % this.elPerCol) * this.elHeight;

        let button = new TextButton(this.scene, x, y, text, {}, callback);
        this.elements.push(button);
        this.scene.add.existing(button);
    }
}
