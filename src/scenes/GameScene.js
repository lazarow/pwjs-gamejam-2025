import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("game");
    }
    preload() {}
    init() {}
    create() {
        this.matter.world.setBounds(-60, 0, 960 + 30 * 4, 540);
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

        let canJump = false;
        let currentPlatform = null;

        this.platforms.forEach((platform) => {
            const buoyancyForce = -0.01;
            platform.applyForce({ x: 0, y: buoyancyForce });
            const currentRotation = platform.rotation;
            const stabilizingTorque = -Math.pow(currentRotation, 3) * 0.1;
            const angularDamping = -platform.body.angularVelocity * 0.05;
            platform.setAngularVelocity(platform.body.angularVelocity + stabilizingTorque + angularDamping);
            const collision = this.matter.collision.collides(this.player.body, platform.body);
            if (collision && collision.tangent.x < 0) {
                canJump = true;
                currentPlatform = platform;
            }
        });

        if (this.cursors.up.isDown && canJump) {
            this.player.setVelocityY(-10);

            // Spin the platform if the player jump from an edge.
            if (currentPlatform) {
                const playerCenterX = this.player.x;
                const platformCenterX = currentPlatform.x;
                const distanceFromCenter = Math.abs(playerCenterX - platformCenterX);
                const edgeThreshold = currentPlatform.width * 0.45;
                const isLeftEdge = playerCenterX < platformCenterX;
                if (distanceFromCenter > edgeThreshold) {
                    currentPlatform.setAngularVelocity(isLeftEdge ? -0.8 : 0.8);
                }
            }
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
            const platform = this.matter.add.gameObject(
                this.add.rectangle(platformX, platformY, platformWidth, platformHeight, 0x000000),
                {
                    isStatic: false,
                    mass: 10,
                    friction: 0.1,
                    restitution: 0.2,
                    density: 0.01,
                }
            );
            this.matter.add.worldConstraint(platform, 0, 0.02, {
                pointA: { x: platformX, y: platformY },
                pointB: { x: 0, y: 0 },
                damping: 0.2,
                angularStiffness: 0.001,
            });
            this.platforms.push(platform);
            platformX += platformWidth + platformGap;
        }
    }
    createPlayer() {
        this.player = this.matter.add.gameObject(this.add.rectangle(480, 270, 45, 64, 0x222222), {
            isStatic: false,
        });
        this.player.setFixedRotation();
    }
}
