import Phaser from "phaser";
import GameScene from "./scenes/GameScene";

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
    },
    scene: [GameScene],
    physics: {
        default: "matter",
        matter: {
            gravity: {
                y: 2,
            },
            //debug: true,
        },
    },
    fps: {
        target: 60,
    },
});
