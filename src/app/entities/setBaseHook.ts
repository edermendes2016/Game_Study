import { SPRITES } from "../utils/constants";
import { Entity, IEntity } from "./entity";

export class SetBaseHook extends Entity {
    initialX: number;
    initialY: number;
    moveSpeed: number;
    

    constructor({ scene, x, y, textures }: IEntity) {
        super({ scene, x, y, textures, type: SPRITES.PLAYER.TYPE });
        this.initialX = x;
        this.initialY = y;
        this.moveSpeed = 60;
        

        // Configurações adicionais se necessário
        this.setSize(28, 32);
        this.setOffset(10, 16);
        this.setScale(0.8);
    }

    bePulled(targetX: number, targetY: number, duration: number) {
        this.play('pulled', true);
        this.scene.physics.moveToObject(this, { x: targetX, y: targetY }, 300);

        this.scene.time.delayedCall(duration, () => {
            if (this.scene && this.body) { // Verifique se o objeto ainda existe
                const body = this.body as Phaser.Physics.Arcade.Body; // Type assertion
                body.setVelocity(0, 0); // Parar o movimento após a duração
                this.setVisible(false); // Tornar o personagem invisível ao ser puxado para dentro do rio
                this.scene.time.delayedCall(2000, () => {
                    if (this.scene) { // Verifique se o objeto ainda existe
                        this.respawn();
                    }
                });
                this.destroy(); // Destruir o personagem
            }
        });
    }

    handleWaterCollision() {
        this.setVisible(false);

        // Tocar som de caindo na água
        if (this.scene.sound.get('waterSplash')) {
            this.scene.sound.play('waterSplash');
        } else {
            console.error('O áudio "waterSplash" não foi carregado.');
        }

        this.scene.time.delayedCall(2000, () => {
            if (this.scene) { // Verifique se o objeto ainda existe
                this.respawn();
            }
        });

        this.destroy();
    }

    respawn() {
        const newCharacter = new (this.constructor as any)(this.scene, this.initialX, this.initialY, SPRITES.HORDA.BASE);
        this.scene.add.existing(newCharacter);
        this.scene.physics.add.existing(newCharacter);
        newCharacter.setPosition(this.initialX, this.initialY);
        newCharacter.setVisible(true);
    }
}
