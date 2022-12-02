import Phaser from "phaser";

class GameOver extends Phaser.Scene {
	constructor() {
		super("gameover");
	}

	create() {
		this.add.text(200, 120, "GAME OVER!", {
			fontSize: 18,
			color: "red",
		});
	}
}

export default GameOver;
