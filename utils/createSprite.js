const createSprite = (x, y, name, scene) => {
	const sprite = scene.physics.add.sprite(x, y, name);
	sprite.setCollideWorldBounds(true);
	return sprite;
};

export { createSprite };
