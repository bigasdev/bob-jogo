//Script que vai ser responsavel pela pagina do tutorial
import { changeState, states } from "./state.js";

export default function startTutorialApp() {
    document.getElementById("tutorial").style.display = "inline-block";
}
export function closeTutorial() {
    document.getElementById("tutorial").style.display = "none";
}

//Numero atual do tutorial
var tutorialImgName = "./assets/tutorial/tutorial_";
var tutorialState = 0;
var tutorialAmt = 3;

export function startTutorial() {
    document.getElementById("tutorial_prox").addEventListener("click", () => {
        next();
    });
    document
        .getElementById("tutorial_anterior")
        .addEventListener("click", () => {
            anterior();
        });
    document.getElementById("tutorial_pular").addEventListener("click", () => {
        pular();
    });
}

function pular() {
    closeTutorial();
    changeState(states.playing);
}

function next() {
    if (tutorialState < tutorialAmt - 1) tutorialState++;
    document.getElementById(
        "tutorial_img"
    ).src = `./assets/tutorial/tutorial_${tutorialState}.png`;
}
function anterior() {
    if (tutorialState > 0) tutorialState--;
    document.getElementById(
        "tutorial_img"
    ).src = `./assets/tutorial/tutorial_${tutorialState}.png`;
}
