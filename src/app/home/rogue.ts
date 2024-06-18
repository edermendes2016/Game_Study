export const createRogue = (scene: Phaser.Scene) => {
    const rogue = scene.physics.add.sprite(400,200, "rogue_idle").setScale(1);
    rogue.anims.play('rogue_idle');   
    
    
    return rogue;
}


export const loadRogueSprites = (scene: Phaser.Scene) : void => { 
    scene.load.spritesheet("rogue_idle", "assets/Rogue/Idle/Idle-Sheet.png", {
        frameWidth: 32,
        frameHeight: 32,     
        spacing: 3   
    });

    scene.load.spritesheet("rogue_run", "assets/Rogue/Run/Run.png", {
        frameWidth: 62,
        frameHeight: 33,
        margin: 14   
    });

}

// Criar animações
export const createRogueAnimations = (scene: Phaser.Scene): void => { 
    scene.anims.create({
        key: 'rogue_idle',
        frames: scene.anims.generateFrameNames('rogue_idle', {
            start: 0,
            end: 3
        }),
        frameRate: 3,        
        repeat: -1,
        yoyo: true
    });

    scene.anims.create({
        key: 'rogue_run',
        frames: scene.anims.generateFrameNames('rogue_run', {
            start: 2,
            end: 4
        }),
        frameRate: 9,
        
    });
   
}
