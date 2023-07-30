import { Fish } from "./fish.js";
import { player } from "./player.js";
import { getRandomNumber, roll20 } from "./helpers.js";

const playerNameElement = document.querySelector('[data-player="Name"]');
const playerSkillElement = document.querySelector('[data-player="Skill Bonus"]');
const playerLevelElement = document.querySelector('[data-player="Level"]');
const playerXPTotalElement = document.querySelector('[data-player="XP Total"]');

function rollForFishing(player) {
    const dieRoll = roll20();
    const rollTotal = (dieRoll + player.skill);
    const text = dieRoll === 20 ? `It's a natural 20! With a total of ${rollTotal}` : `${dieRoll} + ${player.skill} for a total of ${rollTotal}`;

    return {
        text: text,
        rollTotal: rollTotal,
        isNat20: dieRoll === 20,
    }
}

function buttonFunction(){
    const fish = new Fish;
    const { text, rollTotal, isNat20 } = rollForFishing(player);
    let catchmessage;

    if ((rollTotal >= fish.requiredRoll) || isNat20) {
        catchmessage = `Congratulations, you've caught it! You've earned ${fish.difficulty}xp`
        player.totalxp += fish.difficulty;
        updatePlayer();
    } else {
        catchmessage = "It got away!";
    }

    document.querySelector('[data-output]').innerHTML=`
    You've encountered a ${fish.provideDescription()} - it required a roll of ${fish.requiredRoll} to catch. <br>
    Your roll:  ${text}<br>
    ${catchmessage}`;
};
   
function updatePlayer(){
    playerXPTotalElement.innerHTML=player.totalxp;
    playerLevelElement.innerHTML=player.getLevel();
}

updatePlayer();
playerNameElement.innerHTML=player.name;
playerSkillElement.innerHTML=player.skill;
document.querySelector('[data-button]').addEventListener("click", buttonFunction);

