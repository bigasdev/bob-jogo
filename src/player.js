import { getState, states } from "./state.js";
import { getCanvas, clearCanvas } from "./app.js";

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
        console.log('drawing');

        this.animate();

        clearCanvas();
        getCanvas().drawImage(this.sprite, this.position.x, this.position.y);
    }

    animate(){
        this.sprite.src = `./assets/bob/pulando/Armature_Pulando_${this.currentFrame}.png`
        this.currentFrame += 1;

        if(this.currentFrame >= this.maxFrames){
            this.currentFrame = 0;
        }
    }
}

export let Bob = new Player({x:50,y:50}, {w:1,h:1}, "./test.png", 5);