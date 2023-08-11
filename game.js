import { Fish } from "./fish.js";
import { player } from "./player.js";
import { getRandomNumber, roll20 } from "./helpers.js";
import "./locations.js";
import { lake } from "./locations.js";
import { increasePlayerFishingSkill, giveRandomSpecialTreasure } from "./levelup.js";


// Selectors 
const playerNameElement = document.querySelector('[data-player="Name"]');
const playerSkillElement = document.querySelector('[data-player="Skill Bonus"]');
const playerLevelElement = document.querySelector('[data-player="Level"]');
const playerXPTotalElement = document.querySelector('[data-player="XP Total"]');
const playButton = document.querySelector('[data-button="Main Button"]');
const historyButton = document.querySelector('[data-history-button="History Button"]');
const output = document.querySelector('[data-output]');
const levelUpPanel = document.querySelector('[data-player="Level Up Panel"]');
const levelUpButton1 = document.querySelector('[data-button="Level Up Choice 1');
const levelUpButton2 = document.querySelector('[data-button="Level Up Choice 2');

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
        catchmessage = `Congratulations, you've caught it! You've earned ${fish.xp}xp`
        updatePlayer(player.gainXP(fish.xp));
        player.fishHistory.push({fish, rollTotal});
        updateFishHistoryButton();
    } else {
        catchmessage = "It got away!";
    }

    output.innerHTML=`
    You've encountered a ${fish.provideDescription()} - it required a roll of ${fish.requiredRoll} to catch. <br>
    Your roll:  ${text}<br>
    ${catchmessage}`;
};
   
function updatePlayer(hasLeveledUp = false){
    if (hasLeveledUp) levelUpFunction();
    playerXPTotalElement.innerText = player.totalxp;
    playerLevelElement.innerText = player.level;
    playerSkillElement.innerText = player.skill;
}

function levelUpFunction() {
    levelUpPanel.style["display"] = "block";
}

function firstLevelUpChoice() {
    increasePlayerFishingSkill(player);
}

function secondLevelUpChoice() {
    giveRandomSpecialTreasure(player);
}

function closeLevelUpPanel() {
    updatePlayer();
    levelUpPanel.style["display"] = "none"; 
}

function levelUpButton1Handler() {
    firstLevelUpChoice();
    closeLevelUpPanel();
}

function levelUpButton2Handler(callback, argument) {
    secondLevelUpChoice();
    closeLevelUpPanel();
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
    console.log(player.fishHistory)
    const printHistory = player.fishHistory.map(({fish, rollTotal}) => `<li>${fish.provideDescription()}, roll required: ${fish.requiredRoll}, your roll: ${rollTotal}, xp gained: ${fish.difficulty}</li>`).join('');
    output.innerHTML = `<ul> ${printHistory} </ul>`;
    switchHistory = hideHistory;
}
function hideHistory(){
    historyButton.innerText = 'Show History';
    output.innerHTML = '';
    switchHistory = showHistory;
}
// Rendering 

updateFishHistoryButton();
updatePlayer();
playerNameElement.innerHTML = player.name;
playButton.addEventListener("click", buttonFunction);
historyButton.addEventListener("click", historyButtonListener);
levelUpButton1.addEventListener("click", levelUpButton1Handler);
levelUpButton2.addEventListener("click", levelUpButton2Handler);

