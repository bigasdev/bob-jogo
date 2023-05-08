//Esse script vai ser usado pra criar os powerups

import { getCanvas } from "./app.js";
import { getState, states } from "./state.js";

let powerups = [
    //trevo
    {
        sprite: "./assets/powerups/abelha.png",
        image: new Image(),
        x: 0,
        y: 0,
    },
    //abelha
    {
        sprite: "./assets/powerups/abelha.png",
        image: new Image(),
        x: 0,
        y: 0,
    },
    //mel
    {
        sprite: "./assets/powerups/abelha.png",
        image: new Image(),
        x: 0,
        y: 0,
    },
    //tronco
    {
        sprite: "./assets/powerups/abelha.png",
        image: new Image(),
        x: 0,
        y: 0,
    },
];

let gamePowerups = [];
//numero de powerups por game
let amountOfPowerups = 15;

export function loadPowerups() {
    console.log(powerups[0]);
    for (let powerup in powerups) {
        powerups[powerup].image.src = powerups[powerup].sprite;
    }
    spawnPowerups();
}

//funcao pra spawnar os powerups aleatoriamente
export function spawnPowerups() {
    //primeiro spawn vai ser em 200x
    var spawnPoint = 200;
    //depois vai aumentar 500 x em cada powerup
    var pointIncreaseAmount = 500;
    for (let index = 0; index < amountOfPowerups; index++) {
        let powerup = Math.floor(Math.random() * 4);
        let x = spawnPoint + pointIncreaseAmount * index;
        let y = 385;
        console.log("Powerup : " + powerups[powerup]);

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
        console.log(gamePowerups[i].powerup);
        getCanvas().drawImage(
            gamePowerups[i].powerup.image,
            gamePowerups[i].x,
            gamePowerups[i].y
        );
    }
}
