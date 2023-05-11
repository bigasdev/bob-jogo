//Script que vai ser utilizado para controlar a camera do jogo
//(ela vai seguir o jogador que esta mais na frente)

import { getState, states } from "./state.js";

//Funcao pra controlar um minimo e maximo pro valor
function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}

//Variavel que vai ser usada pra controlar o tamanho do "mundo"
const worldBounds = { minX: 0, maxX: 3960, minY: 0, maxY: 540 };
//Variavel que vai ser usado pra controlar X da camera
export var camX = 0;

//Funcao que vai ser usada no update pra controlar a camera
export function updateCamera(canvas, ctx, bobPos, botanicoPos) {
    if (getState() !== states.playing) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    //Vamos detectar o player que ta mais na frente
    if (bobPos > botanicoPos) {
        //Vamos usar o bob como target
        console.log("bob target");
        camX = clamp(
            bobPos - canvas.width / 2,
            worldBounds.minX,
            worldBounds.maxX - canvas.width
        );
    } else {
        //Vamos usar o botanico como target
        camX = clamp(
            botanicoPos - canvas.width / 2,
            worldBounds.minX,
            worldBounds.maxX - canvas.width
        );
    }
    console.log(camX);
    ctx.translate(-camX, 0);
}

//Funcao que vai ser chamada no fim de jogo/restart
export function cameraReset() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    camX = 0;
}
