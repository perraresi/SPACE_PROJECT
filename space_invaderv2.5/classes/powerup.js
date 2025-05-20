//classe referente aos powerups, os poderzinhos que caem da tela ao matar os invaders
class PowerUp {
    constructor({ x, y, type }) {
        this.position = { x, y };
        this.velocity = 2;
        this.size = 32 * 2;
        this.type = type;
        this.image = this.getImage(type);
    }

    getImage(type) {
        const image = new Image();
        if (type === "double") {
            image.src = "assets/images/powerups/double.png";
        }

        if(type === "shield") {
            image.src = "assets/images/powerups/shield.png";
        }

        if(type === "turbo") {
            image.src = "assets/images/powerups/turbo.png";
        }

        if(type === "freeze") {
            image.src = "assets/images/powerups/freeze.png";
        }
        return image;
    }

    update() {
        this.position.y += this.velocity;
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size,
            this.size
        );
    }

    collidesWith(player) {
        return (
            this.position.x < player.position.x + player.widht &&
            this.position.x + this.size > player.position.x &&
            this.position.y < player.position.y + player.height &&
            this.position.y + this.size > player.position.y
        );
    }
}

export default PowerUp;