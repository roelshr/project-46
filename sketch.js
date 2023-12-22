var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg;
var zombieGroup;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var bullets = 70;
var gameState = "fight";
var bulletGroup;

function preload() {
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  bgImg = loadImage("assets/bg.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 2.3;

  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;
  player.debug = true;
  player.setCollider("rectangle", 0, 0, 300, 300);

  heart1 = createSprite(displayWidth - 150, 40, 20, 20);
  heart1.visible = false;
  heart1.addImage("heart1", heart1Img);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth - 150, 40, 20, 20);
  heart2.visible = false;
  heart2.addImage("heart2", heart2Img);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth - 150, 40, 20, 20);
  heart3.visible = true;
  heart3.addImage("heart3", heart3Img);
  heart3.scale = 0.4;

  zombieGroup = new Group();
  bulletGroup = new Group();

  setInterval(enemy, 1000);
}

function draw() {
  background(0);

    if (gameState === "fight") {
      for (var i = 0; i < zombieGroup.length; i++) {
        if (zombieGroup[i].isTouching(player)) {
          zombieGroup[i].destroy();
          reduceHearts();
        }
      }
    } else if (gameState === "end") {
      textSize(50);
      fill(255, 0, 0);
      text("Game Over", width / 2 - 150, height / 2);
    }


  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30;
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30;
  }

  if (keyWentDown("space")) {
    player.addImage(shooter_shooting);
    shootBullet();
  } else if (keyWentUp("space")) {
    player.addImage(shooterImg);
  }

  for (var i = 0; i < zombieGroup.length; i++) {
    for (var j = 0; j < bulletGroup.length; j++) {
      if (bulletGroup[j].isTouching(zombieGroup[i])) {
        zombieGroup[i].destroy();
        bulletGroup[j].destroy();
      }
    }
  }

  drawSprites();
}


function shootBullet() {
  var bullet = createSprite(player.x, player.y - 30, 20, 10);
  bullet.velocityX = 20;
  bulletGroup.add(bullet);
}

function enemy() {
  var zombie = createSprite(random(1000, width - 100), random(height-300, height-100), 40, 40);
  zombie.addImage(zombieImg);
  zombie.scale = 0.15;
  zombie.debug = true;
  zombie.setCollider("rectangle", 50, 100);
  zombie.lifetime = 500;
  zombie.velocityX = -2.5;
  zombieGroup.add(zombie);
}
function reduceHearts() {
  if (heart3.visible) {
    heart3.visible = false;
  } else if (heart2.visible) {
    heart2.visible = false;
  } else if (heart1.visible) {
    heart1.visible = false;
    gameState = "end";
  }
}