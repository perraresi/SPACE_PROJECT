import {PATH_SPACESHIP_IMAGE, PATH_ENGINE_IMAGE, PATH_ENGINE_SPRITES, PATH_SHIELD_SPRITES, INITIAL_FRAMES, GUNS_IMAGE, TURBO_ENGINE_SPRITES} from "../utils/constants.js";
import Projectile from "./Projectile.js";

class Player {
    constructor(canvasWidth, canvasHeight) {
        
        this.alive = true
        this.widht = 48 * 2;
        this.height = 48 * 2;
        this.position = {
            x: canvasWidth / 2 - this.widht / 2,
            y: canvasHeight - this.height - 30,
        };
        this.velocity = 4;

        this.turbo = false;
        this.turboTimer = 0;

        this.image = this.getImage(PATH_SPACESHIP_IMAGE);
        this.engineImage = this.getImage(PATH_ENGINE_IMAGE);
        this.engineSprites = this.getImage(PATH_ENGINE_SPRITES);
        this.shieldImage = this.getImage(PATH_SHIELD_SPRITES);
        this.gunsImage = this.getImage(GUNS_IMAGE);

        this.sx = 0;
        this.framesCounter = INITIAL_FRAMES

        this.doubleShotActive = false;
        this.doubleShotTimer = 0;

        this.ShieldActive = false;
        this.ShieldTimer = 0;
    }

    getImage(path) {
        const image = new Image();
        image.src = path;
        return image;
    }


    moveLeft() {
        this.position.x -= this.velocity
    }

    moveRight() {
        this.position.x += this.velocity
    }

    moveUp() {
        this.position.y -= this.velocity
    }

    moveDown() {
        this.position.y += this.velocity
    }

    draw(ctx) {
 ctx.drawImage(

    this.image,
    this.position.x, 
    this.position.y, 
    this.widht, 
    this.height
)

ctx.drawImage(
    this.engineSprites,

    this.sx, 
    0, 
    48, 
    48,
    this.position.x,
    this.position.y + 11,
    this.widht,
    this.height
)

ctx.drawImage(
    this.engineImage,
    this.position.x,
    this.position.y + 8,
    this.widht,
    this.height

);

if (this.ShieldActive) {
    ctx.drawImage(
        this.shieldImage,
        this.position.x,
        this.position.y -10,
        this.widht,
        this.height / 2
    );
}

if (this.doubleShotActive) {
    ctx.drawImage(
        this.gunsImage,
        this.position.x,
        this.position.y - 10,
        this.widht,
        this.height
    );
}

if (this.turbo) {
    ctx.drawImage(
        this.engineSprites,
        this.sx,
        0,
        48,
        48,
        this.position.x,
        this.position.y + 11,
        this.widht,
        this.height
    );

}


this.update();

/* feito para debug da hitbox: desenha a hitbox do jogador
ctx.save();
ctx.strokeStyle = "red";
ctx.lineWidth = 2;
ctx.globalAlpha = 0.5;
*/
/*ctx.strokeRect(
    this.position.x + 10,                  // posição x da hitbox
    this.position.y + 22,                  // posição y da hitbox
    this.widht - 20,                       // largura da hitbox (10 de cada lado)
    this.height - 34                       // altura da hitbox (22 em cima, 12 embaixo)
);*/

ctx.restore();

    };

        activateTurbo(duration = 10000) {
        this.turbo = true;
        this.velocity = 8;
        this.engineSprites = this.getImage(TURBO_ENGINE_SPRITES);
        //aqui usamos o comando Date.now() para pegar o tempo atual em milissegundos
        //e somamos o tempo atual com a duração do turbo, para que o turbo dure o tempo certo,
        //repetimos o mesmo processo para o double shot
        //e o escudo
        this.turboTimer = Date.now() + duration;
        }
    
        activateDoubleShot(duration = 5000) {
    this.doubleShotActive = true;
    this.doubleShotTimer = Date.now() + duration;
}

        activateShield(duration = 5000) {
    this.ShieldActive = true;
    this.ShieldTimer = Date.now() + duration;
}

    update() {

        if (this.framesCounter === 0) {
            this.sx = this.sx === 96 ? 0 : this.sx + 48;
            this.framesCounter = INITIAL_FRAMES;
        }

            this.framesCounter--;

            this.updatePowerUps();

    }

    updatePowerUps() {
        if (this.doubleShotActive && Date.now() > this.doubleShotTimer) {
            this.doubleShotActive = false;
        }

        if(this.ShieldActive && Date.now() > this.ShieldTimer) {
            this.ShieldActive = false;
        }

        if(this.turbo && Date.now() > this.turboTimer) {
            this.turbo = false;
            this.velocity = 4;
            this.engineSprites = this.getImage(PATH_ENGINE_SPRITES);
        }
    }




    //metodo para disparar antes da mudança
   /* shoot(projectiles, double = false){
        const p = new Projectile({
            
            x: this.position.x + this.widht / 2,
            y: this.position.y

        }, -10, "white")
        projectiles.push(p);
    } */

    //metodo para disparar, e se o double for true, dispara dois projeteis
shoot(projectiles) {
    const double = this.doubleShotActive;
    const centerX = this.position.x + this.widht / 2;
    const offset = 20;

    if (double) {
        projectiles.push(new Projectile({ x: centerX - offset, y: this.position.y }, -10, "red"));
        projectiles.push(new Projectile({ x: centerX + offset, y: this.position.y }, -10, "red"));
    } else {
        projectiles.push(new Projectile({ x: centerX, y: this.position.y }, -10, "white"));
    }
}

    //verifica se o player foi atingido
    hit(projectile){
        if (this.ShieldActive) {
            return (
                //posicao do projeteis maior ou igual a posicao x da imagem do player + 10
                projectile.position.x >= this.position.x + 5 &&
                //posicao do projeteis menor ou igual a posicao x da imagem do player + largura - 10
                projectile.position.x <= this.position.x + this.widht - 5 &&
                //posicao do projeteis maior ou igual a posicao y da imagem do player + 22
                projectile.position.y >= this.position.y &&
                //posicao do projeteis menor ou igual a posicao y da imagem do player + altura - 12
                projectile.position.y <= this.position.y + this.height - 12
            )
        }
        else {
        return (
            //posicao do projeteis maior ou igual a posicao x da imagem do player + 10
            projectile.position.x >= this.position.x + 10 &&
            //posicao do projeteis menor ou igual a posicao x da imagem do player + largura - 10
            projectile.position.x <= this.position.x + this.widht - 10 &&
            //posicao do projeteis maior ou igual a posicao y da imagem do player + 22
            projectile.position.y >= this.position.y + 22 &&
            //posicao do projeteis menor ou igual a posicao y da imagem do player + altura - 12
            projectile.position.y <= this.position.y + this.height - 12
        )
        }
    }

}

export default Player;