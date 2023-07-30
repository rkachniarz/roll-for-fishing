import { getRandomNumber, roll20 } from "./helpers.js";

const xpToLevel = [0, 10, 25, 50, 100, 250, 500, 1000, 2000, 5000];

class Player {
    constructor(name="Player"){
        this.name = name; 
        this.skill = getRandomNumber(0, 5);
        this.totalxp = 0;
    }

    getLevel() {
        let xp = this.totalxp;
        let level = xpToLevel.findIndex(function(value){ return value > xp});
        if (level == -1) return xpToLevel.length;
        else return level;
    }
}

export const player = new Player();