//Esse script vai ser usado pra criar os powerups

import { getCanvas } from "./app.js";
import { playSound, slowPickup, trevoPickup } from "./som.js";
import { getState, states } from "./state.js";

let powerups = [
    //trevo
    {
        sprite: "./assets/powerups/trevo.png",
        image: new Image(),
        x: 0,
        y: 0,
        //bool pra remover o powerup ou nao dps de colidir
        remove: true,
        sizeX: 50,
        draw: true,
        //funcao de quando passar pelo trevo
        powerup: function (player) {
            playSound(trevoPickup);
            //no caso do trevo vamos aumentar a velocidade do jogador por 3 segundos
            player.speed += 2;
            setTimeout(() => {
                player.speed -= 2;
            }, 3000);
        },
    },
    //abelha
    {
        sprite: "./assets/powerups/abelha.png",
        image: new Image(),
        x: 0,
        y: 0,
        remove: true,
        sizeX: 50,
        draw: true,
        powerup: function (player) {
            playSound(slowPickup);
            //no caso da abelha vamos utilizar a funcao throwAbelha do player
            player.throwAbelha();
        },
    },
    //tronco
    {
        sprite: "./assets/powerups/tronco.png",
        image: new Image(),
        x: 0,
        y: 0,
        offset_Y: -45,
        offset_X: -60,
        remove: false,
        sizeX: 50,
        draw: true,
        powerup: function () {
            onPowerup("tronco");
        },
    },
    //tronco grande
    {
        sprite: "./assets/powerups/troncozao.png",
        image: new Image(),
        x: 0,
        y: 0,
        offset_Y: -30,
        offset_X: -60,
        remove: false,
        sizeX: 50,
        draw: true,
        powerup: function () {
            onPowerup("tronco_grande");
        },
    },
    //mel
    {
        sprite: "./assets/powerups/mel.png",
        image: new Image(),
        x: 0,
        y: 0,
        remove: true,
        sizeX: 50,
        draw: true,
        //No caso do mel a gente vai diminuir bastante a velocidade do jogador
        powerup: function (player) {
            playSound(slowPickup);
            player.speed -= 2;
            setTimeout(() => {
                player.speed += 2;
            }, 5000);
        },
    },
    //variacao do mel
    {
        sprite: "./assets/powerups/mel_melado.png",
        image: new Image(),
        x: 0,
        y: 0,
        remove: true,
        sizeX: 50,
        draw: true,
        //No caso do mel a gente vai diminuir bastante a velocidade do jogador
        powerup: function (player) {
            playSound(slowPickup);
            player.speed -= 2;
            setTimeout(() => {
                player.speed += 2;
            }, 5000);
        },
    },
];

//export para os objetos que terao colisoes/usos especificos
export let tronco = powerups[2];
export let tronco_grande = powerups[3];
export let mel = powerups[4];
export let mel_melado = powerups[5];

let gamePowerups = [];
//numero de powerups por game
let amountOfPowerups = 15;

//funcao base que vai ser usada nos powerups q tem n funcao especifica
function onPowerup(name) {
    console.log("powerup collide : " + name);
}

//aqui a gente carrega a imagem de cada powerup
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
    var pointIncreaseAmount = 900;
    for (let index = 0; index < amountOfPowerups; index++) {
        //vamos usar apenas o mel e o trevo pros powerups aleatorios
        let powerup = Math.floor(Math.random() * 2);
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
//funcao pra adicionar um powerup especifico
export function addPowerup(powerup, x, y) {
    gamePowerups.push({
        powerup: powerup,
        x: x,
        y: y,
    });
}

//funcao pra checar as collisions
export function checkPowerupCollision(player) {
    if (getState() !== states.playing) return;
    for (let i = 0; i < gamePowerups.length; i++) {
        if (!gamePowerups[i].powerup.remove) {
            //Colisao vertical
            if (
                player.position.x <
                    gamePowerups[i].x + gamePowerups[i].powerup.sizeX &&
                player.position.x +
                    player.size.w +
                    gamePowerups[i].powerup.offset_X >
                    gamePowerups[i].x &&
                player.position.y < gamePowerups[i].y &&
                player.position.y +
                    player.size.h +
                    gamePowerups[i].powerup.offset_Y >
                    gamePowerups[i].y
            ) {
                player.grounded = true;
                player.canMove = true;
                return;
            }
            if (player.walkingRight) {
                if (
                    player.position.x + 10 < gamePowerups[i].x + 50 &&
                    player.position.x + player.size.w > gamePowerups[i].x &&
                    player.position.y < gamePowerups[i].y + 5 &&
                    player.position.y + player.size.h > gamePowerups[i].y
                ) {
                    player.canMove = false;
                    return;
                }
            }
            if (player.walkingLeft) {
                if (
                    player.position.x - 10 < gamePowerups[i].x + 50 &&
                    player.position.x + player.size.w > gamePowerups[i].x &&
                    player.position.y < gamePowerups[i].y + 5 &&
                    player.position.y + player.size.h > gamePowerups[i].y
                ) {
                    player.canMove = true;
                    return;
                }
            }
        }
        player.canMove = true;
        player.grounded = false;
        if (
            player.position.x < gamePowerups[i].x + 50 &&
            player.position.x + player.size.w > gamePowerups[i].x &&
            player.position.y < gamePowerups[i].y + 51 &&
            player.position.y + player.size.h > gamePowerups[i].y
        ) {
            console.log(gamePowerups[i]);
            gamePowerups[i].powerup.powerup(player);
            if (gamePowerups[i].powerup.remove) gamePowerups.splice(i, 1);
        }
    }
}

//funcao pra desenhar os powerups
export function drawPowerups() {
    if (getState() !== states.playing && getState() !== states.paused) return;
    for (let i = 0; i < gamePowerups.length; i++) {
        if (gamePowerups[i].powerup.draw)
            getCanvas().drawImage(
                gamePowerups[i].powerup.image,
                gamePowerups[i].x,
                gamePowerups[i].y
            );
    }
}

//funcao usada pra resetar os powerups
export function resetPowerups() {
    gamePowerups = [];
    spawnPowerups();
}
