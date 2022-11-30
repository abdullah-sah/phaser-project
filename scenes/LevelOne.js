import Phaser from "phaser";
import { drawDebug } from "../utils/debug";
import { createSprite } from "../utils/createSprite";

let cursors, platforms, player;

class LevelOne extends Phaser.Scene {
	constructor() {
		super("levelOne");
	}

	preload() {
		cursors = this.input.keyboard.createCursorKeys();
	}

	create() {
		this.add.text(20, 20, "Level 1: The Story of Altair");

		// creating the map
		const map = this.make.tilemap({ key: "dungeon-01" });
		const tileset = map.addTilesetImage("0x72_DungeonTilesetII_v1.4", "tiles");

		map.createLayer("Tile Layer 1", tileset);
		const wallsLayer = map.createLayer("Walls", tileset);

		wallsLayer.setCollisionByProperty({ colliders: true });

		// uncomment to show collision tiles:
		drawDebug(wallsLayer, this);

		// creating the sprite
		// this.player = this.physics.add.sprite(100, 100, "player");
		// this.player.setCollideWorldBounds(true);
		this.player = createSprite(100, 100, "player", this);
		this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.3);

		// creating animations:
		this.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("player", { start: 0, end: 9 }),
			frameRate: 5,
			repeat: -1,
		});

		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("player", {
				start: 20,
				end: 29,
			}),
			frameRate: 15,
			repeat: -1,
		});

		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("player", {
				start: 20,
				end: 29,
			}),
			frameRate: 15,
			repeat: -1,
		});

		this.anims.create({
			key: "attack",
			frames: this.anims.generateFrameNumbers("player", { start: 30, end: 39 }),
			frameRate: 10,
			repeat: 0,
		});

		// setting colliders:
		this.physics.add.collider(this.player, wallsLayer);

		// setting camera:
		this.cameras.main.startFollow(this.player, true);
	}

	update() {
		const speed = 100;

		if (cursors.right.isDown) {
			this.player.setVelocity(speed, 0);
			this.player.flipX = false;
			this.player.anims.play("right", true);
		} else if (cursors.left.isDown) {
			this.player.setVelocity(-speed, 0);
			this.player.flipX = true;
			this.player.anims.play("left", true);
		} else if (cursors.up.isDown) {
			this.player.setVelocity(0, -speed);
		} else if (cursors.down.isDown) {
			this.player.setVelocity(0, speed);
		} else if (cursors.space.isDown) {
			this.player.anims.play("attack", true);
		} else {
			this.player.setVelocity(0, 0);
			this.player.anims.play("idle", true);
		}
	}
}

export default LevelOne;
