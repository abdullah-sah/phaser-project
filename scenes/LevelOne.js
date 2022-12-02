import Phaser from "phaser";
import Rogue from "./enemies/Rogue";
import Andy from "./players/Andy";
import { drawDebug } from "../utils/debug";
import { createSprite } from "../utils/createSprite";
import { createAnim } from "../utils/createAnim";
import { createRogueAnims } from "./anims/enemyAnims";
import { createPlayerAnims } from "./anims/PlayerAnims";

let cursors;

class LevelOne extends Phaser.Scene {
	constructor() {
		super("levelOne");
	}

	preload() {
		cursors = this.input.keyboard.createCursorKeys();
		// In preparation for using utility fn to loop over values and create anims:
	}

	create() {
		// creating animations for Rogue enemy sprite using utility fn in ./anims folder:
		// createRogueAnims(this.rogue.anims, this.possibleAnims);
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
		this.rogues = this.physics.add.group({
			classType: Rogue,
			createCallback: (gameObject) => {
				gameObject.body.onCollide = true;
			},
		});
		this.rogue = this.rogues.get(400, 100, "rogue");
		this.rogue.body.setSize(this.rogue.width * 0.3, this.rogue.height * 0.3);

		// this.player = this.add.andy(128, 128, "andy");
		this.player = createSprite(400, 130, "andy", this);
		this.player.body.setSize(
			this.player.width * 0.3,
			this.player.height * 0.15
		);
		this.player.scale = 0.8;
		createPlayerAnims("andy", this.anims);

		// setting colliders:
		this.physics.add.collider([this.player, wallsLayer]);
		this.physics.add.collider(this.rogues, wallsLayer);
		this.physics.add.collider(
			this.player,
			this.rogues,
			this.handlePlayerRogueCollision,
			undefined,
			this
		);

		this.hit = 0;
		this.idleDirection = "down";

		// setting camera:
		this.cameras.main.startFollow(this.player, true);
	}

	update() {
		const speed = 100;

		if (this.hit > 0) {
			this.hit++;
			if (this.hit > 10) {
				this.hit = 0;
			}
			return;
		}

		if (cursors.right.isDown) {
			this.player.setVelocity(speed, 0);
			this.idleDirection = "right";
			this.player.anims.play("right", true);
		} else if (cursors.left.isDown) {
			this.player.setVelocity(-speed, 0);
			this.idleDirection = "left";
			this.player.anims.play("left", true);
		} else if (cursors.up.isDown) {
			this.player.setVelocity(0, -speed);
			this.idleDirection = "up";
			this.player.anims.play("up", true);
		} else if (cursors.down.isDown) {
			this.player.setVelocity(0, speed);
			this.idleDirection = "down";
			this.player.anims.play("down", true);
		} else if (cursors.shift.isDown) {
			this.player.anims.play("dance", true);
		} else {
			this.player.setVelocity(0, 0);
			this.player.anims.play(`idle-${this.idleDirection}`, true);
		}
	}

	handlePlayerRogueCollision(player, rogue) {
		// player and rogue are gameObjects respectively
		this.hit = 1;
		const dx = player.x - rogue.x;
		const dy = player.y - rogue.y;
		console.log("DX IS: ", dx);
		console.log("DY IS: ", dy);
		const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
		player.setVelocity(dir.x, dir.y);
		// console.log("CURRENT VELOCITY IS: ", this.player);
		// console.log(this.idleDirection);
	}
}

export default LevelOne;
