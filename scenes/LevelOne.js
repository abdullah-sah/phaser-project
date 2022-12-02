import Phaser, { GameObjects } from "phaser";
import GatherSprite from "./enemies/GatherSprite";
import { drawDebug } from "../utils/debug";
import { createSprite } from "../utils/createSprite";
import { createPlayerAnims } from "./anims/PlayerAnims";
import Andy from "./players/andy";

let cursors;

class LevelOne extends Phaser.Scene {
	constructor() {
		super("levelOne");
		this.gameover = false;
		this.collisions = 0;
	}

	preload() {
		cursors = this.input.keyboard.createCursorKeys();
	}

	create() {
		// creating animations for Rogue enemy sprite using utility fn in ./anims folder:
		// createRogueAnims(this.rogue.anims, this.possibleAnims);
		this.add.text(20, 20, "Week 1: HTML, CSS & JS");

		// creating the map
		const map = this.make.tilemap({ key: "dungeon-01_test" });
		const tileset = map.addTilesetImage("0x72_DungeonTilesetII_v1.4", "tiles");
		map.createLayer("Tile Layer 1", tileset);
		const wallsLayer = map.createLayer("Walls", tileset);
		wallsLayer.setCollisionByProperty({ colliders: true });

		// uncomment to show collision tiles:
		// drawDebug(wallsLayer, this);

		// creating the sprite using a utility function
		const gatherSprites = this.physics.add.group({
			classType: GatherSprite,
			createCallback: (gameObj) => {
				gameObj.body.onCollide = true;
				gameObj.body.setSize(gameObj.width * 0.3, gameObj.height * 0.15);
				gameObj.body.offset.y = 40;
				gameObj.scale = 0.8;
			},
		});
		gatherSprites.get(300, 100, "sprite1_gather");
		gatherSprites.get(180, 200, "sprite2_gather");
		gatherSprites.get(370, 400, "sprite3_gather");
		gatherSprites.get(430, 350, "sprite4_gather");

		// creating player sprite
		const players = this.physics.add.group({
			classType: Andy,
			createCallback: (gameObj) => {
				gameObj.body.setSize(gameObj.width * 0.3, gameObj.height * 0.15);
				gameObj.body.offset.y = 40;
				gameObj.scale = 0.8;
			},
		});
		this.player = players.get(400, 130, "andy");
		// this.player = createSprite(400, 130, "andy", this);
		createPlayerAnims("andy", this.anims);

		// setting colliders:
		this.physics.add.collider([this.player, wallsLayer]);
		this.physics.add.collider(gatherSprites, wallsLayer);

		this.physics.add.collider(
			gatherSprites,
			this.player,
			this.handlePlayerSpriteCollision,
			undefined,
			this
		);
		this.hit = 0;
		this.idleDirection = "down";

		// setting camera:
		this.cameras.main.startFollow(this.player, true);
	}

	handlePlayerSpriteCollision(player, sprite) {
		const dx = player.x - sprite.x;
		const dy = player.y - sprite.y;

		const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

		player.setVelocity(dir.x, dir.y);
		player.setTint("0xff0000");
		this.hit = 1;
		setTimeout(() => {
			player.clearTint();
			this.gameover = true;
		}, 1000);
	}

	update() {
		if (this.hit > 0) {
			this.hit++;
			if (this.hit > 5) {
				this.hit = 0;
			}
			return;
		}
		if (this.gameover) {
			this.scene.start("gameover");
		}
		const speed = 100;

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
}

export default LevelOne;
