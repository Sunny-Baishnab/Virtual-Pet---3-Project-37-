//Create variables here
var dog , happyDog;
var database;
var foodS , foodStock
var dogImg;
var feedDog , AddFood;
var fedTime , lastFed;
var foodobj;
var readState , gameState = "Hungry";
var washroom , bedroom , garden;
function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  garden = loadImage("istockphoto-1153692184-612x612.jpg");
  washroom = loadImage("frida-with-bath-towel-rubber-duck_orig.jpg");
  bedroom = loadImage("download.png");
}

function setup() {
  createCanvas(1200, 500);
  database = firebase.database();

  dog = createSprite(950,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  food = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })
  

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedthedog);

  AddFood = createButton("Add Food");
  AddFood.position(800,95);
  AddFood.mousePressed(addFood);
}


function draw() {  
  background(46,139,87);
  drawSprites();
  //food.display();

  fedTime = database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  textSize(20);
  fill("white");
  if(lastFed>=12){
    text("last fed: "+lastFed%12+ " PM",300,100);
  }else if(lastFed===0){
    text("last fed: 12 AM",300,100)
  }else{
    text("last fed: "+lastFed+ " AM",300,100);
  }

  currentTime = hour();
  if(currentTime == (lastFed+1)){
    update("Playing");
    food.Garden();
  }else if(currentTime == (lastFed+2)){
    update("Sleeping");
    food.Bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    food.Washroom();
  }else{
    update("Hungry")
    food.display();
  }
  console.log(gameState);

  if(gameState!== "Hungry"){
    feed.hide();
    AddFood.hide();
  }
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedthedog(){
  dog.addImage(happyDog);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    fedTime:hour()
  })
}

function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}






