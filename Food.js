class Food{
    constructor(){
        this.image = loadImage("Milk.png");
        this.foodStock= 0;
        this.lastFed;
    }
    getFoodStock(){
        return this.foodStock;
    }
    updateFoodStock(foodStocks){
        this.foodStock = foodStocks;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock-=1;
        }
    }
    getFedTime(lastfed){
        this.lastFed = lastfed;
    }

    Bedroom(){
        background(bedroom,550,500);
    }
    Garden(){
        background(garden,550,500);
    }
    Washroom(){
        background(washroom,550,500);
    }

    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
            
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
}