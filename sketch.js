const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var mango1, pig1,pig3;
var backgroundImg,platform;
var stone, launcher;
var ground;
var gameState = "onlauncher";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);

    mango1 = new Mango(700,320,70,70);
    mango2 = new Mango(920,320,70,70);
   
    mango3 = new Mango(700,240,70,70);
    mango4 = new Mango(920,240,70,70);
   
    mango5 = new Mango(810,160,70,70);
   
tree=new Tree(800,300);
    stone = new Stone (200,50);

  
    launchershot = new Launcher(stone.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
   
    mango1.display();
    mango2.display();
    ground.display();
    
    mango3.display();
    mango4.display();
   
    mango5.display();
    
    stone.display();
  tree.display(); 
    launchershot.display();    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(stone.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    launcher.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        stone.trajectory=[];
        Matter.Body.setPosition(stone.body,{x:200,y:50})
       launchershot.attach(stone.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    console.log(hour);
    if(hour>=06 && hour<=1900){
        console.log("if");
        bg = "sprites/bg1.png";
    }else{
        console.log("else");
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}