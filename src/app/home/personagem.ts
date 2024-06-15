export interface Personagem extends Phaser.Physics.Arcade.Sprite {
    isAttacking?: boolean;
}



export const createPersonagem = (scene: Phaser.Scene) => {
    const personagem = scene.physics.add.sprite(300,200, "player_idle");
    createAnimations(scene, personagem);
    return personagem;
}


// exportar sprites do personagem
export const loadPersonagemSprites = (scene: Phaser.Scene) : void => {
    // Parado
    scene.load.spritesheet("player_idle", "assets/personagem/idle.png", {
        frameWidth: 83,
        frameHeight: 64,
        spacing: 45
    });

    // Andar Direita
    scene.load.spritesheet("player_walk_r", "assets/personagem/walk_right.png", {
        frameWidth: 83,
        frameHeight: 64,
        spacing: 45
    });

    // Andar Esquerda
    scene.load.spritesheet("player_walk_l", "assets/personagem/walk_left.png", {
        frameWidth: 83,
        frameHeight: 64,
        spacing: 45
    });
    // Attack
    scene.load.spritesheet("player_attack", "assets/personagem/attack.png", {
        frameWidth: 83,
        frameHeight: 64,
        spacing: 45
    });
}

// Criar animações
export const createAnimations = (scene: Phaser.Scene, personagem: Personagem): void => {

    scene.anims.create({
        key: 'player_idle',
        frames: scene.anims.generateFrameNames('player_idle', {
            start: 0,
            end: 6
        }),
        frameRate: 6,
        repeat: -1,
        yoyo: true
    });

    scene.anims.create({
        key: 'player_walk_r',
        frames: scene.anims.generateFrameNames('player_walk_r', {
            start: 0,
            end: 6
        }),
        frameRate: 8,
        repeat: -1
    });

    scene.anims.create({
        key: 'player_walk_l',
        frames: scene.anims.generateFrameNames('player_walk_l', {
            start: 0,
            end: 6
        }),
        frameRate: 8,
        repeat: -1
    });

    scene.anims.create({
        key: 'player_attack',
        frames: scene.anims.generateFrameNames('player_attack', {
            start: 0,
            end: 3
        }),
        frameRate: 12,
        repeat: 0
    });

    personagem.on(
        "animationcomplete",
        function (animation: any, frame: any) {
          if (animation.key === "player_attack") {
            personagem.isAttacking = false;
          }
        },
        scene
      );
}