import { SIZES, SPRITES } from "../utils/constants";
import { IEntity } from "./entity";
import { SetBaseHook } from "./setBaseHook";

export class Enemy01 extends SetBaseHook {
    /**
     *
     */

    attackCooldown: number;
    lastAttackTime: number;
    dashSpeed: number;
    dashCooldown: number;
    lastDashTime: number;

    constructor({ scene, x, y, textures }: IEntity) {
        if (!textures || !textures.base) {
            throw new Error('textures.base is required');
        }

        super({ scene, x, y, textures, type: SPRITES.BOAR.TYPE });

        this.attackCooldown = 2000; // Tempo entre ataques em milissegundos
        this.lastAttackTime = 0; // Tempo do último ataque
        this.dashSpeed = 300; // Velocidade do dash
        this.dashCooldown = 5000; // Tempo entre dashes em milissegundos
        this.lastDashTime = 0; // Tempo do último dash

        this.cycleTween();
        this.setFlipX(true);

        // Adicionar um timer para o ataque à distância
        this.scene.time.addEvent({
            delay: 1000, // Intervalo entre tentativas de ataque
            callback: this.tryRangeAttack,
            callbackScope: this,
            loop: true
        });
    }

    cycleTween() {
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

    tryRangeAttack() {
        const currentTime = this.scene.time.now;
        if (currentTime - this.lastAttackTime > this.attackCooldown) {
            this.lastAttackTime = currentTime;
            this.rangeAttack();
        }
    }

    rangeAttack() {
        // Lógica para criar e lançar um projétil
        const projectile = this.scene.physics.add.sprite(this.x, this.y, 'projectile_texture');
        const target = (this.scene as any).heroHorda; // Acessando heroHorda na cena
        if (target) {
            this.scene.physics.moveTo(projectile, target.x, target.y, 200);
        }
        projectile.setCollideWorldBounds(true);
        projectile.on('worldbounds', () => {
            projectile.destroy();
        });
    }

    dash() {
        const currentTime = this.scene.time.now;
        if (currentTime - this.lastDashTime > this.dashCooldown) {
            this.lastDashTime = currentTime;

            const target = (this.scene as any).hook; // Acessando hook na cena
            if (target) {
                const dashDirection = new Phaser.Math.Vector2(this.x - target.x, this.y - target.y).normalize();
                this.scene.physics.moveTo(this, this.x + dashDirection.x * this.dashSpeed, this.y + dashDirection.y * this.dashSpeed, this.dashSpeed);
            }
        }
    }
}

export const loadEmemy01Sprites = (scene: Phaser.Scene): void => {
    scene.load.spritesheet(SPRITES.BOAR.BASE, 'assets/enemies/boar.png', {
        frameWidth: SIZES.BOAR.WIDTH,
        frameHeight: SIZES.BOAR.HEIGHT
    });

    scene.load.image('projectile_texture', 'assets/projectiles/projectile.png');
}
