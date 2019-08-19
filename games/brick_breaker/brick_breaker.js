const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Brick extends Rectangle {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
    }

    delete() {
        brickArr.splice(brickArr.indexOf(this), 1);
        player.score();

        if(brickArr.length === 0) {
            player.gameOver = true;
        }

        //Create Particles
        for(let i = 0; i < 100; i++) {
            particleArr.push(new Particle(this.x + this.width/2, this.y + this.height/2, 2, this.color, new Vector2d(Math.random() * (2 - (-2)) + (-2), Math.random() * (2 - (-2)) + (-2))));
        }

        //Random Chance to create Item
        if(Math.random() > 0.8) {
            if(Math.random() > 0.5) {
                itemArr.push(new Item(this.x + this.width/2, this.y + this.height/2, 'MoreBalls'));
            } else {
                itemArr.push(new Item(this.x + this.width/2, this.y + this.height/2, 'Laser'));
            }
        }
    }
}

class Player extends Rectangle {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);

        this.lives = 3;
        this.points = 0;
        this.gameOver = false;
        this.velocity = new Vector2d(0, 0);
        this.laser = false;
        this.cooldown = false;
    }

    move() {
        if(this.x + this.velocity.x > 5 && this.x + this.velocity.x + this.width < canvas.width-5) {
            this.x += this.velocity.x;
        }
    }

    damage() {
        this.lives--;
        if(this.lives <= 0) {
            this.gameOver = true;
        }
    }

    score() {
        this.points += 50;
    }
}

class Laser extends Rectangle {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.velocity = new Vector2d(0, -1);
    }

    move() {
        if(this.y + this.velocity.y < 0) {
            this.delete();
        
        }

        brickArr.forEach(brick => {
            if(this.y + this.velocity.y < brick.y + brick.height && this.x > brick.x && this.x < brick.x + brick.width) {
                brick.delete();
                this.delete();
            }
        })

        this.y += this.velocity.y;
    }

    delete() {
        laserArr.splice(laserArr.indexOf(this), 1);
    }
}

class Circle {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Ball extends Circle {
    constructor(x, y, r, color, velocity, transparent) {
        super(x, y, r, color);
        this.velocity = velocity;
        this.transparent = transparent;
    }

    move() {
        //Collision with Walls
        if(this.x - this.r + this.velocity.x < 0 || this.x + this.r + this.velocity.x > canvas.width) {
            this.velocity.x *= -1;
        }
        
        if(this.y - this.r + this.velocity.y < 0) {
            this.velocity.y *= -1;
        } else if(this.y + this.r + this.velocity.y > player.y + player.height) {
            if(this.transparent) {
                this.delete();
            } else {
                ResetGame();
                ballArr.push(this);
                this.reset();
            }
           
        }

        //Collision with Player
        if(this.velocity.x > 0 && this.velocity.y > 0 && this.x + this.r < player.x && this.x + this.r + this.velocity.x > player.x 
            && this.y + this.r + this.velocity.y > player.y) {
            //Ball hits Player from left
            this.velocity.x *= -1;
            this.velocity.y *= -1;
        
        } else if(this.velocity.x < 0 && this.velocity.y > 0 &&  this.x + this.r > player.x + player.width && this.x + this.r + this.velocity.x < player.x + player.width
            && this.y + this.r + this.velocity.y > player.y) {
            //Ball hits Player from right
            this.velocity.x *= -1;
            this.velocity.y *= -1;  
        
        } else if(this.x + this.r + this.velocity.x > player.x && this.x + this.r + this.velocity.x < player.x + player.width
            && this.y + this.r + this.velocity.y > player.y) {
            //Ball hits Player on top
            this.velocity.y *= -1;
        }

        //Collision with Brick
        let nextPos = new Vector2d(this.x + this.velocity.x, this.y + this.velocity.y);
        brickArr.forEach(brick => {
            if(nextPos.x > brick.x && nextPos.x < brick.x + brick.width 
                && nextPos.y > brick.y && nextPos.y < brick.y + brick.height) {
                    brick.delete();
                    this.velocity.y *= -1;
                }
        })

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    reset() {
        player.damage();
        gameStarted = false;
        this.x = 395;
        this.y = 550;
        this.velocity = new Vector2d(0, 0);
    }

    delete() {
        ballArr.splice(ballArr.indexOf(this), 1);
    }
}

class Particle extends Circle {
    constructor(x, y, r, color, velocity) {
        super(x, y, r, color);
        this.velocity = velocity;
    }

    move() {
        if(this.x + this.velocity.x > canvas.width || this.x + this.velocity.x < 0 ||
            this.y + this.velocity.y > canvas.height || this.y + this.velocity.y < 0) {
                this.delete();
            } else {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
            }
    }

    delete() {
        particleArr.splice(particleArr.indexOf(this), 1);
    }
}

class Item {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.velocity = new Vector2d(0, 1);
        this.type = type;
        this.image = new Image();
        this.setImage();
    }

    setImage() {
        switch(this.type) {
            case "MoreBalls":
                this.image.src = 'images/balls.png';
                break;
            case "Laser":
                this.image.src = 'images/laser.png';
                break;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.r*2, this.r*2);
    }

    move() {
        if(this.y + this.r + this.velocity.y > canvas.height) {
            this.delete();
        
        } else if(this.x + this.r > player.x && this.x + this.r < player.x + player.width &&
            this.y + this.r + this.velocity.y > player.y) {
            
            if(this.type === 'MoreBalls') {
                for(var i = 0; i < 3; i++) {
                    if(Math.random() > 0.5) {
                        ballArr.push(new Ball(player.x + player.width/2, player.y - 10, 10, '#00ffff', new Vector2d(3, -3), true));
                    } else {
                        ballArr.push(new Ball(player.x + player.width/2, player.y - 10, 10, '#00ffff', new Vector2d(-3, -3), true));
                    }
                }

            } else if(this.type === 'Laser') {
                player.laser = true;
                let reset = setInterval(() => {
                    player.laser = false;
                    clearInterval(reset);
                }, 5000);
            }
            this.delete();
        }

        this.y += this.velocity.y;
    }

    delete() {
        itemArr.splice(itemArr.indexOf(this), 1);
    }
}

//Vars
let player;
let ballArr = [];
let brickArr = [];
let particleArr = [];
let itemArr = [];
let laserArr = [];
let gameStarted = false;
let gameLoop;

Initialize();
function Initialize() {
    //Create Objects
    player = new Player(320, 570, 160, 20, '#ffffff');
    player.draw();

    let color;
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 8; j++) {
            switch(i % 4) {
                case 0:
                    color = '#ff0000';
                    break;

                case 1:
                    color = '#00ff00';
                    break;

                case 2:
                    color = '#0000ff';
                    break;

                case 3:
                    color = '#ffff00';
                    break;
            }

            brickArr.push(new Brick(10 +80*i, 30 +30*j, 60, 20, color));
            
        }
    }

    brickArr.forEach(brick => {
        brick.draw();
    })

    let ball = new Ball(395, 550, 10, '#00ff00', new Vector2d(0, 0), false);
    ball.draw();
    ballArr.push(ball);

    gameLoop = setInterval(update, 10);
}

function update() {
    if(player.gameOver) {
        clearInterval(gameLoop);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000000';
    ctx.font = "20px Arial";
    ctx.fillText("Leben: " +player.lives, 10, 20);
    ctx.fillText("Punkte: " +player.points, 680, 20); 

    if(keys["37"]) {player.velocity.x = -4;}
    else if(keys["39"]) {player.velocity.x = 4;}
    else {player.velocity = new Vector2d(0,0)};

    particleArr.forEach(particle => {
        particle.move();
        particle.draw();
    })

    player.move();
    player.draw();

    brickArr.forEach(brick => {
        brick.draw();
    })

    ballArr.forEach(ball => {
        ball.move();
        ball.draw();
    })

    itemArr.forEach(item => {
        item.move();
        item.draw();
    })

    laserArr.forEach(laser => {
        laser.move();
        laser.draw();
    })
}

document.addEventListener("keydown", function(event) {
    if(!gameStarted && event.keyCode === 32) {
        ballArr.forEach(ball => {
            if(Math.random() > 0.5) {
                ball.velocity = new Vector2d(3, -3);
            } else {
                ball.velocity = new Vector2d(-3, -3);
            }
        })

        gameStarted = true;
    } else if(gameStarted && player.laser === true && event.keyCode === 32 && !player.cooldown) {
        if(Math.random() > 0.5) {
            laserArr.push(new Laser(player.x + player.width - 15, player.y, 4, 8, '#ff0000'));
        } else {
            laserArr.push(new Laser(player.x + 15, player.y, 4, 8, '#ff0000'));
        }
        player.cooldown = true;
        let cooldown = setInterval(() => {
            player.cooldown = false;
            clearInterval(cooldown);
        }, 500);
        
        
    }
})

//Key Control
var keys = {};
window.onkeyup = function(e) { keys[e.keyCode] = false};
window.onkeydown = function(e) { keys[e.keyCode] = true};

function ResetGame() {
    player.laser = false;
    ballArr = [];
    particleArr = [];
    itemArr = [];
    laserArr = [];
}