//Function for detecting collision of hitboxes to hurtboxes (attacking)
function rectangularCollision({rectangle1, rectangle2}) {
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= enemy.position.x
        && rectangle1.attackBox.position.x <= rectangle2.position.x + enemy.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= enemy.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + enemy.height)
}

//-------------------------------Game Timer/Game over-------------------------------//
//Determines the winner based on whoever has the highest health left
function determineWinner({player, enemy, timerId}) {
    clearTimeout({timerId})
    document.querySelector('#displayText').style.display = 'flex';
    if(player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie';
        console.log('tie');
    }
    //Display player 1 Win when player health is greater than the enemy health
    else if(player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 wins';
        console.log('Player Wins');
    }
    //Display player 1 Win when player health is greater than the enemy health
    else if(player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 wins';
        console.log('Enemy Wins');
    }
    //Error Message ############REMOVE LATER##############
    else {
        document.querySelector('#displayText').innerHTML = 'Error Something messed up';
        console.log('Error Debug');
    }
}

let timer = 60;
//Time left in the timer maybe change name?
let timerId
function decreaseTimer() {
    console.log("Timer Flag");
    //recursively calls itself to reduce the timer every second (Maybe replace with setInterval???) ***************************************************
    timerId = setTimeout(decreaseTimer, 1000)
    if(timer > 0) {
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }
    //Display tie when both player's health is equal
    if(timer === 0) {
        determineWinner({player, enemy, timerId});
    }
}