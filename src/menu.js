import { getCanvas } from "./app.js";
import startCreditos, { closeCreditos } from "./creditos.js";
import { startCutscene } from "./cutscene.js";
import { getAsset, menuClick, quackQuack } from "./loader.js";
import { changeState, states } from "./state.js";
import startTutorialApp from "./tutorial.js";
import { closeTutorial } from "./tutorial.js";

export function startButtons() {
    document.getElementById("voltar").addEventListener("click", () => {
        menuClick.play();
        restart();
    });
    document.getElementById("start").addEventListener("click", () => {
        menuClick.play();
        playButton();
    });
    document.getElementById("instrucoes").addEventListener("click", () => {
        menuClick.play();
        tutorialButton();
    });
    document.getElementById("creditos").addEventListener("click", () => {
        menuClick.play();
        creditosButton();
    });
}
export function changeSairState(state) {
    if (state) {
        document.getElementById("voltar").style.display = "block";
        document.getElementById("menu").style.display = "none";
    } else {
        document.getElementById("voltar").style.display = "none";
    }
}

export function restart() {
    document.getElementById("menu").style.display = "block";
    changeSairState(false);
    closeTutorial();
    closeCreditos();
    changeState(states.paused);
}

function playButton() {
    changeSairState(true);
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
        quackQuack.play();
        quackSom = true;
    }
    if (animIndex > 80) {
        animIndex = 0;
        animName = "Armature_Fundo_";
        folderName = "Fundo";
    }
    if (animIndex > 64 && folderName === "Fundo") {
        animIndex = 0;
    }
    console.log("drawing");
    getCanvas().drawImage(getAsset(`${animName}${animIndex}`), 0, 0);
}
