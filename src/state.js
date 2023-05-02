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
