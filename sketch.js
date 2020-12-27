var PLAY= 1;
var END= 0;
var gameState= PLAY;


var gameOverImg, restartImg;

var bunney, bunney_collided;
var ground, invisibleGround;//, groundImage;

var obstaclesGroup, obstacle;

var score= 0;
var highscore= 0;

var gameOver, restart;


function preload(){
  bunney_running = loadAnimation("bunney1.png","bunney2.png");
 bunney_collided = loadImage("bunney1.png");
  
 //groundImage = loadImage("14966453.jpg");
  
  
  
 obstacle = loadImage("obstacle.png");
 
  gameOverImg = loadImage(" gameover.jpg");
  restartImg= loadImage("restart.jpg");
}

function setup() {
  createCanvas(600, 450);
  
  bunney = createSprite(50,150,20,50);
  bunney.addAnimation("running", bunney_running);
  bunney.addAnimation("collided", bunney_collided);
  bunney.scale = 1
  
  ground = createSprite(100,450,1200,20);
 // ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,445,400,10);
  invisibleGround.visible = false;
  
  
  obstaclesGroup = new Group();
  
  gameOver= createSprite(300, 200);
  gameOver.addImage(gameOverImg);
  
    restart= createSprite(300, 350);
  restart.addImage(restartImg);
  
  
  gameOver.visible= false;
  restart.visible= false;
  
  score = 0;
}

function draw() {
  background("pink");
  fill("blue");
  textSize(20);
  text("SCORE: "+ score, 450,50);
  
  if(gameState== PLAY){
    
  
  score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX= -(6+3*score/100);
  
  if(keyDown("space") && bunney.y>=150) {
    bunney.velocityY = -12;
  }
  
  bunney.velocityY = bunney.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  bunney.collide(invisibleGround);
  
  spawnObstacles();
    if(obstaclesGroup.isTouching(bunney)){
    gameState= END;
    }
  }
  else if(gameState== END){
     gameOver.visible = true;
    restart.visible = true;

    gameOver.scale=1;
    restart.scale=0.1;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    bunney.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    //change the bunney animation
    bunney.changeAnimation("collided",bunney_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(highscore< score){
      highscore=score;
    }
    
  fill("red");
    text("HI:" + highscore,400, 50);
  
  if(mousePressedOver(restart)) {
    reset();
  }
    
  }
  
  drawSprites();
  
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,420,10,70);
    obstacle.velocityX = -(6+score/100);

    //obstacle.addImage(obstacle);
    
    //generate random obstacles
   // var rand = Math.round(random(1));
   //switch(rand) {
     // case 1: obstacle.addImage(obstacle);
      //      break;
     
 //  default: break;
   // }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  bunney.changeAnimation("running", bunney_running);
  
  score = 0;
  
}