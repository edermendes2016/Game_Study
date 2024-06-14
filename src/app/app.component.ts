import { AfterViewInit, Component } from '@angular/core';
import Phaser = require('phaser');
// import { IsometricScene } from './isometric-scene';
// import { MenuScene } from './menu-scene';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  title = 'game';

  ngAfterViewInit(): void {
    // let gameConfig: Phaser.Types.Core.GameConfig = {
    //   type: Phaser.AUTO,
    //   width: 800,
    //   height: 600,
    //   parent: 'gameContainer',
    //   scene: [MenuScene, IsometricScene] // Adicionando ambas as cenas
    // };

    // let phaserGame = new Phaser.Game(gameConfig);
  }

}
