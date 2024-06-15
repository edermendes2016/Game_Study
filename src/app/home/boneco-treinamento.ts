
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
        frameRate: 6,
        repeat: 0                      
    });

    // Criar a animação para o boneco sendo destruído
    scene.anims.create({
        key: 'boneco_destruido',
        frames: scene.anims.generateFrameNames('boneco', {
            start: 1, 
            end: 6 
        }),
        frameRate: 5, 
        repeat: 0 
    });
}

export const createBoneco = (scene: Phaser.Scene) => {    
    const boneco = scene.physics.add.sprite(500, 60, "boneco").setScale(1.0);
    boneco.anims.play("boneco", true);       
    (boneco as any).foiAtingido = false;
    return boneco;
}