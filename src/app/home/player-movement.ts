import * as Phaser from 'phaser';

interface Keys {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
}

export class PlayerMovement {
    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private keys: Keys;

    constructor(scene: Phaser.Scene, player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
        this.player = player;
        this.keys = scene.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D
        }) as Keys;
    }

    update() {
        this.player.setVelocity(0);

        if (this.keys.a.isDown) {
            this.player.setVelocityX(-160);
            this.player.setFlipX(true); 
            this.player.anims.play('rogue_run', true);
        } else if (this.keys.d.isDown) {
            this.player.setVelocityX(160);
            this.player.setFlipX(false); 
            this.player.anims.play('rogue_run', true);
        } else if (this.keys.w.isDown) {
            this.player.setVelocityY(-260);
            this.player.anims.play('rogue_run', true); // Usa animação de esquerda para cima
        } else if (this.keys.s.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play('rogue_run', true); // Usa animação de direita para baixo
        } else {
            this.player.setVelocity(0);
            if (this.player.anims.currentAnim?.key !== 'rogue_idle') {
                this.player.anims.play('rogue_idle', true);
            }
        }
    }
}
