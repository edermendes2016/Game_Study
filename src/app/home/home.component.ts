import { PlatformLocation } from '@angular/common';
import { Component, OnDestroy, OnInit, PlatformRef } from '@angular/core';
import * as Phaser from 'phaser';
import { GameScene } from './game';
import { MenuScene } from '../menu-scene';
import { DemoScene } from './demoScene';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  config: Phaser.Types.Core.GameConfig;
  game!: Phaser.Game;

  constructor() { 
    this.config = {      
      type: Phaser.AUTO,
      width: 800,
      height: 640,
      parent: 'gameHomeContainer',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      physics: { default: "arcade", arcade: { debug: false, gravity: { y: 0 } } },
      // scene: [MenuScene, GameScene, DemoScene],
      scene: [DemoScene],
      pixelArt: true
    }
  }
  ngOnDestroy() {
    this.game.destroy(true, false);
  }

  ngOnInit() {
    this.game = new Phaser.Game(this.config);
  } 
  
}
