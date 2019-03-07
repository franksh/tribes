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

    // UPDATE & EVENTS

    update() {
        if (this.isLoaded()) {
            // Adjust position of loaded Image
            let { x, y } = this.getPointerGridCoords();
            this.loadedEntity.setPosition(x, y);
            // Show whether entity is placeable
            if (this.isEntityPlaceableAtPointerLoc()) {
                this.loadedEntity.clearTint();
                this.loadedEntity.setAlpha(0.8);
            } else {
                this.loadedEntity.setTint(0xff0000);
                this.loadedEntity.setAlpha(0.5);
            }
        }
    }

    onClick(pointer) {
        // Try to place an entity if cursor is loaded
        if (this.isLoaded()) {
            let success = this.tryToPlaceLoadedEntity();
            if (success) this.unloadEntityUnlessShiftPressed();
        }
    }

    // LOAD AND UNLOAD ENTITY

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

    /* 
    Loads the entity with the corresponding key
    onto the pointer. It creates an image that follows the pointer,
    and the entity can be placed into the world on click.
    */
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

    // Unload the currently stored entity
    unloadEntity() {
        if (this.isLoaded()) {
            this.loadedEntity.destroy();
            this.loadedEntity = undefined;
        }
    }

    // Unload the entity, unless shift pressed
    unloadEntityUnlessShiftPressed() {
        var keyObj = this.gameScene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SHIFT
        );
        var shiftIsDown = keyObj.isDown;
        if (!shiftIsDown) {
            this.unloadEntity(this.loadedEntity);
            this.hudScene.buildPanel.deactivateAllButtons();
        }
    }

    // ENTITY PLACEMENT

    tryToPlaceLoadedEntity() {
        // Check if a tile is under cursor
        let tile = this.getTileUnderPointer();
        if (tile === undefined) return false;

        // Try the build
        let entityKey = this.loadedEntity.key;
        let tribe = 1;
        return this.gameScene.tryCreateBuilding(entityKey, tile, tribe);
        // // Check if tile is builadble
        // let map = this.gameScene.map;
        // if (!map.isTileBuildable(tile)) return false;

        // // Build entity at location
        // let { x, y } = map.getTileCenter(tile);
        // this.gameScene.createBuilding(entityKey, x, y);
        // return true;
    }

    isEntityPlaceableAtPointerLoc() {
        let pointerCoords = this.getPointerWorldCoords();
        let map = this.gameScene.map;
        let tile = map.getTileAtWorldXY(pointerCoords.x, pointerCoords.y);
        if (tile) {
            return map.isTileAccessible(tile);
        }
        return false;
    }

    // UTILITY FUNCTIONS

    getPointerCoords() {
        return { x: this.pointer.x, y: this.pointer.y };
    }

    getPointerWorldCoords() {
        let xView = this.pointer.x;
        let yView = this.pointer.y;
        let camera = this.gameScene.cameras.main;
        let worldCoords = camera.getWorldPoint(xView, yView);
        return worldCoords;
    }

    /*  
    Returns the pixel coordinates of the grid tile under the pointer
    This is different from tile coordinates because it also extends
    outside of the map. Only use for display purposes, not to place!
    */
    getPointerGridCoords() {
        // Get world coordinates and modulo to nearest grid tile
        let { x: xWorld, y: yWorld } = this.getPointerWorldCoords();
        let tileW = cfg.TILE_WIDTH;
        let tileH = cfg.TILE_HEIGHT;
        let x = xWorld - (xWorld % tileW) + tileW / 2;
        let y = yWorld - (yWorld % tileH) + tileH / 2;
        return { x, y };
    }

    getTileUnderPointer() {
        let pointerCoords = this.getPointerWorldCoords();
        let map = this.gameScene.map;
        let tile = map.getTileAtWorldXY(pointerCoords.x, pointerCoords.y);
        return tile;
    }
}
