import { SIZES, SPRITES } from "../utils/constants";
import { IEntity } from "./entity";
import { SetBaseHook } from "./setBaseHook";

export class Enemy01 extends SetBaseHook {
    /**
     *
     */

    constructor({ scene, x, y, textures }: IEntity) {
        if (!textures || !textures.base) {
            throw new Error('textures.base is required');
        }

        super({ scene, x, y, textures, type: SPRITES.BOAR.TYPE });    
        this.cycleTween();
        this.setFlipX(true);
    }

    cycleTween(){
        this.scene.tweens.add({
            targets: this,
            duration: 2000,
            repeat: -1,
            yoyo: true,
            x: this.x + 100,
            // Fazer o inimigo virar quando estiver voltando
            onRepeat: () => {
                this.setFlipX(true);
            },
            // precisa criar a função de Yoyo
            onYoyo: () => {
                this.setFlipX(false);
            }
        });
    }
}

export const loadEmemy01Sprites = (scene: Phaser.Scene): void => { 
    scene.load.spritesheet(SPRITES.BOAR.BASE, 'assets/enemies/boar.png', {
        frameWidth: SIZES.BOAR.WIDTH,
        frameHeight: SIZES.BOAR.HEIGHT
    });
}
