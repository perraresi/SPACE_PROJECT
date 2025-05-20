import { PATH_INVADER_IMAGE } from "../utils/constants.js";
import Projectile from "./Projectile.js";

class Invader {
    
    constructor(position, velocity) {

    
    this.position = position;
    this.widht = 50 * 0.8;
    this.height = 37 * 0.8;
    this.velocity = velocity;
    
    this.frozen = false;
    this.frozentimer = 0;

    this.image = new Image();
    this.image.src = PATH_INVADER_IMAGE;
    this.originalImage = this.image.src;
}

setImage(src) {
        this.image.src = src;
    }

resetImage() {
        this.image.src = this.originalImage;
    }

moveLeft() {
    this.position.x -= this.velocity
}

moveRight() {
    this.position.x += this.velocity
}

moveDown() {
    this.position.y += this.height
}

incrementVelocity(boost) {
    this.velocity += boost
}

draw(ctx){
    ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.widht,
        this.height  
    )
}

ActivateFreeze(duration = 5000) {
    this.frozen = true;
    this.frozentimer = Date.now() + duration;
}

update_status() {
    if (this.frozen && Date.now() > this.frozentimer) {
        this.frozen = false;;
    }
}

shoot(projectiles){
    if (this.frozen) return;
    const p = new Projectile({
        
        x: this.position.x + this.widht / 2,
        y: this.position.y + this.height

    }, 6, "#55ff00")
    projectiles.push(p);
}

hit(projectile) {
    return (
        projectile.position.x >= this.position.x &&
        projectile.position.x <= this.position.x + this.widht &&
        projectile.position.y >= this.position.y &&
        projectile.position.y <= this.position.y + this.height
    );

}


}

export default Invader;