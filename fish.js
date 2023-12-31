import { getRandomNumber, roll20 } from "./helpers.js";
import fishNames from "./fishNames.js";

const sizes = ['Tiny', 'Small', 'Regular Size', 'Large', 'Gigantic', 'Humongous']

export class Fish {
    constructor(){
        this.name = fishNames.names[getRandomNumber(0, fishNames.names.length-1)];
        this.size = sizes[getRandomNumber(0,sizes.length-1)];
        this.difficulty = (2*(sizes.indexOf(this.size)));
        this.requiredRoll = (this.difficulty + roll20());
    }
    
    provideDescription() {
        return `${this.size} ${this.name}`
    }



}
