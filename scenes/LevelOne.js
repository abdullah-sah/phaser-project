import Phaser from "phaser";
import { drawDebug } from "../utils/debug";
import { createSprite } from "../utils/createSprite";
import { createAnim } from "../utils/createAnim";

let cursors;

class LevelOne extends Phaser.Scene {
	constructor() {
		super("levelOne");
	}

	preload() {
		cursors = this.input.keyboard.createCursorKeys();
		// In preparation for using utility fn to loop over values and create anims:
		this.possibleAnims = ["idle", "skipme", "right", "attack", "left"];
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
		// drawDebug(wallsLayer, this);

		// creating the sprite using a utility function
		this.player = createSprite(400, 100, "player", this);
		this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.3);

		// creating animations for player sprite using utility function:
		for (let i = 0; i < this.possibleAnims.length * 10; i += 10) {
			// separate scenario for left (i = 40)
			// because left animation uses same frames as right animation, just flipped
			if (i === 40) {
				createAnim(
					"player",
					"left",
					{ start: 20, end: 29 },
					10,
					-1,
					this.anims
				);
			} else {
				createAnim(
					"player",
					this.possibleAnims[i / 10],
					{ start: i, end: i + 9 },
					10,
					-1,
					this.anims
				);
			}
		}

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
