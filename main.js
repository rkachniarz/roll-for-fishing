// import { fish } from "./fish.js";
import { getRandomNumber, roll20 } from "./helpers.js";
import fishNames from "./fishNames.js";

const sizes = ['Tiny', 'Small', 'Regular Size', 'Large', 'Gigantic', 'Humongous']

class Fish {
    constructor(){
        this.name = fishNames.names[getRandomNumber(0, fishNames.names.length)];
        this.size = sizes[getRandomNumber(0,sizes.length)];
        this.difficulty = ((2*(sizes.indexOf(this.size))) + roll20());
    }
    
    provideDescription() {
        return `${this.size} ${this.name}`
    }



}

class Player {
    constructor(){
        this.skill = getRandomNumber(0, 5);
    }
}

let fish = new Fish();
let player = new Player();
let nat20 = false;


function rollForFishing(player) {
        let dieRoll = roll20();
        let rollTotal = (dieRoll + player.skill);

        if (dieRoll == 20) {
            nat20 = true;
            return (`It's a natural 20! With a total of ${rollTotal}`);
        }
        else {
            return (`${dieRoll} + ${player.skill} for a total of ${rollTotal}`);
        }

}

let roll = rollForFishing(player);
console.log("Your fishing bonus is: +",player.skill);
console.log("Rolling for fishing: ",  roll);
console.log("You've encountered a", fish.provideDescription(), "- it required a roll of", fish.difficulty, "to catch.");

if (roll >= fish.difficulty || nat20===true) {console.log("Congratulations, you've caught it!")} else {console.log("It got away!")};
