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

//Funcao pra finalizar o loading
export function finishLoading() {
    document.getElementById("loading").style.display = "none";
    document.getElementById("menu").style.display = "block";
    document.getElementById("menu").style.animation = "scale .75s ease-in-out";
    changeState(states.cutscene, "Finished loading menu");
    console.log("finished loading the menu assets");
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
}
//Carregando todas as imagens do bob e do botanico
export async function loadCharactersAssets() {
    //Carregando os assets do bob
    var animName = "Armature_Parado_";
    for (let i = 0; i < 49; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/bob/parado/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    var animName = "Armature_Andando_";
    for (let i = 0; i < 49; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/bob/andando/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    var animName = "Armature_Correndo_";
    for (let i = 0; i < 49; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/bob/correndo/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    var animName = "Armature_Pulando_";
    for (let i = 0; i < 25; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/bob/pulando/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    var animName = "Armature_Caindo_";
    for (let i = 0; i < 37; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/bob/caindo/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    //Carregando os assets do botanico
    var animName = "Armature_Parado_";
    for (let i = 0; i < 49; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/botanico/parado/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    var animName = "Armature_Andando_";
    for (let i = 0; i < 49; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/botanico/andando/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    var animName = "Armature_Correndo_";
    for (let i = 0; i < 49; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/botanico/correndo/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    var animName = "Armature_Pulando_";
    for (let i = 0; i < 25; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/botanico/pulando/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    var animName = "Armature_Caindo_";
    for (let i = 0; i < 37; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/botanico/caindo/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    var animName = "Armature_Quack_";
    for (let i = 0; i < 25; i++) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/botanico/quack/${animName}${i}.png`;
            console.log(`Adicionando ${animName}${i} ao mapa`);
            assets.set(`${animName}${i}`, img);
        });
    }
    //Finalizando o loading
    finishLoading();
}
