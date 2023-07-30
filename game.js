import { fish } from "./fish.js";
import { player } from "./player.js";
import { getRandomNumber, roll20 } from "./helpers.js";

let nat20 = false;

function rollForFishing(player) {
        let dieRoll = roll20();
        let rollTotal = (dieRoll + player.skill);

        if (dieRoll == 20) {
            nat20 = true;
            return ([`It's a natural 20! With a total of ${rollTotal}`, rollTotal]);
        }
        else {
            return ([`${dieRoll} + ${player.skill} for a total of ${rollTotal}`, rollTotal]);
        }

}

let roll = rollForFishing(player)[1];
let rollDescription = rollForFishing(player)[0];

console.log("Your fishing bonus is: +",player.skill);
console.log("Rolling for fishing: ",  rollDescription);
console.log("You've encountered a", fish.provideDescription(), "- it required a roll of", fish.requiredRoll, "to catch.");

if ((roll >= fish.requiredRoll) || nat20===true) {
    console.log("Congratulations, you've caught it! You've earned", fish.difficulty, "xp")
    player.totalxp += fish.difficulty
    } 
else {console.log("It got away!")};


// export function game(){
// document.getElementById("output").innerHTML="You've encountered a", fish.provideDescription(), "- it required a roll of", fish.requiredRoll, "to catch.";
// }

