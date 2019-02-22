import { config as cfg } from "../config";

export class PointerManager {
    constructor(gameScene) {
        this.gameScene = gameScene.scene.get("GameScene");
        this.hudScene = gameScene.scene.get("HudScene");
        this.pointer = gameScene.input.activePointer;

        this.loadedEntity;

        // Register events
        this.gameScene.input.on("pointerdown", this.onClick.bind(this));
    }

    update() {
        if (this.gameScene.cursors.left.isDown) {
            console.log("left");
            // this.cameras.main.setScroll();
            // this.cameras.main.scrollX += 1;
            // console.log(this.cameras);
        }

        if (this.isLoaded()) {
            let worldCoords = this.getPointerTileCoords();
            // let worldCoords = this.getPointerWorldCoords();
            this.loadedEntity.setPosition(worldCoords.x, worldCoords.y);
        }
        // let pointer = this.input.activePointer;
        // if (pointer.isDown) {
        //     const x = pointer.x;
        //     const y = pointer.y;
        //     console.log(x, y);
        //     console.log(this.map.groundLayer.getTileAtWorldXY(x, y));
        // }
    }

    isLoaded() {
        return this.loadedEntity !== undefined;
    }

    toggleBuildMode(entityKey) {
        if (!this.isLoaded()) {
            this.loadEntity(entityKey);
        } else if (this.isLoaded()) {
            this.unloadEntity();
        }
    }

    loadEntity(entityKey) {
        // Get sprite from config
        let objConfig = this.gameScene.getGameObjectConfig(entityKey);
        let spriteKey = objConfig.spriteKey;
        // Create object
        let worldCoords = this.getPointerWorldCoords();
        this.loadedEntity = this.gameScene.add.image(
            worldCoords.x,
            worldCoords.y,
            spriteKey
        );
        this.loadedEntity.setAlpha(0.8);
        this.loadedEntity.setScale(objConfig.scaleX, objConfig.scaleY);
        this.loadedEntity.key = entityKey;
    }

    unloadEntity() {
        if (this.isLoaded()) {
            this.loadedEntity.destroy();
            this.loadedEntity = undefined;
        }
    }

    // loadUnloadEntity(entityConfig) {
    //     const { key: key, entityKey } = entityConfig;
    //     // console.log(button);
    //     if (!this.isLoaded()) {
    //         let spriteKey = "";
    //         if (entityKey === "hq") {
    //             spriteKey = "house_simple";
    //         }
    //         // Create object
    //         let worldCoords = this.getPointerWorldCoords();
    //         this.loadedEntity = this.gameScene.add.image(
    //             worldCoords.x,
    //             worldCoords.y,
    //             spriteKey
    //         );
    //         this.loadedEntity.entityKey = entityKey;
    //         this.loadedEntity.key = key;
    //         console.log("entity loaded");
    //     } else if (this.isLoaded()) {
    //         this.loadedEntity.destroy();
    //         this.loadedEntity = undefined;
    //     }
    //     console.log(this.loadedEntity);
    // }

    getPointerWorldCoords() {
        let xView = this.pointer.x;
        let yView = this.pointer.y;
        let camera = this.gameScene.cameras.main;
        let worldCoords = camera.getWorldPoint(xView, yView);
        return worldCoords;
    }

    // Returns the coords of the tile under Cursor
    getPointerTileCoords() {
        let worldCoords = this.getPointerWorldCoords();
        let tileW = cfg.TILE_WIDTH;
        let tileH = cfg.TILE_HEIGHT;
        let xTile = worldCoords.x - (worldCoords.x % tileW) + tileW / 2;
        let yTile = worldCoords.y - (worldCoords.y % tileH) + tileH / 2 - 12;
        // let xView = this.pointer.x;
        // let yView = this.pointer.y;
        // let xTile = xView - (xView % 64);
        // let yTile = yView - (yView % 64);
        // // let tile = this.gameScene.map.groundLayer.getTileAtWorldXY(
        //     xView,
        //     yView
        // );
        // let xTile = tile.getCenterX(this.gameScene.cameras.main);
        // let yTile = tile.getCenterY(this.gameScene.cameras.main);
        return { x: xTile, y: yTile };
    }

    onClick(pointer) {
        console.log("clicked");

        console.log(this);

        if (this.isLoaded()) {
            // Build entity
            let coords = this.getPointerTileCoords();
            console.log(this.loadedEntity);
            let entityKey = this.loadedEntity.key;
            this.gameScene.createBuilding(entityKey, coords.x, coords.y);

            // Unload unless shift pressed
            var keyObj = this.gameScene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SHIFT
            );
            var shiftIsDown = keyObj.isDown;
            if (!shiftIsDown) {
                this.unloadEntity(this.loadedEntity);
                this.hudScene.buildPanel.deactivateAllButtons();
            }
        }

        // var touchX = pointer.x;
        // var touchY = pointer.y;
        // console.log(touchX, touchY);
        // console.log(this.getPointerTileCoords());
        // // console.log(this);
        // console.log(
        //     this.gameScene.map.groundLayer.getTileAtWorldXY(touchX, touchY)
        // );
    }
}

// export default class MyPointer extends Phaser.Input.Pointer {
//     constructor() {
//         // var newPointer = Object.create(pointer);
//         // return newPointer;
//         // super();
//         // this = {...this}
//         // super();
//         super();
//         // Object.assign(pointer, this);
//         // return this;
//     }

//     hello() {
//         console.log("Hello");
//     }
// }
// // export default class MyPointer extends Phaser.Input.Pointer {
// //     constructor(pointer) {
// //         super();
// //         var newPointer = Object.create(pointer);
// //         return newPointer;
// //     }
// // }
