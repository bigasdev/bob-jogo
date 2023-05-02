import { changeState, states } from "./state.js";

export async function loadMenuAssets() {
    var animName = "Armature_Entrando_";

    for (let i = 0; i < 81; i++) {
        await new Promise((resolve) => {
            console.log(`loaded ${animName}${i}.png}`);
            const img = new Image();
            img.onerror = (e) => reject(e);
            img.onload = () => resolve(img);
            img.src = `./assets/menu/Entrando/${animName}${i}.png`;
        });
    }
    document.getElementById("menu").style.animation = "scale .75s ease-in-out";
    changeState(states.cutscene, "Finished loading menu");
    console.log("finished loading the menu assets");
}
