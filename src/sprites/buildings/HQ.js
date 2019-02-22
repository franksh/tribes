import Building from "./Building";

export class HQ extends Building {
    constructor({ gameScene, x, y }) {
        let key = "hq";
        // let spriteKey = "house_simple";
        super(gameScene, x, y, key);
    }
}
