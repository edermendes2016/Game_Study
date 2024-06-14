import * as Phaser from 'phaser';

interface Keys {    
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
}

export class PlayerMovement {
    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private keys: Keys;

    constructor(scene: Phaser.Scene, player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
        this.player = player;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.keys = scene.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D
        }) as Keys;
    }

    update() {
        this.player.setVelocity(0);

        if ((this.cursors.left.isDown || this.keys.a.isDown) && !this.cursors.right.isDown && !this.keys.d.isDown) {
            this.player.setVelocityX(-160); // Movimentação do DUDE
            this.player.anims.play('left', true); // Animação do DUDE
        } else if ((this.cursors.right.isDown || this.keys.d.isDown) && !this.cursors.left.isDown && !this.keys.a.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else if ((this.cursors.up.isDown || this.keys.w.isDown) && !this.cursors.down.isDown && !this.keys.s.isDown) {
            this.player.setVelocityY(-160); // Movimentação para cima
            this.player.anims.play('left', true); // Usa animação de esquerda para cima
        } else if ((this.cursors.down.isDown || this.keys.s.isDown) && !this.cursors.up.isDown && !this.keys.w.isDown) {
            this.player.setVelocityY(160); // Movimentação para baixo
            this.player.anims.play('right', true); // Usa animação de direita para baixo
        } else {
            this.player.setVelocity(0);
            this.player.anims.play('turn');
        }
    }
}
