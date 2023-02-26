 var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: 0x000000,
        scene: [Scene1, Scene2],
        physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
        },
    }

    var platforms;
    var player;
    var cursors;
    var stars;
    var score;
    var scoreText;
    var bombs;


    var game = new Phaser.Game(config);