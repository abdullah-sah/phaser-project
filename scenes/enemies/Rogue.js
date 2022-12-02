import Phaser from "phaser";
import { createRogueAnims } from "../anims/enemyAnims";

// constants for the switch statement in preUpdate()
const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

// fn to choose new random direction using Phaser.Math.Between
const setNewDirection = (excludeValue) => {
	// preventing it from randomly choosing the same value it was passed in
	let dir = Phaser.Math.Between(0, 3);
	if (dir === excludeValue) {
		dir = Phaser.Math.Between(0, 3);
	}
	DIRECTION = dir;
};

// getting an initial random direction
let DIRECTION, timeToMoveEvent;
setNewDirection();

export default class Rogue extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);

		// creating animations for rogue sprite using utility fn
		this.possibleAnims = ["idle", "skipme", "right", "attack", "left"];
		createRogueAnims(this.anims, this.possibleAnims);

		scene.physics.world.on(
			Phaser.Physics.Arcade.Events.TILE_COLLIDE,
			this.handleTileCollision
		);

		// using scene.time.addEvent similar to a setTimeout()
		// setting a new direction every 2s (delay value)
		timeToMoveEvent = scene.time.addEvent({
			delay: 2000,
			callback: () => {
				setNewDirection(DIRECTION);
			},
			loop: true,
		});
	}

	destroy(fromScene) {
		timeToMoveEvent.destroy();
		// calling parent's destroy AFTER current element's destroy
		super.destroy(fromScene);
	}

	preUpdate(t, dt) {
		// calling parent implementation of preupdate
		super.preUpdate(t, dt);

		this.speed = 20;

		switch (DIRECTION) {
			case UP:
				this.setVelocity(0, -this.speed);
				break;
			case DOWN:
				this.setVelocity(0, this.speed);
				break;
			case LEFT:
				this.setVelocity(-this.speed, 0);
				this.flipX = true;
				this.anims.play("left", true);
				break;
			case RIGHT:
				this.flipX = false;
				this.setVelocity(this.speed, 0);
				this.anims.play("right", true);
				break;

			default:
				this.anims.play("idle", true);
				break;
		}
	}

	handleTileCollision(gameObject, tile) {
		// making sure that the gameObject that collided is the same as the current gameObject (Rogue)
		if (gameObject !== this.bodies.entries[0].gameObject) {
			return;
		} else {
			setNewDirection(DIRECTION);
		}
	}
}
