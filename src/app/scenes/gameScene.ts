import Phaser from "phaser";
import { LAYERS, SIZES, SPRITES, TILEMAP_KEYS, TILES } from "../utils/constants";
import dungeon from 'src/assets/map_att/dungeon.json';
import { HeroHorda, loadHordaSprites } from "../entities/hordaPlayer";
import { ObjectEntity } from "../entities/objectsEntity";


export class GameScene extends Phaser.Scene {
  heroHorda!: HeroHorda;
  canHordaMove: boolean = true;
  map!: Phaser.Tilemaps.Tilemap;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image(TILES.DUNGEON, 'assets/map_att/tiles-dungeon.png');
    this.load.tilemapTiledJSON(TILEMAP_KEYS.DUNGEON, 'assets/map_att/dungeon.json');
    loadHordaSprites(this);    
    console.log("scena nova");
  }

  create() {
    console.log('create mapa'); 
    this.map = this.make.tilemap({ key: TILEMAP_KEYS.DUNGEON });
    const tileset = this.map.addTilesetImage(dungeon.tilesets[0].name, TILES.DUNGEON, SIZES.TILE, SIZES.TILE);
    const backgroundLayer = this.map.createLayer(LAYERS.DUNGEONMAP.BACKGROUND, tileset!, 0, 0);
    const wayLayer = this.map.createLayer(LAYERS.DUNGEONMAP.WAY, tileset!, 0, 0);
    const lavaLayer = this.map.createLayer(LAYERS.DUNGEONMAP.LAVA, tileset!, 0, 0);
    const objectLayer = this.map.getObjectLayer('Objects');

    if (!backgroundLayer || !lavaLayer || !wayLayer) {
      console.error('Erro ao carregar as camadas do mapa');
    }

    this.heroHorda = new HeroHorda({ scene: this, x: 200, y: 200, textures: { base: SPRITES.HORDA.BASE } });
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.heroHorda.setCollideWorldBounds(true);
    backgroundLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.heroHorda, backgroundLayer);

    objectLayer.objects.forEach((objectData) => {
      const objectEntity = <ObjectEntity>objectData;      
      if (objectEntity.name === 'Exit') {
        const exitCove = this.add.rectangle(objectEntity.x, objectEntity.y, objectEntity.width, objectEntity.height);

        if(exitCove){
          this.physics.add.existing(exitCove, true);       
          this.physics.add.overlap(this.heroHorda, exitCove, () => {
            console.log("saiu da caverna");
            this.scene.stop();
            this.scene.remove('GameScene');      
            this.scene.start('HookScene');
          });
        }
        
      }
    });

    
  }

  override update() {
    if (this.canHordaMove) {
      this.heroHorda?.update();
    }
  }
}
