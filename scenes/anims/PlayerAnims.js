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

const createPlayerAnims = (spriteKey, anims) => {
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
			createAnim(
				spriteKey,
				animation,
				{ start: frame, end: frame },
				0,
				0,
				anims
			);
		} else if (animation === "dance") {
			createAnim(
				spriteKey,
				animation,
				{ start: animFrame, end: animFrame + 2 },
				7,
				-1,
				anims
			);
		} else {
			createAnim(
				spriteKey,
				animation,
				{ start: animFrame, end: animFrame + 2 },
				10,
				-1,
				anims
			);
		}
		animFrame += 3;
	}
};

export { createPlayerAnims };
