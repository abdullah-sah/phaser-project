import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
	constructor() {
		super("preloader");
	}

	preload() {
		this.load.image("tiles", "../assets/dungeon_tiles.png");
		this.load.tilemapTiledJSON("dungeon-01", "../assets/dungeon01.json");

		this.load.spritesheet("rogue", "../assets/rogue.png", {
			frameWidth: 32,
			frameHeight: 32,
		});

		this.load.spritesheet("abs", "../assets/abs_gather.png", {
			frameWidth: 32,
			frameHeight: 64,
		});

		this.load.spritesheet("andy", "../assets/andyy_gather.png", {
			frameWidth: 32,
			frameHeight: 64,
		});
	}

	update() {
		this.scene.start("welcome");
	}
}
