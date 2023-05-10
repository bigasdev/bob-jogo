//Script dos jogadores, aqui iremos criar as classes e manipular suas posicoes/sprites

import { getState, states } from "./state.js";
import { getCanvas, clearCanvas } from "./app.js";
import { keyPressed, keys } from "./controller.js";
import { bobPulando, botanicoPulando, getAsset, quackQuack } from "./loader.js";

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
    }

    restart() {
        this.position.x = 0;
        this.score = 0;
    }

    draw() {
        if (getState() !== states.playing && getState() !== states.finished)
            return;
        console.log(`drawing, ${this.position.x}`);

        this.animate();

        getCanvas().drawImage(
            getAsset(this.spriteName + this.currentFrame, "bob"),
            this.position.x,
            this.position.y
        );
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
        this.jump();

        if (keys.d.pressed) {
            this.position.x += this.speed;
        }
        if (keys.a.pressed) {
            if (this.position.x > 0) this.position.x -= this.speed;
        }
        if (keys.w.pressed && this.jumped === false) {
            if (this.position.y < 380) return;
            bobPulando.play();
            this.jumped = true;
        }
        this.gravity();
    }

    gravity() {
        if (this.position.y >= 390) return;
        this.position.y += 7.5;
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
    }

    restart() {
        this.position.x = 50;
        this.score = 0;
    }

    draw() {
        if (getState() !== states.playing && getState() !== states.finished)
            return;
        console.log(`drawing, ${this.position.x}`);

        this.animate();

        getCanvas().drawImage(
            getAsset(this.spriteName + this.currentFrame, "botanico"),
            this.position.x,
            this.position.y
        );
    }

    animate() {
        if (this.moving) this.spriteName = "Armature_Correndo_";
        this.currentFrame += 1;

        console.log(
            `current frame: ${this.currentFrame} current animation: ${this.spriteName}`
        );

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
        console.log("tet botanico");
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
            this.moving = false;
        }
        if (keys.ArrowUp.pressed) {
            if (this.position.y < 460) return;
            botanicoPulando.play();
            this.spriteName = "Armature_Pulando_";
            this.currentFrame = 0;
            this.maxFrames = 24;
            this.moving = false;
            this.jumped = true;
        }
        if (keys.e.pressed) {
            quackQuack.play();
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
