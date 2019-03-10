import Building from "./Building";

export class HQ extends Building {
    constructor({ gameScene, tile, tribeId }) {
        let key = "hq";
        super(gameScene, tile, key, tribeId);

        // Create a gathering site for this tribe
        this.gatheringSite = this.createGatheringSite();
    }

    // Gathering site is two tiles beneath HQ
    createGatheringSite() {
        // Get tile two tiles beneath this one
        let { x, y } = this.tile;
        let tileTwoDown = this.scene.map.getGroundTileAt(x, y + 2);
        return tileTwoDown;
    }

    updateLogic() {
        // console.log("called");
    }
}
