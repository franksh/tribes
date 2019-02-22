import { config as cfg } from "../config";

export const cameraConfigs = {
    common: {
        map: {
            width: cfg.MAP_WIDTH_TILES * cfg.TILE_WIDTH,
            height: cfg.MAP_HEIGHT_TILES * cfg.TILE_HEIGHT
        }
    },
    main: {
        width: cfg.viewport.WIDTH,
        height: cfg.viewport.HEIGHT,
        margin: 2, // In tile width
        zoom: 0.4
    },
    minimap: {
        size: 120,
        posX: 30,
        posY: cfg.viewport.HEIGHT - 150 + 16
        // posY: 100
    }
};

export class CameraManager {
    constructor(scene) {
        this.scene = scene;

        this.cameraConfigs = cameraConfigs;
    }

    update() {
        // Limit camera zoom
        let cameras = this.scene.cameras;
        cameras.main.setZoom(Math.min(cameras.main.zoom, 0.5));
        cameras.main.setZoom(Math.max(cameras.main.zoom, 0.3));
    }

    addAllCameras() {
        this.addMainCamera();
        this.addMinimapCamera();
        this.addMainCameraControls();
    }

    addMainCameraControls() {
        let scene = this.scene;

        scene.cursors = scene.input.keyboard.createCursorKeys();

        var controlConfig = {
            camera: scene.cameras.main,
            left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.D
            ),
            up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            zoomIn: scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.Q
            ),
            zoomOut: scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.E
            ),
            zoomSpeed: 0.005,
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        };

        scene.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
            controlConfig
        );
        // scene.controls.start();
    }

    addMainCamera() {
        let scene = this.scene;
        let camCfg = this.cameraConfigs.main;
        scene.cameras.main.setSize(camCfg.width, camCfg.height);

        let cameraMargin = camCfg.margin * cfg.TILE_WIDTH;
        let mapWidth = cfg.MAP_WIDTH_TILES * cfg.TILE_WIDTH;
        let mapHeight = cfg.MAP_HEIGHT_TILES * cfg.TILE_HEIGHT;
        // let mapRatio = mapHeight / mapWidth;

        const startX = mapWidth / 2 - camCfg.width / 2;
        const startY = mapWidth / 2 - camCfg.width / 2;

        scene.cameras.main
            .setBounds(
                -cameraMargin,
                -cameraMargin,
                mapWidth + camCfg.margin * cameraMargin,
                // adjust for hud lower panel
                mapHeight + camCfg.margin * cameraMargin + 300
            )
            .setName("main")
            .setZoom(camCfg.zoom)
            // .centerToSize()
            .centerToBounds()
            .setRoundPixels(true)
            // .setBackgroundColor(0x2a2a2a);
            .setBackgroundColor(0xfafafa);
    }

    addMinimapCamera() {
        let scene = this.scene;
        const camCfg = this.cameraConfigs.minimap;
        const mapCfg = this.cameraConfigs.common.map;

        const mapWidth = mapCfg.width;
        const mapHeight = mapCfg.height;
        const mapRatio = mapHeight / mapWidth;

        let minimapSize = camCfg.size;
        let minimapHeight;
        let minimapWidth;
        let minimapZoom;
        let posX;
        let posY;
        // Taller than wide
        if (mapRatio >= 1) {
            minimapHeight = minimapSize;
            minimapWidth = minimapSize / mapRatio;
            minimapZoom = minimapSize / mapHeight;
            posX = camCfg.posX + (minimapSize - minimapWidth) / 2;
            posY = camCfg.posY;
        } else {
            minimapWidth = minimapSize;
            minimapHeight = minimapSize * mapRatio;
            minimapZoom = minimapSize / mapWidth;
            posX = camCfg.posX;
            posY = camCfg.posY + (minimapSize - minimapHeight) / 2;
        }

        // Call HudScene to add black borders for minimap and cutout
        var hudScene = scene.scene.get("HudScene");
        hudScene.addMinimapToLowerPanel(
            posX,
            posY,
            minimapWidth,
            minimapHeight
        );

        scene.minimap = scene.cameras
            .add(posX, posY, minimapWidth, minimapHeight)
            // .add(camCfg.posX, camCfg.posY, minimapHeight, minimapWidth)
            .setBounds(0, 0, mapWidth, mapHeight)
            .setZoom(minimapZoom * 1.0)
            .setRoundPixels(false)
            // .centerToSize()
            .setName("mini");
        // scene.minimap.roundPixels = true;
        // scene.minimap.z = 100;
        // scene.minimap.setBackgroundColor(0x002244);
    }
}
