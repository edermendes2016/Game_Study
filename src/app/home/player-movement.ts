import * as Phaser from 'phaser';

interface Keys {
    up: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
}

interface PlayerMovementConfig {
    keys: {
        up: number;
        left: number;
        down: number;
        right: number;
    };
    animations: {
        run: string;
        idle: string;
    };
    velocities: {
        x: number;
        y: number;
    };
}

export class PlayerMovement {
    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private keys: Keys;
    private animations: {
        run: string;
        idle: string;
    };
    private velocities: {
        x: number;
        y: number;
    };

    private isColliding: boolean;

    constructor(scene: Phaser.Scene, player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, config: PlayerMovementConfig) {
        this.player = player;
        this.keys = scene.input.keyboard.addKeys({
            up: config.keys.up,
            left: config.keys.left,
            down: config.keys.down,
            right: config.keys.right
        }) as Keys;
        this.animations = config.animations;
        this.velocities = config.velocities;
        this.isColliding = false;
    }

    update() {
        if (this.isColliding) {
            this.player.setVelocity(0);
            return;
        }

        this.player.setVelocity(0);

        if (this.keys.left.isDown) {
            this.player.setVelocityX(-this.velocities.x);
            this.player.setFlipX(true);
            this.player.anims.play(this.animations.run, true);
        } else if (this.keys.right.isDown) {
            this.player.setVelocityX(this.velocities.x);
            this.player.setFlipX(false);
            this.player.anims.play(this.animations.run, true);
        } else if (this.keys.up.isDown) {
            this.player.setVelocityY(-this.velocities.y);
            this.player.anims.play(this.animations.run, true); // Usa animação de corrida para cima
        } else if (this.keys.down.isDown) {
            this.player.setVelocityY(this.velocities.y);
            this.player.anims.play(this.animations.run, true); // Usa animação de corrida para baixo
        } else {
            this.player.setVelocity(0);
            if (this.player.anims.currentAnim?.key !== this.animations.idle) {
                this.player.anims.play(this.animations.idle, true);
            }
        }
    }

    stopAnimations() {
        this.player.anims.stop();
        this.player.setVelocity(0, 0);
    }

    setColliding(colliding: boolean) {
        this.isColliding = colliding;
    }
}
