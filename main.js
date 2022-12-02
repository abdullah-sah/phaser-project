import Phaser, { Create } from "phaser";
import LevelOne from "./scenes/LevelOne";
import Preloader from "./scenes/Preloader";
import Welcome from "./scenes/Welcome";
import GameOver from "./scenes/GameOver";

const game = new Phaser.Game({
	width: 500,
	height: 400,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: true,
		},
	},
	scene: [Preloader, Welcome, LevelOne, GameOver],
	scale: {
		zoom: 1.8,
	},
});
