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
    
  }

}
