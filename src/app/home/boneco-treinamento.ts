export const loadBonecoSprites = (scene: Phaser.Scene): void => {
    
    scene.load.spritesheet("boneco", "assets/boneco-treinamento/boneco.png", {
        frameWidth: 64,
        frameHeight: 64,
        spacing: 0
    });
};

export const createBonecoAnimation = (scene: Phaser.Scene): void => {
    scene.anims.create({
        key: 'boneco',
        frames: scene.anims.generateFrameNames('boneco', {
            start: 0,
            end: 0
        }),
        frameRate: 6                
    });

    // Criar a animação para o boneco sendo destruído
    scene.anims.create({
        key: 'boneco_destruido',
        frames: scene.anims.generateFrameNames('boneco', {
            start: 1, // Suponha que a animação de destruição comece do segundo frame
            end: 5 // Suponha que a animação de destruição termine no sexto frame
        }),
        frameRate: 15, // Ajuste conforme necessário
        repeat: 0 // Não repetir a animação
    });
}

export const createBoneco = (scene: Phaser.Scene) => {
    const boneco = scene.physics.add.sprite(200, 200, "boneco").setScale(1.2);
    boneco.anims.play("boneco", true);    

    return boneco;
}