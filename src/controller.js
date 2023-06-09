//Script responsavel pelos controles do jogo
export const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    e: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    },
};

export let keyPressed;

//metodo pra adicionar os inputs no keydown e up
export function startController() {
    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "d":
                keys.d.pressed = true;
                keyPressed = "d";
                break;

            case "a":
                keys.a.pressed = true;
                keyPressed = "a";
                break;
            case "w":
                keys.w.pressed = true;
                keyPressed = "w";
                break;
            case "e":
                keys.e.pressed = true;
                break;

            // player2 keys
            case "ArrowRight":
                keys.ArrowRight.pressed = true;

                break;
            case "ArrowLeft":
                keys.ArrowLeft.pressed = true;

                break;
            case "ArrowUp":
                keys.ArrowUp.pressed = true;
                break;
        }
    });

    window.addEventListener("keyup", (event) => {
        switch (event.key) {
            case "d":
                keys.d.pressed = false;
                break;
            case "a":
                keys.a.pressed = false;
                break;
            case "w":
                keys.w.pressed = false;
                break;

            case "e":
                keys.e.pressed = false;
                break;

            //player2 keys
            case "ArrowRight":
                keys.ArrowRight.pressed = false;
                break;
            case "ArrowLeft":
                keys.ArrowLeft.pressed = false;
                break;
            case "ArrowUp":
                keys.ArrowUp.pressed = false;
                break;
        }
    });
}
