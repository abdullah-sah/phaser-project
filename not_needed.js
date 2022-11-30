import Phaser, { Game } from "phaser";
import LevelOne from "./scenes/LevelOne";
import Welcome from "./scenes/Welcome";
let platforms, player, cursors;

// const config = {
// 	width: 800,
// 	height: 600,
// 	backgroundColor: 0x000000,
// 	scene: [Welcome, LevelOne],
// };

// const game = new Phaser.Game(config);

const create = () => {};

const game = new Game({
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
			debug: true,
		},
	},
	// scene: [Welcome, LevelOne],
	scene: {
		preload() {
			// Code that needs to run before the game is on the screen
			this.load.image("background", "./assets/sky.png");
			this.load.image("platform", "./assets/platform.png");
			this.load.image("bomb", "./assets/bomb.png");
			this.load.spritesheet("rogue", "./assets/rogue.png", {
				frameWidth: 32,
				frameHeight: 32,
			});
			cursors = this.input.keyboard.createCursorKeys();
		},

		create() {
			// Code that runs as soon as the game is on the screen
			this.add.image(400, 300, "background");
			platforms = this.physics.add.staticGroup();
			platforms.create(400, 395, "platform").setScale(0.5).refreshBody();
			player = this.physics.add.sprite(500, 200, "rogue");
			// player.setBounce(0);
			player.setCollideWorldBounds(true);
			this.physics.add.collider([player, platforms]);

			// animations
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
		},

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
		},
	},
});
