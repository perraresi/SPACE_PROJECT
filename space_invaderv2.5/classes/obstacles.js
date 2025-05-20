class Obstacles {
    constructor(position, widht, height, color) {

        this.position = position;
        this.widht = widht;
        this.height = height;
        this.color = color;


    }

    draw(ctx) {
       ctx.fillStyle = this.color;
       ctx.fillRect(this.position.x, this.position.y, this.widht, this.height)
    }


    hit(projectile) {
        const projectilePositionY = 
        projectile.velocity < 0 ? projectile.position.y : projectile.position.y + projectile.height;

    return (
        projectile.position.x >= this.position.x &&
        projectile.position.x <= this.position.x + this.widht &&
        projectilePositionY >= this.position.y &&
        projectilePositionY <= this.position.y + this.height
    );
}

invaderHit(invader) {
    return (
        invader.position.x + invader.widht >= this.position.x &&
        invader.position.x <= this.position.x + this.widht &&
        invader.position.y + invader.height >= this.position.y &&
        invader.position.y <= this.position.y + this.height
    );
}

}



export default Obstacles;