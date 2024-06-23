import * as Phaser from 'phaser';
import { HeroAlianca } from './aliancaPlayer';

interface HookScene extends Phaser.Scene {
    canHeroMove: boolean;
}

export class HookAttack {
    scene: HookScene;
    hook!: Phaser.Physics.Arcade.Sprite;
    rope!: Phaser.GameObjects.Sprite;
    isHookActive: boolean;
    heroHorda: Phaser.Physics.Arcade.Sprite;
    heroAlianca: HeroAlianca; // Use o tipo HeroAlianca

    constructor(scene: HookScene, heroHorda: Phaser.Physics.Arcade.Sprite, heroAlianca: HeroAlianca) {
        this.scene = scene;
        this.heroHorda = heroHorda;
        this.heroAlianca = heroAlianca;
        this.isHookActive = false;
    }

    fire() {
        if (this.isHookActive) return;

        this.isHookActive = true;
        this.scene.canHeroMove = false; // Impedir que o herói se mova durante o ataque

        // Posição inicial do gancho
        const hookStartX = this.heroHorda.x;
        const hookStartY = this.heroHorda.y;

        // Ajustar a posição inicial da corda
        const ropeOffsetX = -4; // Ajuste conforme necessário
        const ropeOffsetY = 0; // Ajuste conforme necessário para mover a corda para frente

        // Criar o sprite da corda com a animação
        this.rope = this.scene.add.sprite(hookStartX + ropeOffsetX, hookStartY + ropeOffsetY, 'rope').setScale(1);
        this.rope.play('ropeAnim');

        // Criar o sprite do gancho
        this.hook = this.scene.physics.add.sprite(hookStartX, hookStartY, 'att_hook').setScale(1.5);

        // Verificar se a animação existe antes de reproduzir
        if (this.hook.anims) {
            this.hook.play('hookAttack');
        } else {
            console.error('A animação "hookAttack" não foi encontrada.');
        }

        // Adicionar detecção de colisão entre o gancho e o herói Alianca
        this.scene.physics.add.overlap(this.hook, this.heroAlianca, this.onHookHit, undefined, this);

        // Definir o crescimento da corda
        this.scene.tweens.add({
            targets: this.rope,
            displayHeight: 320, // Aumente a altura final da corda conforme necessário
            duration: 1500, // Duração do crescimento da corda
            onUpdate: () => {
                // Manter a posição da base da corda constante e apenas estender para cima
                this.rope.y = hookStartY - this.rope.displayHeight / 2;
                this.hook.y = this.rope.y - this.rope.displayHeight / 2;
            },
            onComplete: () => {
                // Iniciar o retorno do gancho se não atingir o inimigo
                if (this.isHookActive) {
                    this.retractHook();
                }
            }
        });
    }

    onHookHit(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
        console.log('Hook hit enemy, pulling enemy to heroHorda');

        const heroAlianca = object1 === this.hook ? object2 : object1;

        if (heroAlianca instanceof HeroAlianca) {
            const riverY = this.heroHorda.y; // Ajuste conforme necessário para posicionar o herói no rio

            heroAlianca.bePulled(this.heroHorda.x, riverY, 1000); // Puxar o herói Alianca em direção ao herói Horda e para dentro do rio
            this.retractHook(); // Iniciar a animação de retorno do gancho
        }
    }

    retractHook() {
        // Tween para retornar a corda à posição inicial
        this.scene.tweens.add({
            targets: this.rope,
            displayHeight: 1, // Voltar a altura da corda ao valor inicial
            duration: 800, // Duração do retorno da corda
            onUpdate: () => {
                // Manter a posição da base da corda constante durante o retorno
                const hookStartY = this.heroHorda.y;
                this.rope.y = hookStartY - this.rope.displayHeight / 2;
                this.hook.y = this.rope.y - this.rope.displayHeight / 2;
            },
            onComplete: () => {
                // Remover a corda e o gancho após a animação, se necessário
                this.rope.destroy();
                this.hook.destroy();
                this.isHookActive = false; // Permitir disparar outro gancho
                this.scene.canHeroMove = true; // Permitir que o herói se mova novamente
            }
        });
    }
}

export const loadHookSprites = (scene: Phaser.Scene): void => { 
    scene.load.spritesheet('att_hook', 'assets/attack/att_hook.png', {
        frameWidth: 16,
        frameHeight: 16        
    });
    scene.load.spritesheet('rope', 'assets/attack/rope.png', {
        frameWidth: 16,
        frameHeight: 16        
    });
};
