import * as Phaser from 'phaser';
import { LAYERS, SIZES, SPRITES, TILES } from '../utils/constants';

import  hookJson from 'src/assets/map_att/hook.json';
import { HeroAlianca, loadAliancaSprites } from '../entities/aliancaPlayer';
import { createShops, loadShopSprites } from '../entities/shop';
import { HeroHorda, loadHordaSprites } from '../entities/hordaPlayer';
import { loadBauSprites } from '../home/bau';

export class HookScene extends Phaser.Scene{
    heroAlianca!: HeroAlianca;  
    herohorda!: HeroAlianca;
    bau!: Phaser.GameObjects.Sprite;
   

    constructor() {
        super("HookScene");        
    }

    preload() {       
        this.load.image(TILES.HOOK, 'assets/map_att/summer_tiles.png');
        this.load.tilemapTiledJSON('map', 'assets/map_att/hook.json');
        loadAliancaSprites(this);
        loadHordaSprites(this);
        
               
    }

    create() {             
           
        // Mapa     
        const map = this.make.tilemap({key: "map"});
        const tileset = map.addTilesetImage(hookJson.tilesets[0].name, TILES.HOOK, SIZES.TILE, SIZES.TILE);

        const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
        const shopLayer = map.createLayer(LAYERS.SHOP, tileset, 0, 0);  
        const waterLayer = map.createLayer(LAYERS.WATER, tileset, 0, 0);

        // Adicionar as lojas e outros elementos
       // createShops(this);

        this.heroAlianca = new HeroAlianca(this, 100, 50, SPRITES.ALIANCA)
        this.herohorda = new HeroHorda(this, 100, 600, SPRITES.HORDA)       
               
        
        
    }       
  
    override update() {
        
        this.heroAlianca?.update();  
        this.herohorda?.update();  
       
    }
}
