import Phaser from "phaser";
let cursors, player;

export default class Anims extends Phaser.Scene {
	constructor(value) {
		super(value);
	}

	preload() {
		this.load.spritesheet("player", "./assets/rogue.png", {
			frameWidth: 32,
			frameHeight: 32,
		});
		cursors = this.input.keyboard.createCursorKeys();
	}

	create() {
		player = this.add.sprite(400, 300, "rogue");

		this.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("rogue", { start: 0, end: 9 }),
			frameRate: 5,
			repeat: -1,
		});

		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("rogue", {
				start: 20,
				end: 29,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("rogue", {
				start: 20,
				end: 29,
			}),
			frameRate: 10,
			repeat: -1,
		});
	}

	update() {
		// Code that runs for every frame rendered in the browser
		if (cursors.right.isDown) {
			player.setVelocityX(100);
			player.flipX = false;
			player.anims.play("right", true);
		} else if (cursors.left.isDown) {
			player.setVelocityX(-100);
			player.flipX = true;
			player.anims.play("left", true);
		} else if (cursors.up.isDown && player.body.touching.down) {
			player.setVelocityY(-200);
		} else {
			player.setVelocityX(0);
			// player.anims.play("idle", true);
		}
	}
}
