class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }



    create() {
        this.add.image(0,0,"sky").setOrigin(0,0);
        this.add.image(400, 300, "star");

        //Platform placement code

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, "platform").setScale(2).refreshBody();

        this.platforms.create(600, 400, "platform");
        this.platforms.create(50, 250, "platform");
        this.platforms.create(750, 220, "platform");

        //Player physics

        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        this.player.body.setGravityY(300)
        this.physics.add.collider(this.player, this.platforms);

        //Player animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //Movement Handler
        this.cursors = this.input.keyboard.createCursorKeys();

        //Bombs

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);

        function hitBomb (player,  bomb)
        {
            this.physics.pause();

            this.player.setTint(0xff0000);

            this.player.anims.play('turn');


        }

        //Stars

        this.stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'score: ' + this.score, { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(this.stars, this.platforms);

        function collectStar (player, star) {
            star.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);

            if (this.stars.countActive(true) === 0)
                {
                    this.stars.children.iterate(function (child) {

                        child.enableBody(true, child.x, 0, true, true);

                    });

                    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                    var bomb = this.bombs.create(x, 16, 'bomb');
                    bomb.setBounce(1);
                    bomb.setCollideWorldBounds(true);
                    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

           }

        }


        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);
    }

    update() {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
           this.player.setVelocityX(160);

           this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }


        //Original
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.body.setGravityY(300);
            this.player.setVelocityY(-560);
        }


        //My new code
        if(this.player.body.velocity.y > -50) {
            this.player.body.setGravityY(1000);
        }

    }
}