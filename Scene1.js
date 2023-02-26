class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("platform", "assets/platform.png");
        this.load.spritesheet("dude", "assets/dude.png",
        {frameWidth: 32, frameHeight: 48});
        this.load.image("bomb", "assets/bomb.png");
        this.load.image("star", "assets/star.png");
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.add.text(20, 40, "This Right?");
        this.scene.start("playGame");
    }
}