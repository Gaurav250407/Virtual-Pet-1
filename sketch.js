//Create variables here
var dog,dog_img,dog_img2,food,food_img,database;
var foodRef,foodStock;

function preload()
{
  //load images here
  dog_img=loadImage("images/dogImg.png")
  dog_img2=loadImage("images/dogImg1.png")
  
}

function setup() {
  createCanvas(800, 700);
  
  database=firebase.database();

  foodRef=database.ref('Food');
  foodRef.on('value',readStock);

  dog=createSprite(400,350,50,50)
  dog.addImage(dog_img); 
  dog.scale=0.3 
}


function draw() {  

  background(0);
  drawSprites();
  //add styles here

    drawSprites();

      fill(255);
      textSize(30);
      text("Current Food Stock in the inventory is:" +foodStock,150,200);
      text("Press up arrow key to feed the Tom");

      if(keyWentDown(UP_ARROW))
      {
        writeStock(foodStock);
        dog.addImage(dog_img2)
      }

}

function readStock(readData)
{
  foodStock=readData.val();
}

function writeStock(writeData)
{
  if(writeData<=0){
    writeData=0;
  }
    else
    {
    writeData=writeData-1;
  }
  database.ref('/').update({
    Food:writeData
  })
}