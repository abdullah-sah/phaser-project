import Phaser from "phaser";
import { createSprite } from "../../utils/createSprite";
import { createPlayerAnims } from "../anims/PlayerAnims";

export default class Andy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
	}
}
