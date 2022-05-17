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
//Create Sprite
class Sprite {
    constructor(position) {
        this.position = position;
    }
    //Sprtite is drawn when method is called
    draw() {
        //Fill with red color
        c.fillStyle = "red";
        //50px wide and 150px tall at position location
        c.fillRect(this.position.x, this.position.y, 50, 150);
    }
}

//Player 
//Sprite arguments are position of the player sprite
const player = new Sprite({
    x:0,
    y:0
})

//Enemy
//Same thing but it draws an enemy!
const enemy = new Sprite ({
    x: 400,
    y: 100
})

//Call draw method to draw player
player.draw();

//Call draw method to draw enemy
enemy.draw();

console.log(player)
//-------------------------------Player/Enemy-------------------------------//