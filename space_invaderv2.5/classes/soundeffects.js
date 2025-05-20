//classe de sons
class SoundEffects{
    constructor() {
        //foi necessario fazer uma lista de sons para o tiro e o hit, pois o audio so pode ser tocado uma vez por vez, dessa forma reservamos 5 sons para cada acao
        //e assim conseguimos tocar o som varias vezes sem que um atrapalhe o outro.
        this.shootSounds = [
            new Audio("assets/audios/shoot.mp3"),
            new Audio("assets/audios/shoot.mp3"),
            new Audio("assets/audios/shoot.mp3"),
            new Audio("assets/audios/shoot.mp3"),
            new Audio("assets/audios/shoot.mp3"),]
   
            this.hitSounds = [
                new Audio("assets/audios/hit.mp3"),
                new Audio("assets/audios/hit.mp3"),
                new Audio("assets/audios/hit.mp3"),
                new Audio("assets/audios/hit.mp3"),
                new Audio("assets/audios/hit.mp3"),
            ]
   
            this.explosionSounds =
                new Audio("assets/audios/explosion.mp3")

                this.nextLevelSound =
                new Audio("assets/audios/next_level.mp3")

                this.currentShootSound = 0;
                this.currentHitSound = 0;

                this.shipreleaseSound = new Audio("assets/audios/ship_release.mp3");

                this.mothershipSound = new Audio("assets/audios/mothership_woosh.mp3");

                this.mothershipgoes = new Audio("assets/audios/mothership_buzz.mp3");

                this.shieldsup = new Audio("assets/audios/shields_up.mp3");

                this.shieldsdown = new Audio("assets/audios/shields_down.mp3");

                this.turboSound = new Audio("assets/audios/turbo.mp3");
        }

        playTurboSound() {

            this.turboSound.play();
        };

        playShieldsDownSound() {

            this.shieldsdown.play();
        };

        playShieldsUpSound() {
            this.shieldsup.play();
        };

        playMothershipGoesSound() {
            this.mothershipgoes.play();
        };
        
        playMothershipSound() {
            this.mothershipSound.play();
        };

        playSmallShipReleaseSound() {
            this.shipreleaseSound.play();}

        playShootSound() {
            this.shootSounds[this.currentShootSound].currentTime = 0;
            this.shootSounds[this.currentShootSound].play();
            //aqui estamos pegando o som atual e colocando no 0, para que ele comece a tocar do inicio
            //e depois estamos pegando o som atual e somando 1, para que na proxima vez que o som for tocado, ele toque o proximo som

            //e assim por diante, quando chegar no ultimo som, ele volta para o primeiro som, pois o % 5
            //faz com que o som atual seja 0, quando o som atual for 5!
            this.currentShootSound = (this.currentShootSound + 1) % this.shootSounds.length;
        };

        //mesma situação de cima, mas para o hit
        playHitSound() {
            this.hitSounds[this.currentHitSound].currentTime = 0;
            this.hitSounds[this.currentHitSound].play();
            this.currentHitSound = (this.currentHitSound + 1) % this.hitSounds.length;
        };


        playExplosionSound() {
            this.explosionSounds.play()
        };

        playNextLevelSound() {
            this.nextLevelSound.play()
        };


        //balanceando voumes no jogo
        adjustVolumes(){
            this.shieldsup.volume = 0.6;
            this.shieldsdown.volume = 0.4;
            this.explosionSounds.volume = 0.2;
            this.nextLevelSound.volume = 0.4;
            this.hitSounds.forEach(sound => {
                sound.volume = 0.2;
            });
            this.shootSounds.forEach(sound => {
                sound.volume = 0.8;
            });
        };
        

}


export default SoundEffects;