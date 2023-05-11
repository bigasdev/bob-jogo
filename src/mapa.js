import { getCanvas } from "./app.js";
import { camX } from "./camera.js";
import { getState, states } from "./state.js";

//script utilizado para a criacao do mapa
class Parede {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = "./assets/mapa/Parede.png";

        this.image = new Image();
    }
    initialize() {
        this.image.src = this.sprite;
    }
}

//classe da grama
class Grama {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = "./assets/mapa/Grama-grande.png";

        this.image = new Image();
    }
    initialize() {
        this.image.src = this.sprite;
    }
}

//variaveis pro mapa
let paredes = [];
let gramas = [];
let arbusto = {
    sprite: "./assets/mapa/Arbusto.png",
    x: 0,
    y: 380,
    image: new Image(),
};
let flor = {
    sprite: "./assets/mapa/Flor.png",
    x: 3890,
    y: 440,
    image: new Image(),
};

//funcao para inicializar o mapa com os assets (parede, nuvem, grama)
export function loadMapa() {
    for (let i = 0; i < 30; i++) {
        paredes.push(new Parede(i * 180, 295));
        paredes[i].initialize();
    }
    for (let i = 0; i < 15; i++) {
        gramas.push(new Grama(i * 540, 560));
        gramas[i].initialize();
    }
    arbusto.image.src = arbusto.sprite;
    flor.image.src = flor.sprite;
    loadCeu();
}
//funcao que vai fazer uma animacao pra flor
export function updateFlor() {
    if (getState() !== states.playing && getState() !== states.finished) return;
    if (flor.y > 370) {
        flor.y -= 0.5;
    } else if (flor.y < 370) {
        flor.y += 0.5;
    }
}

//funcao para desenhar o mapa
export function drawMapa() {
    if (getState() !== states.playing && getState() !== states.finished) return;
    for (let i = 0; i < paredes.length; i++) {
        console.log("mapa draw: $d", paredes[i].x);
        getCanvas().drawImage(paredes[i].image, paredes[i].x, paredes[i].y);
    }
    updateFlor();
    getCanvas().drawImage(arbusto.image, arbusto.x, arbusto.y);
    getCanvas().drawImage(flor.image, flor.x, flor.y);
    drawCeu();
}
//funcao pra desenhar as coisas que ficam na frente dos jogadores
export function drawMapaFront() {
    if (getState() !== states.playing && getState() !== states.finished) return;
    for (let i = 0; i < gramas.length; i++) {
        console.log("mapa draw: $d", gramas[i].x);
        getCanvas().drawImage(gramas[i].image, gramas[i].x, gramas[i].y);
    }
}
let ceu = {
    nuvens_intermediarias: [
        {
            sprite: "./assets/mapa/1_Intermediaria.png",
            x: 400,
            y: 100,
            image: new Image(),
        },
        {
            sprite: "./assets/mapa/2_Intermediaria.png",
            x: 100,
            y: 100,
            image: new Image(),
        },
        {
            sprite: "./assets/mapa/3_Intermediaria.png",
            x: 200,
            y: 100,
            image: new Image(),
        },
    ],
    nuvens_grande: [
        {
            sprite: "./assets/mapa/1_Nuvem-Grande.png",
            x: 0,
            y: 300,
            image: new Image(),
        },
        {
            sprite: "./assets/mapa/2_Nuvem-Grande.png",
            x: 0,
            y: -700,
            image: new Image(),
        },
        {
            sprite: "./assets/mapa/3_Nuvem-Grande.png",
            x: 0,
            y: 300,
            image: new Image(),
        },
    ],
    nuvens_pequena: [
        {
            sprite: "./assets/mapa/1_Nuvenzinha.png",
            x: 0,
            y: 200,
            image: new Image(),
        },
        {
            sprite: "./assets/mapa/2_Nuvenzinha.png",
            x: 0,
            y: 650,
            image: new Image(),
        },
        {
            sprite: "./assets/mapa/3_Nuvenzinha.png",
            x: 0,
            y: 200,
            image: new Image(),
        },
    ],
};
//funcao para inicializar o ceu com os assets (nuvens)
export function loadCeu() {
    for (let i = 0; i < 3; i++) {
        ceu.nuvens_intermediarias[i].image.src =
            ceu.nuvens_intermediarias[i].sprite;
        ceu.nuvens_grande[i].image.src = ceu.nuvens_grande[i].sprite;
        ceu.nuvens_pequena[i].image.src = ceu.nuvens_pequena[i].sprite;
    }
}
//funcao pra desenhar o ceu com parallax com a camera
export function drawCeu() {
    if (getState() !== states.playing && getState() !== states.finished) return;
    let x = camX;
    let nuvens_intermediarias = ceu.nuvens_intermediarias;
    let nuvens_grande = ceu.nuvens_grande;
    let nuvens_pequena = ceu.nuvens_pequena;
    let canvas = getCanvas();
    for (let i = 0; i < 3; i++) {
        canvas.drawImage(
            nuvens_intermediarias[i].image,
            nuvens_intermediarias[i].x - x * 0.5,
            nuvens_intermediarias[i].y
        );
    }
}
