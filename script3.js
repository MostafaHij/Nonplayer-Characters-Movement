/**  @type {HTMLCanvasElement} */
const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');

const CANVAS3_WIDTH = canvas3.width = 500;
const CANVAS3_HEIGHT = canvas3.height = 800;

const numberOfEnemies3 = 200;
const enemiesArray3 = [];


let gameFrames3 = 0;

class Enemy3 {

    constructor() {
        this.image = new Image();
        this.image.src = 'images/enemy3.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (CANVAS3_WIDTH - this.width);
        this.y = Math.random() * (CANVAS3_HEIGHT - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 1.5 + 0.5;
    }

    update() {

        // Tip1: Try to change (Math.sin(this.angle * Math.PI / 90)) (Math.cos(this.angle * Math.PI / 360)) to see more paths
        // Tip2: (sin = cos) -> same numbers makes path in circle
        // Tip3: (sin > cos) -> makes path like ( U ) 
        // Tip4: (sin < cos) -> Makes path like SNAKE 
        // Tip5: (sin = 100) and (cons = 200) -> maked path like infinity 
        this.x = (CANVAS3_WIDTH / 2) * Math.sin(this.angle * Math.PI / 100) + ((CANVAS3_WIDTH / 2) - (this.width / 2));
        this.y = (CANVAS3_HEIGHT / 2) * Math.cos(this.angle * Math.PI / 200) + ((CANVAS3_HEIGHT / 2) - (this.height / 2));

        this.angle += this.angleSpeed;

        // animate sprite
        if (gameFrames3 % this.flapSpeed === 0) { // for each  'flapSpeed', animate sprite 
            this.frame > 4 ? this.frame = 0 : this.frame += 1;
        }

    }

    draw() {
        ctx3.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < numberOfEnemies3; i++) {
    enemiesArray3.push(new Enemy3());
}

function animate3() {

    ctx3.clearRect(0, 0, CANVAS3_WIDTH, CANVAS3_HEIGHT);
    enemiesArray3.forEach(enem => {
        enem.update();
        enem.draw();
    });
    gameFrames3++;
    requestAnimationFrame(animate3)
}
animate3();