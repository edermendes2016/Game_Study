export class Entity extends Phaser.Physics.Arcade.Sprite {
    /**
     * Classe base Personagem que usa a física
     * Precisa atualizar sempre que for usar a física a classe config do game Phaser.Game
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string) {
        super(scene, x, y, texture, type);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
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