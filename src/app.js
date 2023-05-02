import { Bob, Botanico } from "./player.js";
import { menuAnimation, startButtons, startMenuAnimation } from "./menu.js";
import { startController } from "./controller.js";
import { startTutorial } from "./tutorial.js";
import startEndgame, { startEndgameController } from "./endgame.js";
import { changeState, getState, states } from "./state.js";
import { loadCharactersAssets, loadMenuAssets } from "./loader.js";

var canvas;
var c2d;

//variaveis de controle pro jogo
var playersDistThreshold = 650;
export var winner;

//Funcao de iniicializao pra tudo
function startApp() {
    changeState(states.idle, "Starting app");
    loadMenuAssets();
    loadCharactersAssets();
}

function startCanvas() {
    canvas = document.getElementById("canvas_bg");
    c2d = canvas.getContext("2d");

    canvas.width = 960;
    canvas.height = 540;
    //canvas.style = "";
}

export function getCanvas() {
    return c2d;
}
export function clearCanvas() {
    c2d.clearRect(0, 0, canvas.width, canvas.height);
}

//Variaveis pra controlar o fps
var fps, fpsInterval, startTime, now, then, elapsed;

// Inicializando com fps, no nosso caso vai ser 60

function startUpdate(fps) {
    fpsInterval = 1000 / fps;
    then = performance.now();
    startTime = then;
    update();
}

function update() {
    window.requestAnimationFrame(update);
    if (getState() === states.idle) return;

    //calcumos desde o ultimo loop
    now = performance.now();
    elapsed = now - then;

    //se for desenhamos
    if (elapsed > fpsInterval) {
        clearCanvas();
        then = now - (elapsed % fpsInterval);

        //check pra animacao inicial
        if (getState() !== states.playing) menuAnimation();
        Bob.draw();
        Botanico.draw();
    }
    //check de distancia entre os players
    {
        var d = Math.abs(Bob.position.x - Botanico.position.x);
        if (d >= playersDistThreshold) {
            console.log(`Bob position : ${Bob.position.x}`);
            console.log(`Botanico position : ${Botanico.position.x}`);

            if (Bob.position.x > Botanico.position.x) {
                Bob.score += 50;
                winner = "BOB";
            } else {
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
startApp();
startCanvas();
startMenuAnimation();
startButtons();
startController();
startTutorial();
startEndgameController();

//metodo update
startUpdate(45);
update();
