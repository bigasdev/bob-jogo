//Script que vai ser usado pra controlar o som e dar trigger nos efeitos sonoros
//variavel pra controlar se o jogo tem som ou nao
let isMuted = false;

//Audios
export const menuClick = new Audio("./assets/sons/menu-click.mp3");
export const quackQuack = new Audio("./assets/sons/quackquack.mp3");
export const botanicoPulando = new Audio("./assets/sons/botanico-pulando.mp3");
export const bobPulando = new Audio("./assets/sons/bob-pulo.mp3");

//Funcao pra dar play no som
export function playSound(sound) {
    if (!isMuted) {
        sound.play();
    }
}

//Funcao pra mutar o som
export function muteSound() {
    isMuted = !isMuted;
    if (isMuted) {
        document.getElementById("mute").style.background =
            "url('./assets/menu/botao_2_Som_Barra.png')";
        document.getElementById("musica").pause();
    } else {
        document.getElementById("mute").style.background =
            "url('./assets/menu/botao_2_Som.png')";
        document.getElementById("musica").play();
    }
}

//Funcao pra inicializar o som
export function startSound() {
    document.getElementById("musica").volume = 0.1;
    document.getElementById("musica").play();

    //adicionando onclick no botao de mute
    document.getElementById("mute").addEventListener("click", () => {
        muteSound();
    });
}
