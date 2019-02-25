import { config as cfg } from "../config";
// import { CameraManager } from "../helpers/camera";
import { Panel } from "../common/panels";

export const HudConfig = {
    common: {
        lowerPanelHeight: 150,
        minimapSpaceWidth: 200
    }
};

class HudScene extends Phaser.Scene {
    constructor() {
        super({ key: "HudScene", visible: true, active: true });

        this.config = HudConfig;
        this.score = 0;
    }

    preload() {
        // this.load.image("grey_panel", "assets/ui/grey_panel_big.png");
        this.load.image("grey_panel", "assets/ui/grey_panel_big.png");
        this.load.image("white_panel", "assets/ui/white_panel.png");
    }

    create() {
        console.log("Creating HudScene");

        this.gameScene = this.scene.get("GameScene");

        this.gameScene.events.on(
            "addScore",
            function() {
                this.score += 10;
                info.setText("Score: " + this.score);
            },
            this
        );

        this.clickCount = 0;
        this.clickCountText = this.add.text(100, 200, "");

        this.lowerPanelBackground = this.add
            .image(
                0,
                cfg.viewport.HEIGHT - this.config.common.lowerPanelHeight,
                "grey_panel"
            )
            .setOrigin(0, 0) // upper left corner is anchor
            .setDisplaySize(
                cfg.viewport.WIDTH,
                this.config.common.lowerPanelHeight
            );

        // This panel is always displayed, showing options
        // that are always available
        this.buildPanel = new Panel(
            this,
            this.staticPanelXtoViewportX(0),
            this.staticPanelYToViewportY(0),
            500,
            100
        );
        this.buildPanel.addBuildButton("Build HQ", "hq");
        // this.staticPanel.addButton("Button", () => this.updateClickCountText());
        // this.staticPanel.addButton("Button", () => this.updateClickCountText());
        // this.staticPanel.addButton("Button", () => this.updateClickCountText());
        // this.staticPanel.addButton("Button", () => this.updateClickCountText());
        // this.staticPanel.addButton("Button", () => this.updateClickCountText());
        // this.staticPanel.addButton("Button", () => this.updateClickCountText());

        this.upperPanelBackground = this.add
            .image(0, 0, "grey_panel")
            .setOrigin(0, 0) // upper left corner is anchor
            .setDisplaySize(cfg.viewport.WIDTH, 50);

        this.scorePanel = new Panel(this, 10, 10, 500, 30);
        this.scorePanel.addScoreField("food");

        this.updateClickCountText();
    }

    updateClickCountText() {
        console.log("clicked");
    }

    // Converts coordinates within staticPanel to viewport coordinates
    staticPanelXtoViewportX(x) {
        return x + this.config.common.minimapSpaceWidth;
    }
    staticPanelYToViewportY(y) {
        let upperMargin = 35;
        return (
            y +
            cfg.viewport.HEIGHT -
            this.config.common.lowerPanelHeight +
            upperMargin
        );
    }

    update() {}

    addMinimapToLowerPanel(posX, posY, minimapWidth, minimapHeight) {
        this.addMinimapCutout(posX, posY, minimapWidth, minimapHeight);
        this.addMinimapBlackBorders(posX, posY, minimapWidth, minimapHeight);
    }

    // Makes a cutout in the lower panel st. Minimap is visible
    addMinimapCutout(posX, posY, minimapWidth, minimapHeight) {
        let cutout = new Phaser.GameObjects.Graphics(this);
        cutout.fillRect(posX, posY, minimapWidth, minimapHeight);
        // let mask = new Phaser.Display.Masks.GeometryMask(this, cutout);
        let mask = new Phaser.Display.Masks.BitmapMask(this, cutout);
        // mask.invertAlpha = true;
        // lowerPanel.mask = mask;
        this.lowerPanelBackground.setMask(mask);
        this.lowerPanelBackground.mask.invertAlpha = true;
    }

    // Adds the black borders in the minimap
    addMinimapBlackBorders(posX, posY, minimapWidth, minimapHeight) {
        let gap = Math.abs(minimapHeight - minimapWidth) / 2;
        let x1;
        let y1;
        let h1;
        let w1;
        let x2;
        let y2;
        let h2;
        let w2;
        if (minimapHeight > minimapWidth) {
            x1 = posX - gap;
            y1 = posY;
            h1 = minimapHeight;
            w1 = gap;

            x2 = posX + minimapWidth;
            y2 = posY;
            h2 = minimapHeight;
            w2 = gap;
        } else {
            x1 = posX;
            y1 = posY - gap;
            h1 = gap;
            w1 = minimapWidth;

            x2 = posX;
            y2 = posY + minimapHeight;
            h2 = gap;
            w2 = minimapWidth;
        }

        let blackBack = this.add.graphics({
            fillStyle: { color: 0x000000 }
        });
        blackBack.fillRect(x1, y1, w1, h1);
        blackBack.fillRect(x2, y2, w2, h2);
    }
}

export default HudScene;
