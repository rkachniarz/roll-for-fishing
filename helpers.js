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