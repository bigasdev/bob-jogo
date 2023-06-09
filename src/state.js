//Script usado para controlar os states do game, util pra pausar e coisas do genero

import { clearCanvas } from "./app.js";

export const states = {
    idle: 0,
    cutscene: 1,
    playing: 2,
    finished: 3,
    paused: 4,
};

var currentState = states.idle;

export function changeState(state, message) {
    console.log("changing state to : " + state);
    if (currentState === state) return;

    if (state === states.idle) {
        clearCanvas();
    }

    currentState = state;
    console.log(message);
}

export function getState() {
    return currentState;
}
