import Unit from "./Unit";

export class Worker extends Unit {
    constructor({ gameScene, tile, tribeId }) {
        let key = "worker";
        super(gameScene, tile, key, tribeId);

        // Set default parameters
        this.status = "idle";

        // this.gatheringSite = this.tribe.gatheringSite;
    }

    updateLogic() {
        if (!this.hasDestination()) {
            if (this.status == "idle") {
                if (Phaser.Math.Between(0, 100) < 30) {
                    this.determineNewDestination();
                }
            }
        }
    }

    // Choose a destination, depending on status
    determineNewDestination() {
        if (this.status == "idle") {
            let { x, y } = this.tribe.gatheringSite;
            let radius = 100;
            let destination = this.scene.map.getRandomAccessibleTileInCircle(
                x,
                y,
                radius
            );

            this.setDestination(destination);
        }
        if (this.status == "random") {
            let destination = this.getRandomDestination();
            this.setDestination(destination);
        }
    }
}
