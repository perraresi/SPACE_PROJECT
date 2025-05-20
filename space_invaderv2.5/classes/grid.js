import Invader from "./invader.js";
import Obstacles from "./Obstacles.js";


//aqui fazemos a importação do invader.js, que é a classe que representa os inimigos
//para fazer a grid, que é a classe que representa a organização dos inimigos na tela
class Grid {
    constructor(rows, cols) {

        this.frozen = false
        this.frozentimer = 0;

        this.rows = rows;
        this.cols = cols;
        
        this.invadersVelocity = 1;
        this.invaders = this.init();
        
        this.direction = "right";
        this.movedown = "false";

    }

    //inicia a grid
    init() {
        const array = [];

        //cria linhas e colunas de invaders até dar o numero determinado de linhas e colunas
        for (let row = 0; row < this.rows; row += 1) {
         
            for (let col = 0; col < this.cols; col += 1) {
                const invader = new Invader({
                    x: col * 50 + 20,
                    y: row * 37 + 40,
                }, this.invadersVelocity
            );

                array.push(invader);
            }
        }

        return array;

    }

    draw(ctx) {
        this.invaders.forEach(invader => invader.draw(ctx));
    }

    update (playerStatus) {

        this.invaders.forEach((invader) => {
            invader.update_status();
        }
        );

if (this.frozen && Date.now() > this.frozentimer) {
    this.frozen = false;
    this.invadersVelocity = this.originalVelocity || 1;
    this.invaders.forEach(invader => {
        invader.resetImage();
    });
}
          if (this.touched_right_border()) {
              this.direction = "left";
              this.movedown = true;
        }
            else if (this.touched_left_border()) {
                this.direction = "right";
                this.movedown = "true"
            }
    

            if (playerStatus == false) this.movedown = false;

            if (this.frozen) return; // Se estiver congelado, não atualiza movimento

      this.invaders.forEach((invader) => {

        if (this.movedown) { 
            invader.moveDown();
            invader.incrementVelocity(0.1)
            this.invadersVelocity = invader.velocity;
        }

        if (this.direction === "right") invader.moveRight();
        if (this.direction === "left") invader.moveLeft();

    });    
    
    this.movedown = false

    }

    
    InvadersFreeze(duration = 5000) {
    if (!this.frozen) {
        this.originalVelocity = this.invadersVelocity; // Salva a velocidade atual
        this.frozen = true;
        this.invadersVelocity = 0;
        this.frozentimer = Date.now() + duration;
        this.invaders.forEach((invader) => {
            invader.setImage("assets/images/invader_frozen.png");
        });

        this.invaders.forEach((invader) => {
            invader.ActivateFreeze(duration);
        }
        );
    }
}

    velocityboost(boost) {
        this.invaders.forEach((invader) => {
            invader.incrementVelocity(boost);
        });
    }

    touched_right_border() {
        return this.invaders.some(
            
            (invader) => invader.position.x >= innerWidth - invader.widht);

    }

    touched_left_border() {
        return this.invaders.some(
            
            (invader) => invader.position.x <= 0);

    }

    touched_barrier(obstacle) {
        return this.invaders.some(
            (invader) => invader.position.y >= obstacle.position.y - invader.height &&
            invader.position.x + invader.widht >= obstacle.position.x &&
            invader.position.x <= obstacle.position.x + obstacle.widht
        );
    }

    getRandominvader() {
        const index = Math.floor(Math.random() * this.invaders.length);
        return this.invaders[index];
    }

restart() {
    this.invaders = this.init();
    this.direction = "right";
    this.frozen = false;
    this.frozentimer = 0;
    this.invadersVelocity = 1;
    this.originalVelocity = 1;
}
    }

export default Grid;