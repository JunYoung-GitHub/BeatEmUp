//-------------------------------Setup proj-------------------------------//
//grab canvas and store it in canvas
const canvas = document.querySelector('canvas');
//Select canvas context (2d)
const c =canvas.getContext('2d');

//Canvas Aspect
canvas.width = 1024;
canvas.height = 576;

//fill up canvas Start from coordinate 0, 0 to to the height/width of canvas 
//diff from browser background to canvas background
c.fillRect(0, 0, canvas.width, canvas.height);
//-------------------------------Setup proj-------------------------------//

//-------------------------------Player/Enemy-------------------------------//
//Gravity duh ` How fast the sprites fall
const gravity = 0.7;

//Position and image path of the background
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})
//Player 
//Sprite arguments are position of the player sprite
const player = new Fighter({
   position: {
        x:0,
        y:0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }
})

//Enemy
//Same thing but it draws an enemy!
const enemy = new Fighter({
    position: {
         x:400,
         y:100
     },
     velocity: {
         x: 0,
         y: 0
     },

     offset: {
        x: -50,
        y: 0
    },
     color: 'blue'
 })

//Call draw method to draw player
player.draw();

//Call draw method to draw enemy
enemy.draw();

console.log(player)//Debug to find location of the player!
//Create objects for pressed keys
const keys = {
    a: {
        pressed:false
    },

    d: {
        pressed:false
    },

    ArrowRight: {
        pressed:false
    },

    ArrowLeft: {
        pressed:false
    }
}

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

decreaseTimer();

//Infinite loop animate
function animate() {
    //Loops this animation over and over again
    window.requestAnimationFrame(animate);
    //Make background black to differenciate sprite from background
    c.fillStyle = 'black';
    //Makes sure that the "past" sprites are clear to avoid "Painting" effect
    c.fillRect(0, 0, canvas.width, canvas.height);
    //draws background
    background.update();
    //Makes sure that the player sprite is called every update
    player.update();
    //Same thing with enemy
    enemy.update();
   
    //Stops player and enemy momentum after horizontal key press
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //Player movement Speed
    if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
    }
    else if(keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }

    //Enemy Movement Speed
    enemy.velocity.x = 0;
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }
    //Detects collision player
    if(rectangularCollision({rectangle1: player, rectangle2: enemy})
        && player.isAttacking) {
            player.isAttacking = false;
            enemy.health -= 20;
            document.querySelector('#enemyHealth').style.width=enemy.health + '%';
            console.log("Player attack connects")
    }
    //detects collision enemy
    if(rectangularCollision({rectangle1: enemy, rectangle2: player})
        && enemy.isAttacking) {
            enemy.isAttacking = false;
            player.health -= 20;
            document.querySelector('#playerHealth').style.width=player.health + '%';
            console.log("Enemy attack connects")
    }

    //End game based on health
    if(enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId});
    }
}
animate();
//-------------------------------Player/Enemy event listeners-------------------------------//
//When keys are pressed
window.addEventListener('keydown', (event) =>{
    switch(event.key) {
        //Player 1
        //move right
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        
        //move left
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        
        //move Jump set high
        case 'w':
            player.velocity.y = -20;
            break;
        
        //player attacks
        case ' ':
            player.attack();
            break;
        //End Player 1

        //Enemy
        //move right
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        
        //move left
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        
        //move Jump
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;

        //Enemy attacks
        case 'ArrowDown':
            enemy.attack();
            break;
        //End Enemy
    }
})

//When key is let go for player
window.addEventListener('keyup', (event) =>{
    switch(event.key) {
        case 'd':
            keys.d.pressed = false;
            break;

        case 'a':
            keys.a.pressed = false;
            break;
    }

    //Enemy Keys
    switch(event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
    console.log(event.key)
})
/*TODO: 
1. have hitboxes turn around to always face player. Check draw() attackbox and offset in code!!
2. Make sure players cannot double jump
3. Rename attackbox to hitbox (like if x axis of player is > than enemy or something i dunno)
4. Add more attacks
5. Rename Enemy to player 2 or something
*/
