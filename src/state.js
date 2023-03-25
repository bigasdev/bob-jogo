import { clearCanvas } from "./app.js";

export const states = {
    idle : 0,
    playing : 1,
    finished : 2,
    paused : 3
}

var currentState = states.idle;

export function changeState(state, message){
    if(currentState === state)return;

    if(state === states.idle){
        clearCanvas();
    }

    currentState = state;
    console.log(message);
}

export function getState(){
    return currentState;
}