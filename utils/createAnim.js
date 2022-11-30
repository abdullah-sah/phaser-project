import Phaser from "phaser";

const createAnim = (
	sprite,
	key,
	{ start, end },
	frameRate,
	repeat,
	animsObj
) => {
	const animation = animsObj.create({
		key,
		frames: animsObj.generateFrameNumbers(sprite, {
			start,
			end,
		}),
		frameRate,
		repeat,
	});

	return animation;
};

export { createAnim };
