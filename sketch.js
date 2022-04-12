var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlocksGroup=new Group()

  ghost = createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3
}

function draw() {

  background(200);
  if (gameState==="play")
 {
  
   if (keyDown("space")) {
    ghost.velocityY=-5
  }
  ghost.velocityY=ghost.velocityY+0.8
  if (keyDown("left_arrow")) {
    ghost.x=ghost.x-3
  }
  if (keyDown("right_arrow")) {
    ghost.x=ghost.x+3
  }
  if(tower.y > 400){
      tower.y = 300
    }
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY=0
    }
    if (invisibleBlocksGroup.isTouching(ghost) || ghost.y>600  ) {
      ghost.destroy()
      gameState="end"
    }
    spawnDoors()
    
    drawSprites()
  }
  if (gameState==="end"){
    textSize(30)
    fill ("yellow")
    text("gameOver",250,250)
  }
}
function spawnDoors() {
  if (frameCount%250 === 0) {
 
  
door=createSprite(200,-50)
door.x=Math.round(random(120,240))
door.addImage("door",doorImg);
door.velocityY=1
doorsGroup.add(door)
door.lifetime=600

climber=createSprite(200,10)
climber.x=door.x
climber.addImage("climber",climberImg);
climber.velocityY=1
climbersGroup.add(climber)
climber.lifetime=600

invisibleBlock=createSprite(200,15)
invisibleBlock.x=door.x
invisibleBlock.width=door.width
invisibleBlock.height=10
//.addImage("climber",climberImg);
invisibleBlock.velocityY=1
invisibleBlocksGroup.add(invisibleBlock)
invisibleBlock.lifetime=600
invisibleBlock.debug=true
ghost.depth=door.depth
ghost.depth+=1

}


}