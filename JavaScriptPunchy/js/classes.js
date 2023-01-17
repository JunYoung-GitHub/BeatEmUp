//Create Sprite
class Sprite {
    //Pass these arguements as a group so I don't need to remember the order
    constructor({position, imageSrc, scale = 1, framesMax = 1}) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        //scaling of the sprites used to make shop a bit bigger
        this.scale = scale
        //number of frames in the image
        this.framesMax = framesMax
        
    }
    //Sprite is drawn when method is called
    draw() {
        c.drawImage(
            //Starts cropping the sprite
            this.image,
            0,
            0,
            this.image.width / this.framesMax, //per frame (6 different frames)
            this.image.height,
            //end cropping partish
            this.position.x, 
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }
    //Moves sprites around call this method!
    update() {
        this.draw();
    }
}

//Figters class replaces sprites class
class Fighter {
    //Pass these arguements as a group so I don't need to remember the order
    constructor({position, velocity, color = 'red', offset}) {
        this.position = position;
        this.velocity = velocity
        this.width = 50;
        this.height = 150;
        this.lastKey;
        //hitbox attributes
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            //so hitbox always points towards other player
            offset,//same syntax as offset: offsets
            //Where the hitbox will be on the sprite
            width: 100,
            height: 50
        }
        this.color = color;
        this.isAttacking;
        this.health = 100;
    }
    //Sprtite is drawn when method is called
    draw() {
        //Fill with red color
        c.fillStyle = this.color;
        //50px wide and 150px tall at position location
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        //Hitbox is drawn
        if(this.isAttacking) {
            c.fillStyle = "green";
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }
    //Moves sprites around call this method!
    update() {
        this.draw();
        //update hitboxes position in relation of the parent
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        //Player horizontal movement
        this.position.x += this.velocity.x;
        //Each frame we loop add "gravity" to drop the sprites
        this.position.y += this.velocity.y;


        //Makes sure that sprite stop dropping past canvas
        if((this.position.y + this.height + this.velocity.y) >= (canvas.height - 96)) { //Sets where the fighter is placed vertically (change -value for height)
            this.velocity.y = 0;
        } 
        else 
        //Add gravity if sprites are not past the bottom
        this.velocity.y += gravity;
    }
    //Sets the sprites in an attacking state (isAttacking)
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
        this.isAttacking = false;
        }, 100)
    }
}