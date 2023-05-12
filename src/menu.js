//Script responsavel pelo menu inicial

import { getCanvas, resizeCanvas } from "./app.js";
import startCreditos, { closeCreditos } from "./creditos.js";
import { startCutscene } from "./cutscene.js";
import { getAsset } from "./loader.js";
import { enablePause } from "./pause.js";
import {
    ajustarBotaoMute,
    menuClick,
    playSound,
    quackQuack,
    startSound,
} from "./som.js";
import { changeState, states } from "./state.js";
import startTutorialApp from "./tutorial.js";
import { closeTutorial } from "./tutorial.js";

export function startButtons() {
    document.getElementById("voltar").addEventListener("click", () => {
        playSound(menuClick);
        restart();
    });
    document.getElementById("start").addEventListener("click", () => {
        playSound(menuClick);
        playButton();
    });
    document.getElementById("instrucoes").addEventListener("click", () => {
        playSound(menuClick);
        tutorialButton();
    });
    document.getElementById("creditos").addEventListener("click", () => {
        playSound(menuClick);
        creditosButton();
    });
}
export function changeSairState(state) {
    if (state) {
        document.getElementById("voltar").style.display = "block";
        document.getElementById("menu").style.display = "none";
    } else {
        resizeCanvas();
        document.getElementById("voltar").style.display = "none";
    }
}
export function sairMenu() {
    document.getElementById("menu").style.display = "none";
}

//Funcao para reiniciar o jogo
export function restart() {
    document.getElementById("menu").style.display = "block";
    ajustarBotaoMute(false);
    changeSairState(false);
    closeTutorial();
    closeCreditos();
    enablePause(false);
    changeState(states.cutscene);
}

function playButton() {
    //changeState(states.playing);
    startCutscene();
}
function tutorialButton() {
    changeSairState(true);
    startTutorialApp();
}
function creditosButton() {
    changeSairState(true);
    startCreditos();
}

//Animacao do menu
let animIndex = 0;
let folderName = "Entrando";
let animName = "Armature_Entrando_";
let animSprite;

let quackSom = false;

//Inicializando o menu pra ter o sprite
export function startMenuAnimation() {
    getCanvas().drawImage(getAsset(`${animName}${animIndex}`), 0, 0);
}
//Mudando o sprite a cada frame
export function menuAnimation() {
    animIndex++;
    if (animIndex > 60 && !quackSom) {
        playSound(quackQuack);
        quackSom = true;
    }
    if (animIndex > 80) {
        animIndex = 0;
        animName = "Armature_Fundo_";
        folderName = "Fundo";
        startSound();
    }
    if (animIndex > 64 && folderName === "Fundo") {
        animIndex = 0;
    }
    getCanvas().drawImage(getAsset(`${animName}${animIndex}`), 0, 0);
}
