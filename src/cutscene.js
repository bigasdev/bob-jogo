import { changeCanvasColor, resizeCanvas } from "./app.js";
import { quackQuack } from "./loader.js";
import { changeState, states } from "./state.js";

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
    if (cutsceneValue >= cutsceneAmt) {
        closeCutscene();
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
        quackQuack.play();
    }
    document.getElementById(cutsceneImgs[cutsceneValue]).style.display =
        "block";
    cutsceneValue++;
    setTimeout(cutscenePlayer, cutsceneTime);
}
