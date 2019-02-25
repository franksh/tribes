import Building from "./Building";

export class HQ extends Building {
    constructor({ gameScene, x, y, tribe }) {
        let key = "hq";
        // let spriteKey = "house_simple";
        super(gameScene, x, y, key, tribe);
    }

    updateLogic() {
        // console.log("called");
    }
}
