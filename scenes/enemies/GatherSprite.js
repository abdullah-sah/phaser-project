import Phaser from "phaser";
import { createPlayerAnims } from "../anims/PlayerAnims";

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

let DIRECTION = RIGHT;

const setRandomDirection = (excludeValue) => {
	let newDir = Phaser.Math.Between(0, 3);
	// to make sure we don't somehow end up in an infinite loop
	let count = 0;
	while (newDir === excludeValue && count < 10) {
		newDir = Phaser.Math.Between(0, 3);
		count++;
	}
	DIRECTION = newDir;
};

export default class GatherSprite extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
		createPlayerAnims(texture, this.anims);

		scene.physics.world.on(
			Phaser.Physics.Arcade.Events.TILE_COLLIDE,
			this.handleTileCollision,
			this
		);

		// scene.physics.world.on(
		// 	Phaser.Physics.Arcade.Events.COLLIDE,
		// 	this.handlePlayerCollision,
		// 	this
		// );

		this.moveEvent = scene.time.addEvent({
			delay: 2000,
			callback: () => {
				setRandomDirection(DIRECTION);
			},
			loop: true,
		});
	}

	destroy(fromScene) {
		this.moveEvent.destroy();
		super.destroy(fromScene);
	}

	handleTileCollision(gameObject, tile) {
		if (gameObject === this) {
			return setRandomDirection(DIRECTION);
		}
		setRandomDirection(DIRECTION);
	}

	// handlePlayerCollision(go1, go2, b1, b2) {
	// 	console.log(go1);
	// }

	// time and deltaTime => passed in by phaser
	preUpdate(t, dt) {
		super.preUpdate(t, dt);

		const speed = 30;

		switch (DIRECTION) {
			case UP:
				this.setVelocity(0, -speed);
				this.anims.play("up", true);
				break;

			case DOWN:
				this.setVelocity(0, speed);
				this.anims.play("down", true);
				break;

			case LEFT:
				this.setVelocity(-speed, 0);
				this.anims.play("left", true);
				break;

			case RIGHT:
				this.setVelocity(speed, 0);
				this.anims.play("right", true);
				break;

			default:
				break;
		}
	}
}
