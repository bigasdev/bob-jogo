//Script principal, aqui iremos inicializar tudo e rodar o update

import { Bob, Botanico } from "./player.js";
import { menuAnimation, startButtons, startMenuAnimation } from "./menu.js";
import { startController } from "./controller.js";
import { startTutorial } from "./tutorial.js";
import startEndgame, { startEndgameController } from "./endgame.js";
import { changeState, getState, states } from "./state.js";
import { loadCharactersAssets, loadMenuAssets } from "./loader.js";
import { updateCamera } from "./camera.js";

//Variaveis locais para o canvas e o context
var canvas;
var c2d;

//variaveis de controle pro jogo
var playersDistThreshold = 760;
export var winner;

//Funcao de iniicializao pra tudo
//Aqui iremos controlar o state inicial e dar load nos assets
function startApp() {
    changeState(states.idle, "Starting app");
    loadMenuAssets();
    loadCharactersAssets();
}
//Funcao de inicio pra setar as variaveis locais e o tamanho do canvas
function startCanvas() {
    canvas = document.getElementById("canvas_bg");
    c2d = canvas.getContext("2d");

    canvas.width = 960;
    canvas.height = 540;
    //canvas.style = "";
}
//Funcao pra utilizar o context em outros scripts
export function getCanvas() {
    return c2d;
}
export function clearCanvas() {
    //Precisamos fazer isso pra sempre limpar a tela no transform atual (camera)
    c2d.clearRect(0, 0, 1960, canvas.height);
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

//Update que vai rodar de acordo com o fps que setamos quando for chamado
function update() {
    //Pedindo pro update ser chamado a cada frame do browser (no nosso caso a 45 fps)
    window.requestAnimationFrame(update);
    if (getState() === states.idle) return;

    //calcumos desde o ultimo loop
    now = performance.now();
    elapsed = now - then;

    //se for desenhamos
    if (elapsed > fpsInterval) {
        //controle da camera
        updateCamera(canvas, c2d, Bob.position.x, Botanico.position.x);
        clearCanvas();
        then = now - (elapsed % fpsInterval);

        //check pra animacao inicial
        if (getState() !== states.playing) menuAnimation();
        Bob.draw();
        Botanico.draw();
    }
    //check do fim de jogo
    if (Bob.position.x > 1960 || Botanico.position.x > 1960) {
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

//Inicializando todas as variaveis de start
startApp();
startCanvas();
startMenuAnimation();
startButtons();
startController();
startTutorial();
startEndgameController();

//Metodo update
startUpdate(45);
update();
