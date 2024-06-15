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
    const inimigo = scene.physics.add.sprite(50, 400, "inimigo").setScale(2);
    inimigo.anims.play("inimigo", true);

    scene.tweens.add({
        targets: inimigo,
        x: 750, // Ponto final do movimento
        duration: 1000, // Duração do movimento em milissegundos
        ease: 'Linear', // Tipo de easing
        yoyo: true, // Retornar ao ponto inicial
        repeat: -1, // Repetir infinitamente
        onYoyo: () => { inimigo.flipX = !inimigo.flipX; }, // Inverte flipX ao voltar
        onRepeat: () => { inimigo.flipX = !inimigo.flipX; } // Inverte flipX ao repetir
    });

    return inimigo;
}