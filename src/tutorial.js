//Script que vai ser responsavel pela pagina do tutorial
import { resizeCanvas } from "./app.js";
import { startCutscene } from "./cutscene.js";
import { changeSairState, sairMenu } from "./menu.js";
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
    document.getElementById("tutorial_anterior").style.display = "none";
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
    changeSairState(false);
    startCutscene();
}

function next() {
    if (tutorialState < tutorialAmt - 1) tutorialState++;
    if (tutorialState === tutorialAmt - 1) {
        document.getElementById("tutorial_prox").style.display = "none";
    }
    document.getElementById("tutorial_anterior").style.display = "block";
    document.getElementById(
        "tutorial_img"
    ).src = `./assets/tutorial/tutorial_${tutorialState}.png`;
}
function anterior() {
    if (tutorialState > 0) tutorialState--;
    if (tutorialState === 0) {
        document.getElementById("tutorial_anterior").style.display = "none";
    }
    document.getElementById("tutorial_prox").style.display = "block";
    document.getElementById(
        "tutorial_img"
    ).src = `./assets/tutorial/tutorial_${tutorialState}.png`;
}
