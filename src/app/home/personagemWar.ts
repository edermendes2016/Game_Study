

export const createAlianca = (scene: Phaser.Scene)  => {
    const alianca = scene.physics.add.sprite(300, 300, "alianca_down").setScale(2); // Ajuste a escala conforme necessário
    createAliancaAnimations(scene);
    
   
    return alianca;
}

export const loadAliancaSprites = (scene: Phaser.Scene) => {
    scene.load.spritesheet("alianca_down", "assets/boneco-treinamento/alianca.png", {
        frameWidth: 22,
        frameHeight: 24
    });

    scene.load.spritesheet("alianca_left", "assets/boneco-treinamento/alianca.png", {
        frameWidth: 22,
        frameHeight: 24
    });

    scene.load.spritesheet("alianca_right", "assets/boneco-treinamento/alianca.png", {
        frameWidth: 22,
        frameHeight: 24
    });

    scene.load.spritesheet("alianca_up", "assets/boneco-treinamento/alianca.png", {
        frameWidth: 22,
        frameHeight: 24
    });
}

function createAliancaAnimations(scene: Phaser.Scene) {
    const down = {
        key: 'alianca_down',
        frames: scene.anims.generateFrameNumbers('alianca_down', {frames:[0,1,2]}),
        frameRate: 5,
        repeat: -1,
        yoyo: true       
    };

    const left = {
        key: 'alianca_left',
        frames: scene.anims.generateFrameNumbers('alianca_left', {frames:[3,4,5]}),
        frameRate: 5, 
        repeat: -1,
        yoyo: true        
    };

    const right = {
        key: 'alianca_right',
        frames: scene.anims.generateFrameNumbers('alianca_right', {frames:[6,7,8]}),
        frameRate: 5, 
        repeat: -1,
        yoyo: true                       
    };

    const up = {
        key: 'alianca_up',
        frames: scene.anims.generateFrameNumbers('alianca_up', {frames:[9,10,11]}),
        frameRate: 5, 
        repeat: -1,
        yoyo: true                       
    };

    scene.anims.create(down);    
    scene.anims.create(left);   
    scene.anims.create(right); 
    scene.anims.create(up);  


    
}

