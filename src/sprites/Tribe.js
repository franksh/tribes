export default class Tribe {
    constructor(id, isPlayer) {
        this.id = id;
        this.isPlayer = isPlayer;

        // Resources
        this.wheat = 0;
        this.wood = 0;
        this.stone = 0;

        this.popLimit = 5;
        this.pop = 0;
    }

    getResourceCount() {
        return {
            wheat: this.wheat,
            wood: this.wood,
            stone: this.stone
        };
    }

    // Increase the population, but only if below limit
    increasePopIfBelowLimit() {
        if (this.pop < this.popLimit) {
            this.pop = this.pop + 1;
            return true;
        } else return false;
    }

    atPopLimit() {
        return this.pop == this.popLimit;
    }
}
