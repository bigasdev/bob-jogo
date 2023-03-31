import { changeState, states } from "./state.js";

export function startButtons(){
    document.getElementById('voltar').addEventListener('click', ()=>{
        restart();
    })
    document.getElementById('start').addEventListener('click',()=>{
        playButton();   
    })
    document.getElementById('instrucoes').addEventListener('click',()=>{
        tutorialButton();
    })
    document.getElementById('creditos').addEventListener('click', () =>{
        creditosButton();
    })
}
function changeSairState(state){
    if(state){
        document.getElementById('voltar').style.display = 'block';
        document.getElementById('menu').style.display = 'none';
    }else{
        document.getElementById('voltar').style.display = 'none';
    }
}

export function restart(){
    document.getElementById('menu').style.display = 'block';
    changeSairState(false);
    changeState(states.idle);
}

function playButton(){
    changeSairState(true);
    changeState(states.playing);
}
function tutorialButton(){
    changeSairState(true);
}
function creditosButton(){
    changeSairState(true);
    window.close();
}