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
    });
}

export const createBoneco = (scene: Phaser.Scene) => {
    const boneco = scene.physics.add.sprite(100, 200, "boneco").setScale(1.2);
    boneco.anims.play("boneco", true);    

    return boneco;
}