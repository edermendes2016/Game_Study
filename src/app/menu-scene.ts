import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    // Carregar recursos necessários para o menu, se houver
  }

  create() {
    const playButton = this.add.text(400, 50, 'Play', { fontSize: '132px' })
      .setInteractive()
      .on('pointerdown', () => this.scene.start('GameScene'));

      const hookButton = this.add.text(400, 150, 'Hook', { fontSize: '132px' })
      .setInteractive()
      .on('pointerdown', () => this.scene.start('HookScene'));

    const demoButton = this.add.text(400, 250, 'Demo', { fontSize: '132px' })
      .setInteractive()
      .on('pointerdown', () => this.scene.start('TesteScene'));

    // const menuButton = this.add.text(400, 250, 'Menu', { fontSize: '132px' })
    //   .setInteractive()
    //   .on('pointerdown', () => console.log('Menu button clicked'));

    const quitButton = this.add.text(400, 400, 'Quit', { fontSize: '132px' })
      .setInteractive()
      .on('pointerdown', () => console.log('Quit button clicked'));

    playButton.setOrigin(0.4);
    hookButton.setOrigin(0.4);
    demoButton.setOrigin(0.4);
    quitButton.setOrigin(0.4);
  }
}
