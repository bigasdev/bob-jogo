//Script que vai controlar o pause do game

import { restart } from "./menu.js";
import { changeState, getState, states } from "./state.js";

//Funcao pra inicializar o pause
export function startPause() {
    document.getElementById("pause").addEventListener("click", () => {
        pause();
    });
    document.getElementById("voltar_jogo").addEventListener("click", () => {
        unpause();
    });
    document.getElementById("pause_sair").addEventListener("click", () => {
        enablePause(false);
        unpause();
        restart();
    });
}

//Funcao pra habilitar/desabilitar o botao de pause
export function enablePause(state) {
    var display = state ? "block" : "none";
    document.getElementById("pause_menu").style.display = display;
}

//Funcao principal do pause
function pause() {
    if (getState() === states.paused) return;
    changeState(states.paused, "Jogo pausado");

    document.getElementById("black_screen").style.display = "block";
    document.getElementById("menu_pause").style.display = "block";
}
//Funcao pra despausar
function unpause() {
    if (getState() !== states.paused) return;
    changeState(states.playing);
    document.getElementById("black_screen").style.display = "none";
    document.getElementById("menu_pause").style.display = "none";
}
