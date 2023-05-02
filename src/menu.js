import { getCanvas } from "./app.js";
import { changeState, states } from "./state.js";
import startTutorialApp from "./tutorial.js";
import { closeTutorial } from "./tutorial.js";

export function startButtons() {
    document.getElementById("voltar").addEventListener("click", () => {
        restart();
    });
    document.getElementById("start").addEventListener("click", () => {
        playButton();
    });
    document.getElementById("instrucoes").addEventListener("click", () => {
        tutorialButton();
    });
    document.getElementById("creditos").addEventListener("click", () => {
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
    changeState(states.idle);
}

function playButton() {
    changeSairState(true);
    //changeState(states.playing);
    startTutorialApp();
}
function tutorialButton() {
    changeSairState(true);
    startTutorialApp();
}
function creditosButton() {
    changeSairState(true);
}

//Animacao do menu
let animIndex = 0;
let animName = "Armature_Entrando_";
let animSprite;

//Inicializando o menu pra ter o sprite
export function startMenuAnimation() {
    animSprite = new Image();
    animSprite.src = `./assets/menu/Entrando/${animName}${animIndex}.png`;
    getCanvas().drawImage(animSprite, 0, 0);
}
//Mudando o sprite a cada frame
export function menuAnimation() {
    animIndex++;
    if (animIndex > 80) {
        animIndex = 0;
    }
    console.log("animating");
    animSprite.src = `./assets/menu/Entrando/${animName}${animIndex}.png`;
    getCanvas().drawImage(animSprite, 0, 0);
}
