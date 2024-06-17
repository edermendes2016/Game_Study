import * as Phaser from 'phaser';


export class DemoScene extends Phaser.Scene{    
   

    constructor() {
        super("DemoScene");        
    }

    preload() {        
        // carregar o preload antes de começar o jogo        
         
        // // sprites do personagem
       
    }

    create() {
        const quitButton = this.add.text(730, 60, 'Quit', { fontSize: '32px' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('MenuScene'));

        quitButton.setOrigin(0.5);

        

        
    }    

    override update() {
       
    }
}
