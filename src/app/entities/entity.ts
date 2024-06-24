export interface IEntity {
    scene: Phaser.Scene
    x: number;
    y: number;
    textures?: { base: string };
    type?: string;
}


export class Entity extends Phaser.Physics.Arcade.Sprite {
    /**
     * Classe base Personagem que usa a física
     * Precisa atualizar sempre que for usar a física a classe config do game Phaser.Game
     */
    constructor(config: IEntity) {
        const { scene, x, y, textures = { base: 'default_texture' }, type } = config;
        super(scene, x, y, textures.base)

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
    }

    protected createAnimation(
        key: string,
        textureKey: string,
        start: number,
        end: number,
        anims: Phaser.Animations.AnimationManager,
        frameRate: number,
        repeat: number = -1
    ) {
        anims.create({
            key,
            frames: anims.generateFrameNumbers(textureKey, { start, end }),
            frameRate,
            repeat,
        })
    }
}


export class EntityOld extends Phaser.GameObjects.Sprite {
    /**
     * Classe base Personagem simples para nao usar fisica
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string) {
        super(scene, x, y, texture, type);

        this.scene = scene;
        this.scene.add.existing(this);
        
    }
}