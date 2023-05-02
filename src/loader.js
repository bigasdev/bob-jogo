import { changeState, states } from "./state.js";

//Mapa que vai guardar a imagem de todos os assets
var assets = new Map();

//Funcao pra pegar o Image de um asset
export function getAsset(name) {
    var a = assets.get(name);
    if (a) {
        return a;
    } else {
        console.log(`Asset ${name} nao encontrado`);
    }
}

export async function loadMenuAssets() {
    var animName = "Armature_Entrando_";

    for (let i = 0; i < 81; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/menu/Entrando/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    animName = "Armature_Fundo_";
    for (let i = 0; i < 65; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/menu/Fundo/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    document.getElementById("loading").style.display = "none";
    document.getElementById("menu").style.display = "block";
    document.getElementById("menu").style.animation = "scale .75s ease-in-out";
    changeState(states.cutscene, "Finished loading menu");
    console.log("finished loading the menu assets");
}
