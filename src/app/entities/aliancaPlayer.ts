import { SetBaseHook } from "./setBaseHook";
import { SIZES, SPRITES } from "../utils/constants";
import { IEntity } from "./entity";

export class HeroAlianca extends SetBaseHook {
    constructor({ scene, x, y, textures }: IEntity) {
        if (!textures || !textures.base) {
            throw new Error('textures.base is required');
        }

        super({ scene, x, y, textures, type: SPRITES.ALIANCA.BASE });
    }
    override update() {
        if ((this.scene as any).canHeroMove) {
            const cursors = this.scene.input.keyboard.createCursorKeys();
            const delta = 3;

            if (!(this.scene as any).canHeroMove) {
                this.setVelocity(0, 0);
                return;
            }

            this.resetFlip();

            if (cursors.up.isDown) {
                this.setVelocity(0, -delta * this.moveSpeed);
            } else if (cursors.down.isDown) {
                this.setVelocity(0, delta * this.moveSpeed);
            } else if (cursors.left.isDown) {
                this.setVelocity(-delta * this.moveSpeed, 0);
            } else if (cursors.right.isDown) {
                this.setVelocity(delta * this.moveSpeed, 0);
            } else {
                this.setVelocity(0, 0);
                this.stop();
            }
        }
    }
}

export const loadAliancaSprites = (scene: Phaser.Scene): void => {
    scene.load.spritesheet(SPRITES.ALIANCA.BASE, 'assets/heros/alliance.png', {
        frameWidth: SIZES.PLAYER.WIDTH,
        frameHeight: SIZES.PLAYER.HEIGHT
    });
};
