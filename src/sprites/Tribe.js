export default class Tribe {
    constructor(id, isPlayer) {
        this.id = id;
        this.isPlayer = isPlayer;

        // Resources
        this.wheat = 0;
        this.wood = 0;
        this.stone = 0;
    }

    getResourceCount() {
        return {
            wheat: this.wheat,
            wood: this.wood,
            stone: this.stone
        };
    }
}
