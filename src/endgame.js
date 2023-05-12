//script responsavel pela tema de fim de jogo

import { winner } from "./app.js";
import { cameraReset } from "./camera.js";
import { resetPlataformas } from "./mapa.js";
import { changeSairState, restart } from "./menu.js";
import { Bob, Botanico } from "./player.js";
import { resetPowerups } from "./powerup.js";
import { changeState, states } from "./state.js";

export default function startEndgame() {
    document.getElementById("fim_de_jogo").style.display = "block";
    document.getElementById("black_screen").style.display = "block";
    changeState(states.finished, "Why");
    cameraReset();

    //mudando os textos do menu
    document.getElementById("bob_score").innerHTML = `Bob: ${Bob.score}`;
    document.getElementById(
        "botanico_score"
    ).innerHTML = `Botanico: ${Botanico.score}`;
    document.getElementById("winner").innerHTML = `Vencedor: ${winner}`;
}

function restartEndgame() {
    document.getElementById("black_screen").style.display = "none";
    document.getElementById("fim_de_jogo").style.display = "none";
    resetPowerups();
    resetPlataformas();
    changeState(states.playing);
}

export function startEndgameController() {
    document
        .getElementById("fim_de_jogo_sair")
        .addEventListener("click", () => {
            document.getElementById("fim_de_jogo").style.display = "none";
            document.getElementById("black_screen").style.display = "none";
            restart();
        });
    document
        .getElementById("fim_de_jogo_restart")
        .addEventListener("click", () => {
            restartEndgame();
        });
}
