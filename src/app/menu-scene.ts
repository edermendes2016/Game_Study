// import Phaser = require("phaser");

// export class MenuScene extends Phaser.Scene {
//   constructor() {
//     super({ key: 'MenuScene' });
//   }

//   preload() {
//     // Carregar recursos necessários para o menu, se houver
//   }

//   create() {
//     const playButton = this.add.text(400, 100, 'Play', { fontSize: '132px' })
//       .setInteractive()
//       .on('pointerdown', () => this.scene.start('IsometricScene'));

//     const menuButton = this.add.text(400, 250, 'Menu', { fontSize: '132px' })
//       .setInteractive()
//       .on('pointerdown', () => console.log('Menu button clicked'));

//     const quitButton = this.add.text(400, 400, 'Quit', { fontSize: '132px' })
//       .setInteractive()
//       .on('pointerdown', () => console.log('Quit button clicked'));

//     playButton.setOrigin(0.5);
//     menuButton.setOrigin(0.5);
//     quitButton.setOrigin(0.5);
//   }
// }
