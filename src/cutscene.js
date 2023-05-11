import { changeCanvasColor, resizeCanvas } from "./app.js";
import { playSound, quackQuack } from "./som.js";
import { sairMenu } from "./menu.js";
import { changeState, getState, states } from "./state.js";

export function startCutscene() {
    document.getElementById("cutscene").style.display = "inline-block";
    setTimeout(cutscenePlayer, cutsceneTime);
}
export function closeCutscene() {
    document.getElementById("cutscene").style.display = "none";
}

//Numero atual da cutscene
var cutsceneValue = 0;
//Tempo entre cada imagem
var cutsceneTime = 3000;
//Tempo atual
var cutsceneTimeValue = 0;
//Numero de imagens
var cutsceneAmt = 6;

//Array com as imagens
var cutsceneImgs = [
    "primeiro",
    "segundo",
    "quinto",
    "sexto",
    "terceiro",
    "quarto",
];

export function cutscenePlayer() {
    if (getState() != states.cutscene) return;
    if (cutsceneValue >= cutsceneAmt) {
        closeCutscene();
        sairMenu();
        changeState(states.playing);
        changeCanvasColor("#8ff6ff");
        resizeCanvas(1280, 700);
        return;
    }
    if (cutsceneValue == 1 || cutsceneValue == 2) {
        cutsceneTime = 200;
    } else {
        cutsceneTime = 3000;
    }
    if (cutsceneValue == 3) {
        playSound(quackQuack);
    }
    document.getElementById(cutsceneImgs[cutsceneValue]).style.display =
        "block";
    cutsceneValue++;
    setTimeout(cutscenePlayer, cutsceneTime);
}
