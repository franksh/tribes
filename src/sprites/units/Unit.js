/*
Generic Unit class that extends Phaser sprites.
Classes for specific Units extend this class.
*/
// import MoveToPlugin from '../../plugins/rexplugins.min'
import { config } from "../../config";

export default class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene, tile, key, tribeId) {
        // Get sprite config
        let objConfig = scene.getGameObjectConfig(key);
        const { spriteKey, scaleX, scaleY, speedMod } = objConfig;
        // Get position of tile
        let { x, y } = scene.map.getTileCenter(tile);

        // Create sprite
        super(scene, x, y, spriteKey);

        // Set config properties
        this.setScale(scaleX, scaleY);

        // Set other properties
        this.tile = tile;
        this.tribeId = tribeId;
        // Add to scene
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        // Add other properties
        this.path = [];
        this.destination = undefined; // The target of the path
        this.target = undefined; // The next target tile to move to

        this.speed = config.baseUnitSpeed * speedMod;
        this.status = "random";
        // this.alive = true;
        // console.log(this);
    }

    update() {
        this.updateStatus();
        this.updateMovement();
    }

    updateLogic() {}

    updateStatus() {}

    updateMovement() {
        // If currently has a target
        if (this.hasTarget()) {
            // If moving, check if arrived at target
            if (this.isMoving()) {
                if (this.reachedTargetPosition()) {
                    this.clearDestinationIfReached();
                    this.stopMovement();
                    this.target = undefined;
                }
            }
            // If not moving, get moving!
            else {
                this.moveToTarget();
            }
        }
        // If has no target
        if (!this.hasTarget()) {
            // get next target from path if possible
            if (this.hasNonEmptyPath()) {
                this.setNextTargetFromPath();
            }
            // // If path is empty, determine a new path to destination
            else {
                if (this.hasDestination()) {
                    this.setPathToDestination();
                }
            }
        }
    }

    // Check whether currently at destination. If so, clear it
    clearDestinationIfReached() {
        let currentTile = this.getOwnTile();
        if (currentTile === this.destination) {
            this.destination = undefined;
        }
    }

    setNextTargetFromPath() {
        let { x, y } = this.path.shift();
        this.target = this.scene.map.getTileAt(x, y);
    }

    setPathToDestination() {
        let ownTile = this.getOwnTile();
        this.scene.pathfinder.findPath(
            ownTile.x,
            ownTile.y,
            this.destination.x,
            this.destination.y,
            function(path) {
                this.path = path;
            }.bind(this)
        );
    }

    getRandomDestination() {
        return this.scene.map.getRandomAccessibleTile();
    }

    // Returns true if reached target position
    reachedTargetPosition() {
        if (this.target !== undefined) {
            let targetCenter = this.getTargetCenter();
            let ownCenter = this.getCenter();
            // console.log(ownCenter);
            // console.log(targetCenter);
            var distance = Phaser.Math.Distance.Between(
                ownCenter.x,
                ownCenter.y,
                targetCenter.x,
                targetCenter.y
            );
            if (distance < 10) {
                return true;
            }
            // console.log(distance);
        }
        return false;
    }

    getTargetCenter() {
        let center = this.scene.map.getTileCenter(this.target);
        return center;
    }

    setDestination(tile) {
        this.destination = tile;
    }

    moveToTarget() {
        let { x, y } = this.scene.map.getTileCenter(this.target);
        let targetVec = new Phaser.Math.Vector2();
        targetVec.x = x;
        targetVec.y = y;
        this.scene.physics.moveToObject(this, targetVec, this.speed);
        // this.scene.add
        //     .graphics()
        //     .lineBetween(this.x, this.y, targetVec.x, targetVec.y);
    }

    // moveToTile(tile) {
    //     // this.setTarget(tile);
    //     this.target = tile;
    //     let { x, y } = this.scene.map.getTileCenter(tile);
    //     let target = new Phaser.Math.Vector2();
    //     target.x = x;
    //     target.y = y;
    //     this.scene.physics.moveToObject(this, target, this.speed);
    //     this.scene.add
    //         .graphics()
    //         .lineBetween(this.x, this.y, target.x, target.y);
    //     // this.scene.physics.accelerateTo(this, tile, 60, 300, 300)
    // }

    getOwnTile() {
        return this.scene.map.getTileAtWorldXY(this.x, this.y);
    }

    // setTarget(tile) {
    //     this.target = new Phaser.Math.Vector2();
    //     this.target.x = tile.pixelX;
    //     this.target.y = tile.pixelY;
    // }

    isMoving() {
        return this.body.speed > 0;
    }

    hasTarget() {
        return this.target !== undefined;
    }

    hasDestination() {
        return this.destination !== undefined;
    }

    hasNonEmptyPath() {
        return this.path.length > 0;
    }

    stopMovement() {
        // this.body.reset(this.x, this.y)
        this.body.setVelocity(0, 0);
    }
}
