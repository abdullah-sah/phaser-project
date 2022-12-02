import Phaser from "phaser";

class Welcome extends Phaser.Scene {
	constructor() {
		super("welcome");
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys();
		this.add.text(20, 20, "Welcome to 'Help Andy Escape!'");
		this.add.text(
			20,
			100,
			"The goal of the game? Help Andy escape from all the other folk",
			{ fontSize: 12 }
		);
		this.add.text(20, 120, "in gathertown who are demanding his attention!", {
			fontSize: 12,
		});

		setTimeout(() => {
			this.add.text(100, 200, "Press the SpaceBar to begin...");
		}, 3000);
	}

	update() {
		if (this.cursors.space.isDown) {
			this.scene.start("levelOne");
		}
	}
}

export default Welcome;
