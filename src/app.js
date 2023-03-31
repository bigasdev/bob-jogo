import { Bob, Botanico } from './player.js';
import {startButtons} from './menu.js';
import { startController } from './controller.js';
import { addTutorialListener } from './tutorial.js';

var canvas;
var c2d;

function startCanvas(){
    canvas = document.getElementById("canvas_bg");
    c2d = canvas.getContext('2d');

    canvas.width = 960
    canvas.height = 540
    //canvas.style = "";


}

export function getCanvas(){
    return c2d;
}
export function clearCanvas(){
    c2d.clearRect(0,0,canvas.width,canvas.height);
}

function update(){
    window.requestAnimationFrame(update);
    clearCanvas();
    
    Bob.draw();
    Botanico.draw();
}

startCanvas();
startButtons();
startController();
addTutorialListener();

//
update();