import { SIZES, SPRITES } from "../utils/constants";
import { Entity } from "./entity";

export class Enemy01 extends Entity {
    /**
     *
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
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
    scene.load.spritesheet(SPRITES.BOAR, 'assets/enemies/boar.png', {
        frameWidth: SIZES.BOAR.WIDTH,
        frameHeight: SIZES.BOAR.HEIGHT
    });
}
