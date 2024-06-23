import { SIZES, SPRITES } from "../utils/constants";
import { Entity } from "./entity";

interface KeyMapping {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
}

export class HeroHorda extends Entity {
    textureKey: string;
    moveSpeed: number;
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, SPRITES.HORDA);

        // Criando a animação        
        const anims = scene.anims;
        const animsFrameRate = 9;
        this.textureKey = texture;
        
        this.moveSpeed = 60;

        this.setSize(28, 32);
        this.setOffset(10, 16);
        this.setScale(0.8);

        anims.create({
            key: 'horda_down',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 0,
                end: 2
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        anims.create({
            key: 'horda_left',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 12,
                end: 14
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        anims.create({
            key: 'horda_right',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 24,
                end: 26
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });

        anims.create({
            key: 'horda_up',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 36,
                end: 38
            }),
            frameRate: animsFrameRate,
            repeat: -1
        });
    }

    override update() {
        const keys: KeyMapping = this.scene.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D
        }) as KeyMapping;

        const delta = 3;
    
        this.resetFlip();
        
        if (keys.w.isDown) {
            this.play('horda_up', true);
            this.setVelocity(0, -delta * this.moveSpeed);
        } else if (keys.s.isDown) {
            this.play('horda_down', true);
            this.setVelocity(0, delta * this.moveSpeed);
        } else if (keys.a.isDown) {
            this.play('horda_left', true);
            this.setVelocity(-delta * this.moveSpeed, 0);
        } else if (keys.d.isDown) {
            this.play('horda_right', true);
            this.setVelocity(delta * this.moveSpeed, 0);
        } else {
            this.setVelocity(0, 0);
            this.stop();
        }
    }
}

export const loadHordaSprites = (scene: Phaser.Scene): void => { 
    scene.load.spritesheet(SPRITES.HORDA, 'assets/heros/horda.png', {
        frameWidth: SIZES.PLAYER.WIDTH,
        frameHeight: SIZES.PLAYER.HEIGHT
    });
}
