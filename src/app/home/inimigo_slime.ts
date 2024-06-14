export const loadInimigoSprites = (scene: Phaser.Scene): void => {
    
    scene.load.spritesheet("inimigo", "assets/Inimigo.png", {
        frameWidth: 20,
        frameHeight: 17,
        spacing: 0
    });
};

export const createInimigoAnimation = (scene: Phaser.Scene): void => {
    scene.anims.create({
        key: 'inimigo',
        frames: scene.anims.generateFrameNames('inimigo', {
            start: 0,
            end: 6
        }),
        frameRate: 6,
        repeat: -1
    });
}

export const createInimigo = (scene: Phaser.Scene) => {
    const inimigo = scene.physics.add.sprite(400, 200, "inimigo").setScale(2);
    inimigo.anims.play("inimigo", true);
}