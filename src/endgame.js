import { changeSairState, restart } from "./menu.js";
import { Bob, Botanico } from "./player.js";
import { changeState, states } from "./state.js";

export default function startEndgame(){
    document.getElementById('fim_de_jogo').style.display = 'block';
    changeState(states.finished);
    changeSairState(false);
}

function restartEndgame(){
    document.getElementById('fim_de_jogo').style.display = 'none';
    changeSairState(states.playing);
}

export function startEndgameController(){
    document.getElementById('fim_de_jogo_sair').addEventListener('click',()=>{
        document.getElementById('fim_de_jogo').style.display = 'none';
        restart();
    })
    document.getElementById('fim_de_jogo_restart').addEventListener('click',()=>{
        restartEndgame();
    })
}

