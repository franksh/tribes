import Building from "./Building";
import { config } from "../../config";

export class HQ extends Building {
    constructor({ gameScene, tile, tribeId }) {
        let key = "hq";
        super(gameScene, tile, key, tribeId);

        this.gatheringSite;

        this.popLimit = 5;
        this.pop = 0;

        this.initialize();
    }

    initialize() {
        this.initializeGatheringSite();
        this.initializeSpawnTimer();
    }

    // Create a gathering site for this tribe
    // Gathering site is two tiles beneath HQ
    initializeGatheringSite() {
        // Get tile two tiles beneath this one
        let { x, y } = this.tile;
        let tileOneDown = this.scene.map.getGroundTileAt(x, y + 1);
        this.gatheringSite = tileOneDown;
    }

    initializeSpawnTimer() {
        this.spawnTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.spawnUnit,
            callbackScope: this,
            timeScale: config.timeScale,
            loop: true
        });
    }

    spawnUnit() {
        if (!this.tribe.atPopLimit()) {
            this.scene.createUnit("worker", this.tile, 1);
            this.tribe.increasePopIfBelowLimit();
        }
    }

    updateLogic() {
        // console.log("called");
    }
}
