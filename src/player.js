import { getState, states } from "./state.js";
import { getCanvas, clearCanvas } from "./app.js";
import { keyPressed, keys } from "./controller.js";

class Player{
    constructor(position, size, image, speed){
        this.position = position;
        this.size = size;
        this.image = image;
        this.speed = speed;

        //creating base image
        this.sprite = new Image();
        this.sprite.src = "./assets/bob/parado/Armature_Parado_00.png";

        this.maxFrames = 16;
        this.currentFrame = 0;
    }

    draw(){
        if(getState() !== states.playing)return;
        console.log(`drawing, ${this.position.x}`);

        this.animate();

        getCanvas().drawImage(this.sprite, this.position.x, this.position.y);
    }

    animate(){
        this.sprite.src = `./assets/bob/correndo/Armature_Correndo_${this.currentFrame}.png`
        this.currentFrame += 1;

        if(this.currentFrame >= this.maxFrames){
            this.currentFrame = 0;
        }

        this.update();
        this.gravity();
    }

    update(){
        if(keys.d.pressed){
            this.position.x += this.speed;
        }
        if(keys.a.pressed){
            this.position.x -= this.speed;
        }
        if(keys.w.pressed){
            if(this.position.y < 340)return;
            this.position.y -= 145;
        }
    }
    
    gravity(){
        if(this.position.y >= 350)return;
        this.position.y += 7.5;
    }
}
class BotanicoClass{
    constructor(position, size, image, speed){
        this.position = position;
        this.size = size;
        this.image = image;
        this.speed = speed;

        //creating base image
        this.sprite = new Image();
        this.sprite.src = "./assets/bob/parado/Armature_Parado_00.png";

        this.maxFrames = 48;
        this.currentFrame = 0;
    }

    draw(){
        if(getState() !== states.playing)return;
        console.log(`drawing, ${this.position.x}`);

        this.animate();

        getCanvas().drawImage(this.sprite, this.position.x, this.position.y);
    }

    animate(){
        this.sprite.src = `./assets/botanico/parado/Armature_Parado_${this.currentFrame}.png`
        this.currentFrame += 1;

        if(this.currentFrame >= this.maxFrames){
            this.currentFrame = 0;
        }

        this.update();
        this.gravity();
    }

    update(){
        if(keys.ArrowRight.pressed){
            this.position.x += this.speed;
        }
        if(keys.ArrowLeft.pressed){
            this.position.x -= this.speed;
        }
        if(keys.ArrowUp.pressed){
            if(this.position.y < 420)return;
            this.position.y -= 145;
        }
    }
    
    gravity(){
        if(this.position.y >= 430)return;
        this.position.y += 7.5;
    }
}

export let Bob = new Player({x:50,y:50}, {w:1,h:1}, "./test.png", 5);
export let Botanico = new BotanicoClass({x:150,y:50}, {w:1,h:1}, "./test.png", 5);