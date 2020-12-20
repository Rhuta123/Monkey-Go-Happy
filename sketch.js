
var PLAY=1;
var END=0;


var gameState=PLAY; 
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

var survivalTime=0;
var gameover,gameoverImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameoverImage=loadImage("gameover.png");
  
}



function setup() {
  
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  
  ground=createSprite(400,350,900,10);
  ground.x=ground.width/2;
  
  
  

  FoodGroup=createGroup();
  obstacleGroup=createGroup();
 
}

function draw() {
  background(225);

   
   monkey.debug=true;
  
   if(gameState===PLAY){
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(monkey.y);
     
     
   
 if(keyDown("space")&& monkey.y >=80) {
 monkey.velocityY = -12; 
 }
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
     
  spawnObstacle();
  spawnFood();
     
      
    stroke("white");
    textSize(20);
    fill("white");
    text("Score"+score,500,500);
  
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
   text("Survival Time: "+survivalTime,100,20);
     
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
    
    
    
  }   
   }else if(gameState===END){
   
     ground.velocityX=0;
     monkey.velocityX=0;
     obstacleGroup.velocityX=0;
     FoodGroup.velocityX=0;
     
     
     
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
   
     monkey.visible=false;
     
     gameover=createSprite(200,200,10,10);
      gameover.addImage(gameoverImage);
     gameover.scale=0.5;
   }
    
  
   
  drawSprites();
  
}

function spawnFood(){
 if(frameCount%80===0){
   var banana=createSprite(600,250,40,10);
   banana.velocityX=-5;
   banana.addImage(bananaImage);
   banana.scale=0.09;
   banana.y=Math.round(random(120,200));
   FoodGroup.add(banana);
   
 } 
}

function spawnObstacle(){
  if(frameCount%300===0){
    var obstacle=createSprite(600,305,40,10);
    obstacle.velocityX=-6;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacleGroup.add(obstacle);
    
  }
}