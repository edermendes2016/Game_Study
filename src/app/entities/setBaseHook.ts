import { SPRITES } from "../utils/constants";
import { Entity, IEntity } from "./entity";

export class SetBaseHook extends Entity {
    initialX: number;
    initialY: number;
    moveSpeed: number;
    attackCooldown: number;
    lastAttackTime: number;
    dashSpeed: number;
    dashCooldown: number;
    lastDashTime: number;
    attackEvent: Phaser.Time.TimerEvent;
    cycleTween?: Phaser.Tweens.Tween;
    

    constructor({ scene, x, y, textures }: IEntity) {
        super({ scene, x, y, textures, type: SPRITES.PLAYER.TYPE });
        this.initialX = x;
        this.initialY = y;
        this.moveSpeed = 60;
        this.attackCooldown = 2000; // Tempo entre ataques em milissegundos
        this.lastAttackTime = 0; // Tempo do último ataque
        this.dashSpeed = 300; // Velocidade do dash
        this.dashCooldown = 5000; // Tempo entre dashes em milissegundos
        this.lastDashTime = 0; // Tempo do último dash
        
        // Adicionar um timer para o ataque à distância
        this.attackEvent = scene.time.addEvent({
            delay: 1000, // Intervalo entre tentativas de ataque
            callback: this.tryRangeAttack,
            callbackScope: this, // Garantir que o callback tenha o escopo correto
            loop: true
        });

        // Configurações adicionais se necessário
        this.setSize(28, 32);
        this.setOffset(10, 16);
        this.setScale(0.8);
    }

    bePulled(targetX: number, targetY: number, duration: number) {
       // this.play('pulled', true); se houver uma animação colocar aqui
        this.scene.physics.moveToObject(this, { x: targetX, y: targetY }, 300);

        this.scene.time.delayedCall(duration, () => {
            if (this.scene && this.body) { // Verifique se o objeto ainda existe
                const body = this.body as Phaser.Physics.Arcade.Body; // Type assertion
                body.setVelocity(0, 0); // Parar o movimento após a duração
                this.setVisible(false); // Tornar o personagem invisível ao ser puxado para dentro do rio
                
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

        this.destroy();
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
            this.scene.physics.moveTo(projectile, target.x, target.y, 600);
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

    override destroy() {
        if (this.attackEvent) {
            this.attackEvent.remove(); // Remover o evento de ataque
        }
        super.destroy();
    }

    respawn() {
        const newCharacter = new (this.constructor as any)(this.scene, this.initialX, this.initialY, SPRITES.HORDA.BASE);
        this.scene.add.existing(newCharacter);
        this.scene.physics.add.existing(newCharacter);
        newCharacter.setPosition(this.initialX, this.initialY);
        newCharacter.setVisible(true);
    }

    createCycleTween() {
        return this.scene.tweens.add({
            targets: this,
            duration: 2000,
            repeat: -1,
            yoyo: true,
            x: this.x + 100,
            onRepeat: () => {
                this.setFlipX(true);
            },
            onYoyo: () => {
                this.setFlipX(false);
            }
        });
    } 

    stopCycleTween() {
        if (this.cycleTween) {
            this.cycleTween.stop();
            this.cycleTween = undefined;
        }
    }
}
