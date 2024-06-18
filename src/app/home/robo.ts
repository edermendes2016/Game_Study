import { PlayerMovement } from "./player-movement";

export const createRobot = (scene: Phaser.Scene) => {
    const robo = scene.physics.add.sprite(300, 200, "robot_idle").setScale(0.25); // Ajuste a escala conforme necessário
    createRobotAnimations(scene);
    
    // Definir tamanho do hitbox menor
    robo.body.setSize(40, 63); // Largura, Altura
    robo.body.setOffset(0, 0); // Ajuste os valores conforme necessário

    const playerMovement = new PlayerMovement(scene, robo, config);

    // Adicionar playerMovement ao objeto de dados da cena
    scene.data.set('playerMovement', playerMovement);

    
    return robo;
}

export const loadRobotSprites = (scene: Phaser.Scene) => {
    scene.load.spritesheet("robot_idle", "assets/robot/idle.png", {
        frameWidth: 180,
        frameHeight: 180
    });

    scene.load.spritesheet("robot_run", "assets/robot/run.png", {
        frameWidth: 180,
        frameHeight: 180
    });

    scene.load.spritesheet("robot_death", "assets/robot/death.png", {
        frameWidth: 180,
        frameHeight: 180
    });
}

function createRobotAnimations(scene: Phaser.Scene, robo?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    const idle = {
        key: 'robot_idle',
        frames: scene.anims.generateFrameNumbers('robot_idle', {
            start: 0,
            end: 9
        }),
        frameRate: 8,
        repeat: -1,
        yoyo: true
    };

    const run = {
        key: 'robot_run',
        frames: scene.anims.generateFrameNumbers('robot_run', {
            start: 0,
            end: 7
        }),
        frameRate: 16        
    };

    const death = {
        key: 'robot_death',
        frames: scene.anims.generateFrameNumbers('robot_death', {
            start: 0,
            end: 9
        }),
        frameRate: 12                       
    };

    scene.anims.create(idle);
    scene.anims.create(run);
    scene.anims.create(death);   
    
}

const config = {
    keys: {
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D
    },
    animations: {
        run: 'robot_run',
        idle: 'robot_idle'
    },
    velocities: {
        x: 160,
        y: 260
    }
};
