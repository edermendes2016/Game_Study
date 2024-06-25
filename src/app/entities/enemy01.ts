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
        
        this.createCycleTween();
        this.setFlipX(true); 
        
        //x horizontal, y vertical
        this.setSize(16, -6);
        this.setOffset(10, 16);
        this.setScale(1);
    }

    

       
}

export const loadEmemy01Sprites = (scene: Phaser.Scene): void => { 
    scene.load.spritesheet(SPRITES.BOAR.BASE, 'assets/enemies/boar.png', {
        frameWidth: SIZES.BOAR.WIDTH,
        frameHeight: SIZES.BOAR.HEIGHT
    });

    scene.load.image('projectile_texture', 'assets/projectiles/projectile.png');
}
