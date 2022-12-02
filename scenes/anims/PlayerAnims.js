import Phaser from "phaser";
import { createAnim } from "../../utils/createAnim";

const possiblePlayerAnims = [
	"down",
	"left",
	"up",
	"right",
	"dance",
	"idle-left",
	"idle-down",
	"idle-right",
	"idle-up",
];

const createPlayerAnims = (sprite, anims) => {
	let animFrame = 0;

	for (let animation of possiblePlayerAnims) {
		if (animation.includes("idle")) {
			const direction = animation.split("-");
			let frame = 0;
			switch (direction[1]) {
				case "left":
					frame = 3;
					break;
				case "right":
					frame = 9;
					break;
				case "up":
					frame = 6;
					break;
				case "down":
					frame = 0;
					break;
				default:
					console.log("you dungoofed my friend.");
					break;
			}
			createAnim(sprite, animation, { start: frame, end: frame }, 0, 0, anims);
		} else if (animation === "dance") {
			createAnim(
				sprite,
				animation,
				{ start: animFrame, end: animFrame + 2 },
				7,
				-1,
				anims
			);
		} else {
			createAnim(
				sprite,
				animation,
				{ start: animFrame, end: animFrame + 2 },
				10,
				-1,
				anims
			);
		}
		animFrame += 3;
	}
	// for (let i = 0; i < possiblePlayerAnims.length; i += 3) {
	// 	console.log("PossibleAnims: ", possiblePlayerAnims[i / 10]);
	// 	console.log("start: ", i);
	// 	console.log("end: ", i + 2);
	// 	// createAnim(
	// 	// 	sprite,
	// 	// 	possiblePlayerAnims[i / 10],
	// 	// 	{ start: i / 10, end: (i / 10) + 2 },
	// 	// 	10,
	// 	// 	-1,
	// 	// 	anims
	// 	// );
	// }
};

export { createPlayerAnims };
