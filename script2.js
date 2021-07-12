/**  @type {HTMLCanvasElement} */
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

const CANVAS2_WIDTH = canvas2.width = 500;
const CANVAS2_HEIGHT = canvas2.height = 800;

const numberOfEnemies2 = 20;
const enemiesArray2 = [];


let gameFrames2 = 0;

class Enemy2 {

    constructor() {
        this.image = new Image();
        this.image.src = 'images/enemy2.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (CANVAS2_WIDTH - this.width);
        this.y = Math.random() * (CANVAS2_HEIGHT - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 2 + 2);
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 7; // wave curve
    }

    update() {

        // for "wave" movement
        this.y += Math.sin(this.angle) * this.curve;
        this.angle += this.angleSpeed;

        // for "left" movement
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = CANVAS2_WIDTH + this.width
        }
        //this.y += Math.random() * 5 - 2.5;

        // animate sprite
        if (gameFrames2 % this.flapSpeed === 0) { // for each  'flapSpeed', animate sprite 
            this.frame > 4 ? this.frame = 0 : this.frame += 1;
        }

    }

    draw() {
        ctx2.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < numberOfEnemies2; i++) {
    enemiesArray2.push(new Enemy2());
}

function animate2() {

    ctx2.clearRect(0, 0, CANVAS2_WIDTH, CANVAS2_HEIGHT);
    enemiesArray2.forEach(enem => {
        enem.update();
        enem.draw();
    });
    gameFrames2++;
    requestAnimationFrame(animate2)
}
animate2();