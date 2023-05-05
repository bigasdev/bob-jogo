import { getCanvas } from "./app.js";
import { getState, states } from "./state.js";

//script utilizado para a criacao do mapa

class Parede{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.sprite = "./assets/mapa/Parede.png";

        this.image = new Image();
    }
    initialize(){
        this.image.src = this.sprite;
    }
}

//classe da grama
class Grama{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.sprite = "./assets/mapa/Grama-grande.png";

        this.image = new Image();
    }
    initialize(){
        this.image.src = this.sprite;
    }
}



//variaveis pro mapa
let paredes = [];
let gramas = [];

//funcao para inicializar o mapa com os assets (parede, nuvem, grama)
export function loadMapa(){
    for(let i = 0; i < 30; i++){
        paredes.push(new Parede(i*180, 215));
        paredes[i].initialize();
    }
    for(let i = 0; i < 30; i++){
        gramas.push(new Grama(i*180, 420));
        gramas[i].initialize();
    }
}

//funcao para desenhar o mapa
export function drawMapa(){
    if(getState() !== states.playing)return;
    for(let i = 0; i < paredes.length; i++){
        console.log("mapa draw: $d", paredes[i].x);
        getCanvas().drawImage(paredes[i].image, paredes[i].x, paredes[i].y);
    }
}
//funcao pra desenhar as coisas que ficam na frente dos jogadores
export function drawMapaFront(){
    for(let i = 0; i < gramas.length; i++){
        console.log("mapa draw: $d", gramas[i].x);
        getCanvas().drawImage(gramas[i].image, gramas[i].x, gramas[i].y);
    }
    
}