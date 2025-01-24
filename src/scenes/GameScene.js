import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("game");
    }
    preload() {}
    init() {}
    create() {
        this.matter.world.setBounds(0, 0, 960, 540);
        this.cameras.main.setBackgroundColor("#FFFFFF"); // Set the background color.
        this.cursors = this.input.keyboard.createCursorKeys(); // Create cursor keys for the player movement.
        this.createPlatforms();
        this.createPlayer();
    }
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-4);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(4);
        }
        if (this.cursors.up.isDown && Math.abs(this.player.body.velocity.y) < 0.1) {
            this.player.setVelocityY(-10);
        }
    }
    createPlatforms() {
        const platformWidth = 30 * 4;
        const platformHeight = 16;
        const platformGap = 30 * 2;
        const platformY = 22 * 16;
        let platformX = 12 + 2 * 30 + platformWidth / 2;
        this.platforms = [];
        for (let i = 0; i < 5; i++) {
            this.platforms.push(
                this.matter.add.gameObject(
                    this.add.rectangle(platformX, platformY, platformWidth, platformHeight, 0x000000),
                    {
                        isStatic: true,
                        angle: 0,
                    }
                )
            );
            platformX += platformWidth + platformGap;
        }
    }
    createPlayer() {
        this.player = this.matter.add.gameObject(this.add.rectangle(480, 270, 45, 64, 0x222222), { isStatic: false });
        this.player.setFixedRotation();
    }
}
