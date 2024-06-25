import Phaser from "phaser";
import { LAYERS, SIZES, SPRITES, TILEMAP_KEYS, TILES } from "../utils/constants";
import dungeon from 'src/assets/map_att/dungeon.json';
import { Portal } from "../entities/portal";
import { HeroHorda, loadHordaSprites } from "../entities/hordaPlayer";
import { HookScene } from '../scenes/hookScene'


export class GameScene extends Phaser.Scene {
  heroHorda!: HeroHorda;
  canHordaMove: boolean = true;
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Carregar recursos necessários para a cena do jogo
    this.load.image(TILES.DUNGEON, 'assets/map_att/tiles-dungeon.png');
    this.load.tilemapTiledJSON(TILEMAP_KEYS.DUNGEON, 'assets/map_att/dungeon.json');

    loadHordaSprites(this);

    this.load.spritesheet(SPRITES.PORTAL.BASE, 'assets/portal/portal.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    console.log("scena nova");
  }

  create() {

    console.log('create')
    // const map = this.make.tilemap({ key: TILEMAP_KEYS.DUNGEON })
    // const tilesetDungeon = map.addTilesetImage(dungeon.tilesets[0].name, TILES.DUNGEON, SIZES.TILE, SIZES.TILE)

    // const backgroundLayer = map.createLayer('background', tilesetDungeon!, 0, 0)
    // const wayLayer = map.createLayer('way', tilesetDungeon!, 0, 0)
    // const lavaLayer = map.createLayer('lava', tilesetDungeon!, 0, 0)

    const map = this.make.tilemap({ key: TILEMAP_KEYS.DUNGEON });
    const tileset = map.addTilesetImage(dungeon.tilesets[0].name, TILES.DUNGEON, SIZES.TILE, SIZES.TILE);

    const backgroundLayer = map.createLayer(LAYERS.DUNGEONMAP.BACKGROUND, tileset!, 0, 0);
    const wayLayer = map.createLayer(LAYERS.DUNGEONMAP.WAY, tileset!, 0, 0);
    const lavaLayer = map.createLayer(LAYERS.DUNGEONMAP.LAVA, tileset!, 0, 0);


    // Verificar se as camadas foram carregadas corretamente
    if (!backgroundLayer || !lavaLayer || !wayLayer) {
      console.error('Erro ao carregar as camadas do mapa');
    }

    this.heroHorda = new HeroHorda({ scene: this, x: 200, y: 200, textures: { base: SPRITES.HORDA.BASE } });

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
    this.heroHorda.setCollideWorldBounds(true);
    backgroundLayer.setCollisionByExclusion([-1]);
    
    this.physics.add.collider(this.heroHorda, backgroundLayer);


    const portal = new Portal({ scene: this, x: 125, y: 575, textures: { base: SPRITES.PORTAL.BASE } })
    this.physics.add.collider(this.heroHorda, portal, () => {
      this.scene.stop();
      this.scene.remove('GameScene');      
      this.scene.start('HookScene');
    });

  }

  override update() {
    if (this.canHordaMove) {
      this.heroHorda?.update();
    }
  }

}
