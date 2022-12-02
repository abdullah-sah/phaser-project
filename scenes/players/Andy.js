// import Phaser from "phaser";

// export default class Andy extends Phaser.Physics.Arcade.Sprite {
// 	constructor(scene, x, y, texture, frame) {
// 		super(scene, x, y, texture, frame);

// 		// this.body.setSize(this.width * 0.3, this.height * 0.3);
// 		this.anims.play("idle-up", true);
// 	}
// }

// Phaser.GameObjects.GameObjectFactory.register(
// 	"andy",
// 	function (scene, x, y, texture, frame) {
// 		var sprite = new Andy(scene, x, y, texture, frame);
// 		scene.displayList.add(sprite);
// 		scene.updateList.add(sprite);

// 		scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);
// 	}
// );

// // Phaser.GameObjects.GameObjectFactory.register('andy', (this, x, y, texture, frame) => {
// // 	const sprite = new Andy(this.scene, x, y, texture, frame);

// // 	this.displayList.add(sprite);
// // 	this.updateList.add(sprite);

// // 	this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

// // return sprite;
// // {});

import Phaser from "phaser";

export default class Andy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
		// this.body.setSize(this.width * 0.3, this.height * 0.15);
		this.anims.play("idle-up", true);
		Phaser.GameObjects.GameObjectFactory.register(
			"andy",
			(x, y, texture, frame) => {
				console.log(this);
			}
		);
	}
}
