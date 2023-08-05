import { Fish } from "./fish.js";
import { player } from "./player.js";
import { getRandomNumber, roll20 } from "./helpers.js";
import "./locations.js";
import { lake } from "./locations.js";


// Selectors 
const playerNameElement = document.querySelector('[data-player="Name"]');
const playerSkillElement = document.querySelector('[data-player="Skill Bonus"]');
const playerLevelElement = document.querySelector('[data-player="Level"]');
const playerXPTotalElement = document.querySelector('[data-player="XP Total"]');
const playButton = document.querySelector('[data-button="Main Button"]');
const historyButton = document.querySelector('[data-history-button="History Button"]');
const output = document.querySelector('[data-output]');

// Variables
const currentLocation = lake;
let switchHistory = showHistory;

//Functions 
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
    const fish = new Fish(currentLocation);
    const { text, rollTotal, isNat20 } = rollForFishing(player);
    let catchmessage;

    if ((rollTotal >= fish.requiredRoll) || isNat20) {
        catchmessage = `Congratulations, you've caught it! You've earned ${fish.difficulty}xp`
        player.totalxp += fish.difficulty;
        updatePlayer();
        player.fishHistory.push(fish);
        updateFishHistoryButton();
    } else {
        catchmessage = "It got away!";
    }

    output.innerHTML=`
    You've encountered a ${fish.provideDescription()} - it required a roll of ${fish.requiredRoll} to catch. <br>
    Your roll:  ${text}<br>
    ${catchmessage}`;
};
   
function updatePlayer(){
    playerXPTotalElement.innerHTML=player.totalxp;
    playerLevelElement.innerHTML=player.getLevel();
}

function updateFishHistoryButton(){
    if (player.fishHistory.length == 0) historyButton.style["display"] = "none";
    else historyButton.style["display"] = "";
}


function historyButtonListener() {
    switchHistory();
}

function showHistory(){
    historyButton.innerText = 'Hide History';
    output.innerHTML = 'Yes, This is history';
    // let printHistory = player.fishHistory.forEach((fish) => `<ul>${fish.size} ${fish.provideDescription}, roll required: ${fish.requiredRoll}</ul>`);
    // output.innerhtml = printHistory;

    switchHistory = hideHistory;
}

function hideHistory(){
    historyButton.innerText = 'Show History';
    output.innerHTML ='';
    switchHistory = showHistory;
}
// Rendering 

updateFishHistoryButton();
updatePlayer();
playerNameElement.innerHTML=player.name;
playerSkillElement.innerHTML=player.skill;
playButton.addEventListener("click", buttonFunction);
historyButton.addEventListener("click", historyButtonListener);


