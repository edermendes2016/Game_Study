import * as Phaser from 'phaser';
import { createRobot, loadRobotSprites } from './robo';
import  elwynnJson from 'src/assets/map_att/elwynn.json';
import { HeroAlianca, loadAliancaSprites } from '../entities/aliancaPlayer';
import { LAYERS, SIZES, SPRITES, TILES } from '../utils/constants';
import { Enemy01, loadEmemy01Sprites } from '../entities/enemy01';
//Forma de importar as imagens direto do json


export class DemoScene extends Phaser.Scene{
    player: any;    
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    water!: Phaser.Tilemaps.TilemapLayer;
    robot: any;
    robotDeath!: Phaser.GameObjects.Sprite;
    alianca!: any;
    heroAlianca?: HeroAlianca;
    enemy01?: Enemy01;
   

    constructor() {
        super("DemoScene");        
    }

    preload() {       
        
        this.load.image(TILES.ELVIN_FOREST, 'assets/map_att/summer_tiles.png');
        this.load.tilemapTiledJSON('map', 'assets/map_att/elwynn.json');      
        
        loadAliancaSprites(this);
        loadEmemy01Sprites(this);
    }

    create() {              
        
        // Mapa     
        const map = this.make.tilemap({key: "map"});
        const tileset = map.addTilesetImage(elwynnJson.tilesets[0].name, TILES.ELVIN_FOREST, SIZES.TILE, SIZES.TILE);

        const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
        const wallLayer = map.createLayer(LAYERS.WALLS, tileset, 0, 0);   
       
        this.heroAlianca = new HeroAlianca(this, 400, 250, SPRITES.ALIANCA)
        this.enemy01 = new Enemy01(this, 600, 400, SPRITES.BOAR);

        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);       

        this.cameras.main.startFollow(this.heroAlianca);
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);

        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.heroAlianca.setCollideWorldBounds(true);

        this.physics.add.collider(this.heroAlianca, wallLayer);
        wallLayer.setCollisionByExclusion([-1]);
        
    }       
  
    override update() {  
       const playerMovement = this.data.get('playerMovement');
        if (playerMovement) {
            playerMovement.update();
        }

        this.heroAlianca?.update();
    }
}
