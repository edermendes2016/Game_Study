import { SIZES, SPRITES } from "../utils/constants";
import { Entity, IEntity } from "./entity";

interface KeyMapping {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
}

export class HeroHorda extends Entity {
    
    moveSpeed: number;
    keys: KeyMapping;

    constructor({ scene, x, y, textures }: IEntity) {
        if (!textures || !textures.base) {
            throw new Error('textures.base is required');
        }

        super({ scene, x, y, textures, type: SPRITES.HORDA.TYPE });

        // Criando a animação        
        const anims = scene.anims;
        const animsFrameRate = 9;
        
        
        this.moveSpeed = 60;

        this.setSize(28, 32);
        this.setOffset(10, 16);
        this.setScale(0.8);

        this.createAnimation('horda_down', textures.base, 0, 2, anims, animsFrameRate);
        this.createAnimation('horda_left', textures.base, 12, 14, anims, animsFrameRate);
        this.createAnimation('horda_right', textures.base, 24, 26, anims, animsFrameRate);
        this.createAnimation('horda_up', textures.base, 36, 38, anims, animsFrameRate);

        this.keys = this.scene.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D
        }) as KeyMapping;
    }

    override update() {
        if (!(this.scene as any).canHordaMove) {
            this.setVelocity(0, 0);
            return;
        }

        const delta = 3;
    
        this.resetFlip();
        
        if (this.keys.w.isDown) {
            this.play('horda_up', true);
            this.setVelocity(0, -delta * this.moveSpeed);
        } else if (this.keys.s.isDown) {
            this.play('horda_down', true);
            this.setVelocity(0, delta * this.moveSpeed);
        } else if (this.keys.a.isDown) {
            this.play('horda_left', true);
            this.setVelocity(-delta * this.moveSpeed, 0);
        } else if (this.keys.d.isDown) {
            this.play('horda_right', true);
            this.setVelocity(delta * this.moveSpeed, 0);
        } else {
            this.setVelocity(0, 0);
            this.stop();
        }
    }
}

export const loadHordaSprites = (scene: Phaser.Scene): void => { 
    scene.load.spritesheet(SPRITES.HORDA.BASE, 'assets/heros/horda.png', {
        frameWidth: SIZES.PLAYER.WIDTH,
        frameHeight: SIZES.PLAYER.HEIGHT
    });
}
