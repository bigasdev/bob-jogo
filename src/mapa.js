import { getCanvas } from "./app.js";
import { camX } from "./camera.js";
import {
    addPowerup,
    mel,
    mel_melado,
    tronco,
    tronco_grande,
} from "./powerup.js";
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
    loadVasos();
    loadPlataformas();
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
    if (
        getState() !== states.playing &&
        getState() !== states.finished &&
        getState() !== states.paused
    )
        return;
    for (let i = 0; i < paredes.length; i++) {
        getCanvas().drawImage(paredes[i].image, paredes[i].x, paredes[i].y);
    }
    updateFlor();
    getCanvas().drawImage(arbusto.image, arbusto.x, arbusto.y);
    getCanvas().drawImage(flor.image, flor.x, flor.y);
    drawCeu();
    drawVasos();
    drawPlataformas();
}
//funcao pra desenhar as coisas que ficam na frente dos jogadores
export function drawMapaFront() {
    if (
        getState() !== states.playing &&
        getState() !== states.finished &&
        getState() !== states.paused
    )
        return;
    for (let i = 0; i < gramas.length; i++) {
        getCanvas().drawImage(gramas[i].image, gramas[i].x, gramas[i].y);
    }
}
//Classe do ceu pois vamos precisar de muitas nuvens
class Ceu {
    constructor(x) {
        this.nuvens_intermediarias = [
            {
                sprite: "./assets/mapa/1_Intermediaria.png",
                x: -1700 + x,
                y: 100,
                image: new Image(),
            },
            {
                sprite: "./assets/mapa/2_Intermediaria.png",
                x: 0 + x,
                y: 100,
                image: new Image(),
            },
            {
                sprite: "./assets/mapa/3_Intermediaria.png",
                x: 1700 + x,
                y: 100,
                image: new Image(),
            },
        ];
        this.nuvens_grande = [
            {
                sprite: "./assets/mapa/1_Nuvem-Grande.png",
                x: -1800 + x,
                y: -50,
                image: new Image(),
            },
            {
                sprite: "./assets/mapa/2_Nuvem-Grande.png",
                x: 0 + x,
                y: -50,
                image: new Image(),
            },
            {
                sprite: "./assets/mapa/3_Nuvem-Grande.png",
                x: 1800 + x,
                y: -50,
                image: new Image(),
            },
        ];
        this.nuvens_pequena = [
            {
                sprite: "./assets/mapa/1_Nuvenzinha.png",
                x: -1400 + x,
                y: 225,
                image: new Image(),
            },
            {
                sprite: "./assets/mapa/2_Nuvenzinha.png",
                x: 0 + x,
                y: 225,
                image: new Image(),
            },
            {
                sprite: "./assets/mapa/3_Nuvenzinha.png",
                x: 1400 + x,
                y: 225,
                image: new Image(),
            },
        ];
    }
}

//variaveis pra criar o ceu
let ceuCompleto = [];
let ceuAmount = 15;

//funcao para inicializar o ceu com os assets (nuvens)
export function loadCeu() {
    for (let i = 0; i < ceuAmount; i++) {
        ceuCompleto.push(new Ceu(i * 500));
        for (let j = 0; j < 3; j++) {
            ceuCompleto[i].nuvens_intermediarias[j].image.src =
                ceuCompleto[i].nuvens_intermediarias[j].sprite;
            ceuCompleto[i].nuvens_grande[j].image.src =
                ceuCompleto[i].nuvens_grande[j].sprite;
            ceuCompleto[i].nuvens_pequena[j].image.src =
                ceuCompleto[i].nuvens_pequena[j].sprite;
        }
    }
}
//funcao pra desenhar o ceu com parallax com a camera
export function drawCeu() {
    if (
        getState() !== states.playing &&
        getState() !== states.finished &&
        getState() !== states.paused
    )
        return;
    let x = camX;
    let canvas = getCanvas();
    for (let i = 0; i < ceuAmount; i++) {
        for (let j = 0; j < 3; j++) {
            canvas.drawImage(
                ceuCompleto[i].nuvens_intermediarias[j].image,
                ceuCompleto[i].nuvens_intermediarias[j].x - x * 0.5,
                ceuCompleto[i].nuvens_intermediarias[j].y
            );
            canvas.drawImage(
                ceuCompleto[i].nuvens_grande[j].image,
                ceuCompleto[i].nuvens_grande[j].x - x * 0.15,
                ceuCompleto[i].nuvens_grande[j].y
            );
            canvas.drawImage(
                ceuCompleto[i].nuvens_pequena[j].image,
                ceuCompleto[i].nuvens_pequena[j].x - x * 0.75,
                ceuCompleto[i].nuvens_pequena[j].y
            );
        }
    }
}

//parte do script que vai dar load e desenhar as plataformas
class Plataforma {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.Folha = new Folha(this.x - 20, this.y);
        this.FolhaDireita = new FolhaDireita(this.x + 130, this.y);
    }
    initialize() {
        this.image.src = plataforma.sprite;
        this.Folha.initialize();
        this.FolhaDireita.initialize();
    }
    draw() {
        getCanvas().drawImage(this.image, this.x, this.y);
    }
}
class Folha {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = florEsquerda.sprite;
    }
    initialize() {
        this.image.src = florEsquerda.sprite;
    }
    draw() {
        getCanvas().drawImage(this.image, this.x, this.y);
    }
}
class FolhaDireita {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = florDireita.sprite;
    }
    initialize() {
        this.image.src = florDireita.sprite;
    }
    draw() {
        getCanvas().drawImage(this.image, this.x, this.y);
    }
}
let plataforma = {
    sprite: "./assets/mapa/Plataforma.png",
    x: 0,
    y: 0,
    image: new Image(),
};
let florEsquerda = {
    sprite: "./assets/mapa/Cacho-completo.png",
    x: 0,
    y: 0,
    image: new Image(),
};
let florDireita = {
    sprite: "./assets/mapa/Cacho-reverso.png",
    x: 0,
    y: 0,
    image: new Image(),
};
let plataformas = [];

//Posicoes
let xIncrease = 750;
let yPositions = {
    0: 400,
    1: 300,
    2: 350,
};

//Funcao pra resetar
export function resetPlataformas() {
    plataformas = [];
    loadPlataformas();
}

function loadPlataformas() {
    plataforma.image.src = plataforma.sprite;
    florEsquerda.image.src = florEsquerda.sprite;
    florDireita.image.src = florDireita.sprite;
    for (let i = 1; i < 10; i++) {
        let x = i * xIncrease;
        let y = yPositions[Math.floor(Math.random() * 3)];
        //Aqui vamos adicionar os troncos perto de toda platforma
        {
            var _tronco;
            if (y === 300) {
                _tronco = tronco_grande;
            } else {
                _tronco = tronco;
            }
            addPowerup(_tronco, x - 100, 490);
        }
        let plataforma = new Plataforma(x, y);
        plataforma.initialize();
        plataformas.push({
            plataforma: plataforma,
            florEsquerda: plataforma.Folha,
            florDireita: plataforma.FolhaDireita,
        });
        //Check aleatorio pra ver se a plataforma vai ter mel ou nao (40% de chance)
        if (Math.random() < 0.4) {
            //Check aleatorio de 50% pra ver qual tipo de mel (apenas grafico)
            addPowerup(mel_melado, x, y - 50);
        }
    }
}

function drawPlataformas() {
    if (
        getState() !== states.playing &&
        getState() !== states.finished &&
        getState() !== states.paused
    )
        return;
    for (let i = 0; i < plataformas.length; i++) {
        plataformas[i].plataforma.draw();
    }
}
export function drawPlataformasPlantas() {
    if (
        getState() !== states.playing &&
        getState() !== states.finished &&
        getState() !== states.paused
    )
        return;
    for (let i = 0; i < plataformas.length; i++) {
        plataformas[i].florEsquerda.draw();
        plataformas[i].florDireita.draw();
    }
}

//Spawn dos vasos no mapa aleatoriamente
let vaso = {
    sprite: "./assets/mapa/Vaso.png",
    x: 0,
    y: 0,
    image: new Image(),
};

class Vaso {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = new Image();
    }
    initialize() {
        this.image.src = vaso.sprite;
    }
    draw() {
        getCanvas().drawImage(this.image, this.x, this.y);
    }
}

let vasos = [];
//Funcao pra dar load nos vasos
function loadVasos() {
    vaso.image.src = vaso.sprite;
    for (let i = 1; i < 10; i++) {
        let x = i * 850;
        let y = 480;
        let vaso = new Vaso(x, y);
        vaso.initialize();
        vasos.push({
            vaso: vaso,
        });
    }
}
//Funcao pra desenhar os vasos
function drawVasos() {
    if (
        getState() !== states.playing &&
        getState() !== states.finished &&
        getState() !== states.paused
    )
        return;
    for (let i = 0; i < vasos.length; i++) {
        vasos[i].vaso.draw();
    }
}
