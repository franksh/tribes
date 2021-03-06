import Unit from "./Unit";

export class Gatherer extends Unit {
    constructor({ gameScene, tile, tribeId }) {
        let key = "gatherer";
        super(gameScene, tile, key, tribeId);
    }
    updateLogic() {
        if (this.status == "random") {
            if (!this.hasDestination()) {
                this.determineNewDestination();
            }
        }
    }

    // Choose a destination, depending on status
    determineNewDestination() {
        this.destination = this.getRandomDestination();
        // console.log(this.destination);
    }
}
