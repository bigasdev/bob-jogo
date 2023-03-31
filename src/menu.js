import { changeState, states } from "./state.js";
import startTutorialApp from "./tutorial.js";
import { closeTutorial } from "./tutorial.js";

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
export function changeSairState(state){
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
    closeTutorial();
    changeState(states.idle);
}

function playButton(){
    changeSairState(true);
    //changeState(states.playing);
    startTutorialApp();
}
function tutorialButton(){
    changeSairState(true);
    startTutorialApp();
}
function creditosButton(){
    changeSairState(true);
}