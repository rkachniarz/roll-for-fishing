import { getRandomNumber, roll20 } from "./helpers.js";

const xpToLevel = [0, 10, 25, 50, 100, 250, 500, 1000, 2000, 5000];

class Player {
    constructor(name="Player"){
        this.name = name; 
        this.skill = getRandomNumber(0, 5);
        this.totalxp = 0;
        this.level = 0;
        this.fishHistory = [];
        this.inventory = [];
    }


    gainXP(gain) {
        this.totalxp += gain;
        if (this.level === xpToLevel.length) return false; 
        if (this.totalxp > xpToLevel[this.level+1]) {
            this.level +=1;
            return true;
        } else return false;
    }
}

export const player = new Player();