// import { MenuScene } from './menu-scene';
// import * as Phaser from 'phaser';

// export class IsometricScene extends Phaser.Scene {
//   private score: number = 0;
//   private scoreText!: Phaser.GameObjects.Text;

//   constructor() {
//     super({ key: 'IsometricScene' });
//   }

//   preload() {
//     this.load.image('house', 'assets/house.png');
//     this.load.image('bat', 'assets/bat.png'); // Imagem do morcego
//   }

//   create() {

//     const quitButton = this.add.text(730, 20, 'Quit', { fontSize: '32px' })
//       .setInteractive()
//       .on('pointerdown', () => this.scene.start('MenuScene'));
    
//     quitButton.setOrigin(0.5);

//     // Inicializa o score
//     this.score = 0;

//     // Adiciona o texto do score à cena
//     this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '24px' });

//     // Adicionando a imagem da casa
//     this.add.image(150, 250, 'house');

//     // Adicionando morcegos aleatórios
//     this.time.addEvent({
//       delay: 1000, // Intervalo entre a criação de cada morcego (em milissegundos)
//       loop: true,
//       callback: () => {
//         const x = Phaser.Math.Between(0, +this.game.config.width);
//         const y = Phaser.Math.Between(0, +this.game.config.height);
//         const bat = this.add.image(x, y, 'bat');
//         bat.setInteractive();
//         bat.setScale(0.3); // Redimensionar o morcego ao tamanho original
//         bat.on('pointerdown', () => {
//           // Incrementa o score
//           this.score += 10;
//           this.scoreText.setText(`Score: ${this.score}`);

//           // Cria uma animação de estouro
//           this.tweens.add({
//             targets: bat,
//             scaleX: 2,
//             scaleY: 2,
//             alpha: 0,
//             duration: 500,
//             onComplete: () => {
//               bat.destroy(); // Remover o morcego após a animação
//             }
//           });
//         });
//       }
//     });
//   }

//   public static readonly sceneConfig: Phaser.Types.Core.GameConfig = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     parent: 'gameContainer',
//     scene: [MenuScene, IsometricScene] // Certifique-se de que ambas as cenas estão aqui
//   };
// }
