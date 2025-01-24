import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("game");
    }
    preload() {}
    init() {}
    create() {
        this.cameras.main.setBackgroundColor("#FFFFFF");
    }
    update() {}
}
