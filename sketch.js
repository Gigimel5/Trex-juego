
var trex, trex_running, trex_dead;
var piso, pisoImage, piso_invisible;
var grupoNubes, fondo;
var grupoObs,obs1, obs2, obs3, obs4, obs5, obs6;
var nube, nubeImage;
var score=0;
var gameOver, gameOverImg;
var restart, restartImg;
var saltar, morir, checkpoint;

const PLAY=1;
const END=0;
var gameState=PLAY;
var azar;
function preload(){
  trex_running=loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_dead=loadAnimation("trex_collided.png");

  pisoImage=loadImage("ground2.png");

  nubeImage=loadImage("cloud.png");

  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");

  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");

  saltar=loadSound("jump.mp3");
  morir=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  trex=createSprite(100,height-300,10,20);
  trex.addAnimation ("running", trex_running);
  trex.addAnimation ("dead", trex_dead);
  trex.scale=0.6;
  trex.debug=true
  trex.setCollider("circle",0,0,50 )
  //trex.setCollider("rectangle",0,0,300,100 )

  piso=createSprite(300,height-300,600,10);
  piso.addImage(pisoImage);
  

  piso_invisible=createSprite(width/2,height-290,width,7);
  piso_invisible.shapeColor="orange";
  piso_invisible.visible=false;

  //azar=Math.round(random(1,100))

  grupoObs = new Group();
  grupoNubes = new Group();

  gameOver=createSprite(width/2,height/2-200)
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;


  restart=createSprite(width/2,height/2-160)
  restart.addImage(restartImg);
  restart.scale=0.4;
  restart.visible=false;
}

function draw(){
  background("white");
  drawSprites();
  text(mouseX+"-"+mouseY,mouseX,mouseY);    
  
//console.log();
//console.info();
//console.error();
//console.warn();
//console.log(trex.y;

console.log(height)
 
  trex.collide(piso_invisible);

  if(gameState===PLAY){ 
    text("score "+score,width-100,50)
    score=score+ Math.round(frameCount/60);
    piso.velocityX=-(8+ score/150);

   if(keyDown("space") && trex.y>=height-325) {
    trex.velocityY=-12;
    saltar.play();
    }

   // obstacle.velocityX = -(6 + score/100); //como aumetar la velocidad ej.
   //obstacle.velocityX = -(6 + score/100);

    if(piso.x<320){
      piso.x=width/2;
    }
    restart.visible=false;
    gameOver.visible=false;

    crearFondo();
    crearCactus();
    
    if(grupoObs.isTouching (trex)){
     // trex.velocityY=-12;
     // saltar.play();
    gameState=END;
    morir.play();
    } 
    trex.velocityY=trex.velocityY+0.85
    
     if (score>0 && score %150 === 0){

    checkpoint.play();
  }
  }
   else if(gameState===END){
    piso.velocityX = 0;

    grupoObs.setVelocityXEach(0);
    grupoObs.setLifetimeEach(-1);
    grupoNubes.setVelocityXEach(0);
    grupoNubes.setLifetimeEach(-1);
    trex.velocityY=0;

    trex.changeAnimation("dead", trex_dead);
    

    restart.visible=true;
    gameOver.visible=true;
  if(mousePressedOver(restart)){//palabra reser
    gameState = PLAY;
    reiniciar();
    }
  }
}

function crearFondo(){
  var alto=Math.round(random(20,100));
  var tam=(random(0.5,0.8));
  var velocidad=Math.round(random(-2,-3));
  var variar=Math.round(random(60,80));
    if(frameCount % variar === 0){
      var nube=createSprite(width,random(alto),60,15);
      nube.addImage(nubeImage);
      nube.velocityX=velocidad;
      nube.scale=tam;
      nube.lifetime=350;
      grupoNubes.add(nube);
    }
      //console.log(frameCount)
  }
function crearCactus(){
    var imagenAzar= Math.round(random(1,6))
    if(frameCount %60 === 0){
      var cactus=createSprite(width,height-315,15,15);
      cactus.velocityX=-(10+ score/150);
      cactus.lifetime=350;
      grupoObs.add(cactus);

      switch(imagenAzar){
         case 1: cactus.addImage(obs1);
            cactus.scale=0.6;  
                break;
         case 2: cactus.addImage(obs2);
            cactus.scale=0.6;
                break;
         case 3: cactus.addImage(obs3);
            cactus.scale=0.6; 
                break;
         case 4: cactus.addImage(obs4);   
            cactus.scale=0.6;
                break;
         case 5: cactus.addImage(obs5);
            cactus.scale=0.4;
                break;
         case 6: cactus.addImage(obs6);
            cactus.scale=0.3;
                break;
      }
    }
  }
function reiniciar(){
  restart.visible=false;
  gameOver.visible=false;
  grupoNubes.destroyEach();
  grupoObs.destroyEach();
  trex.changeAnimation("running", trex_running);
  score=0;
}
