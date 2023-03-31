import { Bob, Botanico } from './player.js';
import {startButtons} from './menu.js';
import { startController } from './controller.js';
import { startTutorial } from './tutorial.js';
import startEndgame, { startEndgameController } from './endgame.js';

var canvas;
var c2d;

//variaveis de controle pro jogo
var playersDistThreshold = 650;
export var winner;

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

    //check de distancia entre os players
    {
        var d = Math.abs(Bob.position.x - Botanico.position.x);
        if(d >= playersDistThreshold){
            console.log(`Bob position : ${Bob.position.x}`);
            console.log(`Botanico position : ${Botanico.position.x}`);

            if(Bob.position.x > Botanico.position.x){
                Bob.score += 50;
                winner = "BOB";
            }else{
                Botanico.score += 50;
                winner = "BOTANICO";
            }
            Bob.restart();
            Botanico.restart();
            startEndgame();
        }
    }
}

//inicializando todas as variaveis de start
startCanvas();
startButtons();
startController();
startTutorial();
startEndgameController();

//metodo update
update();