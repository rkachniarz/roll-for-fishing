export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export function roll20(advantage=false) {
    let result = 0;

    if (advantage==true) {
        firstroll = getRandomNumber(1,20);
        secondroll = getRandomNumber(1,20);
        result = Math.max(firstroll,secondroll);
    }
    else result = getRandomNumber(1,20);

    return result;

    
}

export function pickRandom(objectArray) {
    var filler = 100 - objectArray.map(r => r.chance).reduce((sum, current) => sum + current);
    if (filler <= 0) {
      console.log("chances sum is higher than 100!");
      return;
    }
    var probability = objectArray.map((r, i) => Array(r.chance === 0 ? filler : r.chance).fill(i)).reduce((c, v) => c.concat(v), []);
    var pIndex = Math.floor(Math.random() * 100);
    var pickedObject = objectArray[probability[pIndex]];
    return pickedObject;
  }