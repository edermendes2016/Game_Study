import * as Phaser from 'phaser';
import { HeroHorda } from './hordaPlayer';
import { SetBaseHook } from './setBaseHook';

interface HookScene extends Phaser.Scene {
    canHeroMove: boolean;
    canHordaMove: boolean;
}

export class HookAttack {
    scene: HookScene;
    hook!: Phaser.Physics.Arcade.Sprite;
    rope!: Phaser.GameObjects.Sprite;
    isHookActive: boolean;
    heroHorda: HeroHorda;
    enemies: Phaser.Physics.Arcade.Group;

    constructor(scene: HookScene, heroHorda: HeroHorda, enemies: Phaser.Physics.Arcade.Group) {
        this.scene = scene;
        this.heroHorda = heroHorda;
        this.enemies = enemies;
        this.isHookActive = false;
    }

    fire() {
        if (this.isHookActive) return;

        this.isHookActive = true;
        this.scene.canHeroMove = false; // Impedir que o herói se mova durante o ataque
        this.scene.canHordaMove = false; // Impedir que o personagem Horda se mova durante o ataque

        // Resetar a velocidade do personagem Horda
        this.heroHorda.setVelocity(0, 0);

        // Chamar a animação de hook up
        this.heroHorda.play('horda_up', true);

        // Posição inicial do gancho
        const hookStartX = this.heroHorda.x + 13;
        const hookStartY = this.heroHorda.y - 7;

        // Criar o sprite da corda com a animação
        this.rope = this.scene.add.sprite(hookStartX, hookStartY, 'rope').setScale(0.2);
        this.rope.play('ropeAnim');

        // Criar o sprite do gancho
        this.hook = this.scene.physics.add.sprite(hookStartX, hookStartY, 'att_hook').setScale(0.7);

        // Verificar se a animação existe antes de reproduzir
        if (this.hook.anims) {
            this.hook.play('att_hook_anim');
        } else {
            console.error('A animação "hookAttack" não foi encontrada.');
        }

        // Adicionar detecção de colisão entre o gancho e os inimigos
        this.scene.physics.add.overlap(this.hook, this.enemies, this.onHookHit, undefined, this);

        // Definir o crescimento da corda
        this.scene.tweens.add({
            targets: this.rope,
            displayHeight: 300, // Aumente a altura final da corda conforme necessário
            duration: 1000, // Duração do crescimento da corda
            onUpdate: () => {
                // Manter a posição da base da corda constante e apenas estender para cima
                this.rope.y = hookStartY - this.rope.displayHeight / 2;
                this.hook.y = this.rope.y - this.rope.displayHeight / 2 - 8; // Ajuste conforme necessário para manter o gancho alinhado
            },
            onComplete: () => {
                // Iniciar o retorno do gancho se não atingir o inimigo
                if (this.isHookActive) {
                    this.retractHook();
                }
            }
        });
    }

    onHookHit(hook: Phaser.GameObjects.GameObject, enemy: Phaser.GameObjects.GameObject) {
        console.log('Hook hit enemy, pulling enemy to heroHorda');

        if (enemy instanceof SetBaseHook) {
            const riverY = this.heroHorda.y; // Ajuste conforme necessário para posicionar o herói no rio

            enemy.bePulled(this.heroHorda.x, riverY, 1000); // Puxar o inimigo em direção ao herói Horda e para dentro do rio

            this.retractHook(); // Iniciar a animação de retorno do gancho
        }
    }

    retractHook() {
        // Tween para retornar a corda à posição inicial
        this.scene.tweens.add({
            targets: this.rope,
            displayHeight: 1, // Voltar a altura da corda ao valor inicial
            duration: 700, // Duração do retorno da corda
            onUpdate: () => {
                // Manter a posição da base da corda constante durante o retorno
                const hookStartY = this.heroHorda.y - 7;
                this.rope.y = hookStartY - this.rope.displayHeight / 2;
                this.hook.y = this.rope.y - this.rope.displayHeight / 2;
            },
            onComplete: () => {
                // Remover a corda e o gancho após a animação, se necessário
                this.rope.destroy();
                this.hook.destroy();
                this.isHookActive = false; // Permitir disparar outro gancho
                this.scene.canHeroMove = true; // Permitir que o herói se mova novamente
                this.scene.canHordaMove = true; // Permitir que o personagem Horda se mova novamente
            }
        });
    }
}

export const loadHookSprites = (scene: Phaser.Scene): void => {
    scene.load.spritesheet('att_hook', 'assets/attack/att_hook.png', {
        frameWidth: 32,
        frameHeight: 32
    });
    scene.load.spritesheet('rope', 'assets/attack/rope.png', {
        frameWidth: 32,
        frameHeight: 32,
        endFrame: 15
    });    
};

// No método create da sua cena:
export const createAnimationsHook = (scene: Phaser.Scene): void => {
    // Animação do ataque com o gancho
    scene.anims.create({
        key: 'att_hook_anim',
        frames: scene.anims.generateFrameNumbers('att_hook', { start: 0, end: 5 }), // ajuste os frames conforme necessário
        frameRate: 10,
    });
};
