/**  @type {HTMLCanvasElement} */
const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');

const CANVAS4_WIDTH = canvas4.width = 500;
const CANVAS4_HEIGHT = canvas4.height = 800;

const numberOfEnemies4 = 10;
const enemiesArray4 = [];


let gameFrames4 = 0;

class Enemy4 {

    constructor() {
        this.image = new Image();
        this.image.src = 'images/enemy4.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (CANVAS4_WIDTH - this.width);
        this.y = Math.random() * (CANVAS4_HEIGHT - this.height);
        this.newX = Math.random() * (CANVAS4_WIDTH - this.width);
        this.newY = Math.random() * (CANVAS4_HEIGHT - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 50); //interval time for each 
    }
    update() {

        if (gameFrames4 % this.interval == 0) {
            this.newX = Math.random() * (CANVAS4_WIDTH - this.width);
            this.newY = Math.random() * (CANVAS4_HEIGHT - this.height);
        }

        let dx = this.x - this.newX; // different between two coordinates (x - newX)
        let dy = this.y - this.newY; // different between two coordinates (y - newY)

        this.x -= dx / 100; // 100 for speed (it can be changed)
        this.y -= dy / 100; // 100 for speed (it can be changed)


        // animate sprite
        if (gameFrames4 % this.flapSpeed === 0) { // for each  'flapSpeed', animate sprite 
            this.frame > 5 ? this.frame = 0 : this.frame += 1;
        }

    }

    draw() {
        ctx4.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < numberOfEnemies4; i++) {
    enemiesArray4.push(new Enemy4());
}

function animate4() {

    ctx4.clearRect(0, 0, CANVAS4_WIDTH, CANVAS4_HEIGHT);
    enemiesArray4.forEach(enem => {
        enem.update();
        enem.draw();
    });
    gameFrames4++;
    requestAnimationFrame(animate4)
}
animate4();