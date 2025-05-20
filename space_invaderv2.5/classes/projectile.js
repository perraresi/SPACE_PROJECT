class Projectile {

    constructor(position, velocity, color) {
        this.position = position;
        this.widht = 2;
        this.height = 20;
        this.velocity = velocity;
        this.color = color
    }

draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.widht, this.height)
}

update() {
    this.position.y += this.velocity
}
}


export default Projectile;