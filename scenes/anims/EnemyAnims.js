import Phaser from "phaser";
import { createAnim } from "../../utils/createAnim";

const createRogueAnims = (anims, possibleAnims) => {
	for (let i = 0; i < possibleAnims.length * 10; i += 10) {
		// separate scenario for left (i = 40)
		// because left animation uses same frames as right animation, just flipped
		if (i === 40) {
			createAnim("rogue", "left", { start: 20, end: 29 }, 10, -1, anims);
		} else {
			createAnim(
				"rogue",
				possibleAnims[i / 10],
				{ start: i, end: i + 9 },
				10,
				-1,
				anims
			);
		}
	}
};

export { createRogueAnims };
