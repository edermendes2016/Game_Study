export class Entity extends Phaser.GameObjects.Sprite {
    /**
     * Classe base Personagem
     */
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string) {
        super(scene, x, y, texture, type);

        this.scene = scene;
        this.scene.add.existing(this);
        
    }
}