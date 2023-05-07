//Esse script vai ser usado pra criar os powerups

import { getCanvas } from "./app.js";
import { getState, states } from "./state.js";

let powerups = {
    //trevo
    trevo: {
        sprite: "./assets/powerups/orca.png",
        image: new Image(),
        x: 0,
        y: 0,
    },
    //abelha
    abelha: {
        sprite: "./assets/powerups/orca.png",
        image: new Image(),
        x: 0,
        y: 0,
    },
    //mel
    mel: {
        sprite: "./assets/powerups/orca.png",
        image: new Image(),
        x: 0,
        y: 0,
    },
    //tronco
    tronco: {
        sprite: "./assets/powerups/orca.png",
        image: new Image(),
        x: 0,
        y: 0,
    },
};

let gamePowerups = [];
//numero de powerups por game
let amountOfPowerups = 15;

export function loadPowerups() {
    for (let powerup in powerups) {
        powerups[powerup].image.src = powerups[powerup].sprite;
    }
    spawnPowerups();
}

//funcao pra spawnar os powerups aleatoriamente
export function spawnPowerups() {
    for (let index = 0; index < amountOfPowerups; index++) {
        let powerup = Math.floor(Math.random() * 4);
        let x = Math.floor(Math.random() * 3960);
        let y = 450;
        console.log("Powerup : " + powerups.trevo);

        gamePowerups.push({
            powerup: powerups[powerup],
            x: x,
            y: y,
        });
    }
}

//funcao pra desenhar os powerups
export function drawPowerups() {
    if (getState() !== states.playing) return;
    for (let i = 0; i < gamePowerups.length; i++) {
        console.log(gamePowerups[i]);
        getCanvas().drawImage(
            gamePowerups[i].image,
            gamePowerups[i].x,
            gamePowerups[i].y
        );
    }
}
