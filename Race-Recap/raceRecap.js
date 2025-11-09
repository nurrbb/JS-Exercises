const raceRecap = (driver1, driver2, lapCount = 10 ) => {

    let sum = [];
    let driver1TotalTime = 0;
    let driver2TotalTime = 0; 

    for (let i = 1; i <= lapCount; i++ ){
            
    let lapTime1 = Math.random() * (90 - 70) + 70 ;
    let lapTime2 = Math.random() * (90 - 70) + 70 ;
    driver1TotalTime += lapTime1;
    driver2TotalTime += lapTime2;
    
        sum.push(
            `${i}. Lap : ${driver1} ${lapTime1.toFixed(2)} - ${driver2} ${lapTime2.toFixed(2)} seconds.`
        );
    }

    if(driver1TotalTime < driver2TotalTime){
        sum.push(
            `Race Result: ${driver1} won the race with time of  ${driver1TotalTime.toFixed(2)} seconds. `
        );
    }
    else if (driver1TotalTime > driver2TotalTime){
        sum.push(
            `Race Result: ${driver2} won the race with time of  ${driver2TotalTime.toFixed(2)} seconds. `
        );
    }
    else{
        sum.push(
              `Race Result: ${driver1TotalTime.toFixed(2)}  - ${driver2TotalTime.toFixed(2)} an incredible photo finish! It’s a tie!. `

        );
    }
    return sum;
}

module.exports = raceRecap;