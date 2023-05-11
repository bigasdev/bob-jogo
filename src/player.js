//Script dos jogadores, aqui iremos criar as classes e manipular suas posicoes/sprites

import { getState, states } from "./state.js";
import { getCanvas, clearCanvas } from "./app.js";
import { keyPressed, keys } from "./controller.js";
import { getAsset } from "./loader.js";
import { bobPulando, botanicoPulando, playSound, quackQuack } from "./som.js";

//Classe de construcao da abelha que vai seguir o bob/botanico
class Abelha {
    constructor(position, size, image) {
        this.position = position;
        this.size = size;
        this.image = image;

        //variavel pra checar se a abelha esta em execucao
        this.following = false;
    }
    draw(player) {
        if (!this.following) return;

        this.position = player.position;

        getCanvas().drawImage(this.image, this.position.x, this.position.y);
    }
}

//Classe de construcao do bob
class Player {
    constructor(position, size, image, speed) {
        this.position = position;
        this.size = size;
        this.image = image;
        this.speed = speed;

        //criando a imagem padrao
        this.spriteName = "Armature_Parado_";

        this.maxFrames = 16;
        this.currentFrame = 0;

        this.score = 0;

        //controle da gravidade
        this.jumped = false;
        this.jumpForce = 22;
        //variavel que vai ser usada pra resetar a potencia do pulo
        this.originalJumpForce = 22;

        //abelha/misc
        this.abelha = new Abelha({ x: 0, y: 0 }, { w: 50, h: 51 }, new Image());
    }

    start() {
        this.abelha.image.src = "./assets/powerups/abelha.png";
    }

    restart() {
        this.position.x = 0;
        this.score = 0;
    }

    draw() {
        if (getState() !== states.playing && getState() !== states.finished)
            return;

        this.animate();

        getCanvas().drawImage(
            getAsset(this.spriteName + this.currentFrame, "bob"),
            this.position.x,
            this.position.y
        );
        this.abelha.draw(this);
    }

    animate() {
        this.spriteName = "Armature_Correndo_";
        this.currentFrame += 1;

        if (this.currentFrame >= this.maxFrames) {
            this.currentFrame = 0;
        }
    }

    //Funcao pro pulo
    jump() {
        if (this.jumped) {
            this.position.y -= this.jumpForce;
            this.jumpForce -= 1;
            if (this.jumpForce <= 0) {
                this.jumpForce = this.originalJumpForce;
                this.jumped = false;
            }
        }
    }

    update() {
        if (getState() !== states.playing) return;
        this.jump();

        if (keys.d.pressed) {
            this.position.x += this.speed;
        }
        if (keys.a.pressed) {
            if (this.position.x > 0) this.position.x -= this.speed;
        }
        if (keys.w.pressed && this.jumped === false) {
            if (this.position.y < 380) return;
            playSound(bobPulando);
            this.jumped = true;
        }
        this.gravity();
    }

    gravity() {
        if (this.position.y >= 390) return;
        this.position.y += 7.5;
    }

    //Funcao pra jogar a abelha no outro jogador
    throwAbelha() {
        Botanico.abelha.following = true;
        Botanico.speed -= 1;
        setTimeout(() => {
            Botanico.speed += 1;
            Botanico.abelha.following = false;
        }, 3000);
    }
}
class BotanicoClass {
    constructor(position, size, image, speed) {
        this.position = position;
        this.size = size;
        this.image = image;
        this.speed = speed;

        //variaveis de controle
        this.moving = false;

        //creating base image
        this.spriteName = "Armature_Parado_";

        this.maxFrames = 48;
        this.currentFrame = 0;

        this.score = 0;

        //controle da gravidade
        this.jumped = false;
        this.jumpForce = 24;
        //variavel que vai ser usada pra resetar a potencia do pulo
        this.originalJumpForce = 24;
        //variavel pra esperar a animacao
        this.waitForAnimation = 10;
        //variaveis do falling
        this.falling = true;
        //abelha/misc
        this.abelha = new Abelha({ x: 0, y: 0 }, { w: 50, h: 51 }, new Image());
    }

    start() {
        this.abelha.image.src = "./assets/powerups/abelha.png";
    }

    restart() {
        this.position.x = 50;
        this.score = 0;
    }

    draw() {
        if (getState() !== states.playing && getState() !== states.finished)
            return;

        this.animate();

        getCanvas().drawImage(
            getAsset(this.spriteName + this.currentFrame, "botanico"),
            this.position.x,
            this.position.y
        );
        this.abelha.draw(this);
    }

    animate() {
        if (this.moving) this.spriteName = "Armature_Correndo_";
        this.currentFrame += 1;

        if (this.currentFrame >= this.maxFrames) {
            this.currentFrame = 0;
        }
    }

    jump() {
        if (this.jumped) {
            this.waitForAnimation -= 1;
            if (this.waitForAnimation <= 0) {
                this.position.y -= this.jumpForce;
                this.jumpForce -= 1;
                if (this.jumpForce <= 0) {
                    this.jumpForce = this.originalJumpForce;
                    this.waitForAnimation = 5;
                    this.jumped = false;
                }
            }
        }
    }

    update() {
        if (getState() !== states.playing) return;
        this.jump();

        //Controle das animacoes, dps vai ser reforumlado pra um state controller
        if (keys.ArrowRight.pressed) {
            this.position.x += this.speed;
            if (this.jumped === false) this.moving = true;
        }
        if (keys.ArrowLeft.pressed) {
            if (this.position.x > 0) this.position.x -= this.speed;
            if (this.jumped === false) this.moving = true;
        }
        if (
            keys.ArrowLeft.pressed === false &&
            keys.ArrowRight.pressed === false &&
            this.jumped === false &&
            this.falling === false
        ) {
            this.spriteName = "Armature_Parado_";
            this.maxFrames = 48;
            this.moving = false;
        }
        if (keys.ArrowUp.pressed) {
            if (this.position.y < 460) return;
            playSound(botanicoPulando);
            this.spriteName = "Armature_Pulando_";
            this.currentFrame = 0;
            this.maxFrames = 24;
            this.moving = false;
            this.jumped = true;
        }
        if (keys.e.pressed) {
            playSound(quackQuack);
        }
        this.gravity();
    }

    gravity() {
        if (this.position.y >= 470) {
            this.falling = false;
            return;
        }
        this.moving = false;
        if (this.jumped == false) {
            this.falling = true;
            this.spriteName = "Armature_Caindo_";
            this.maxFrames = 36;
        }
        this.position.y += 7.5;
    }
    //Funcao pra jogar a abelha no outro jogador
    throwAbelha() {
        Bob.abelha.following = true;
        Bob.speed -= 1;
        setTimeout(() => {
            Bob.speed += 1;
            Bob.abelha.following = false;
        }, 3000);
    }
}

//Exportando as variaveis que contem o bob e o botanico
export let Bob = new Player(
    { x: 0, y: 380 },
    { w: 140, h: 193 },
    "./test.png",
    5
);
export let Botanico = new BotanicoClass(
    { x: 50, y: 460 },
    { w: 116, h: 113 },
    "./test.png",
    5
);

//Inicializando os players
export function loadPlayers() {
    Bob.start();
    Botanico.start();
}
