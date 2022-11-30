import Phaser from "phaser";

class Welcome extends Phaser.Scene {
	constructor() {
		super("welcome");
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys();
		this.add.text(20, 20, "Welcome to Assassins Creed Gameboy!");
		this.add.text(200, 200, "Press the SpaceBar to begin...");
	}

	update() {
		if (this.cursors.space.isDown) {
			this.scene.start("levelOne");
		}
	}
}

export default Welcome;
