import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
	constructor() {
		super("preloader");
	}

	preload() {
		this.load.image("tiles", "../assets/dungeon_tiles.png");
		this.load.tilemapTiledJSON("dungeon-01", "../assets/dungeon01.json");
		this.load.tilemapTiledJSON(
			"dungeon-01_test",
			"../assets/dungeon01_test.json"
		);

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

		this.load.spritesheet("sprite1_gather", "../assets/sprite1_gather.png", {
			frameWidth: 32,
			frameHeight: 64,
		});
		this.load.spritesheet("sprite2_gather", "../assets/sprite2_gather.png", {
			frameWidth: 32,
			frameHeight: 64,
		});
		this.load.spritesheet("sprite3_gather", "../assets/sprite3_gather.png", {
			frameWidth: 32,
			frameHeight: 64,
		});
		this.load.spritesheet("sprite4_gather", "../assets/sprite4_gather.png", {
			frameWidth: 32,
			frameHeight: 64,
		});
	}

	update() {
		this.scene.start("welcome");
	}
}
