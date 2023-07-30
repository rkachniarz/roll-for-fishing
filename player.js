import { getRandomNumber, roll20 } from "./helpers.js";

class Player {
    constructor(){
        this.skill = getRandomNumber(0, 5);
    }
}

export const player = new Player();