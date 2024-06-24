import Phaser from "phaser";
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";
import hookJson from 'src/assets/map_att/hook.json';
import { Portal } from "../entities/portal";
import { HeroHorda, loadHordaSprites } from "../entities/hordaPlayer";
import { HookScene } from "./hook_fight";

export class GameScene extends Phaser.Scene {
  heroHorda!: HeroHorda;
  canHordaMove: boolean = true;
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Carregar recursos necessários para a cena do jogo
    this.load.image(TILES.HOOK, 'assets/map_att/summer_tiles.png');
    this.load.tilemapTiledJSON('map', 'assets/map_att/hook.json');

    loadHordaSprites(this);
    console.log("scena nova");
  }

  create() {


    // Mapa
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage(hookJson.tilesets[0].name, TILES.HOOK, SIZES.TILE, SIZES.TILE);

    const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
    const shopLayer = map.createLayer(LAYERS.SHOP, tileset, 0, 0);
    const waterLayer = map.createLayer(LAYERS.WATER, tileset, 0, 0);

    // Verificar se as camadas foram carregadas corretamente
    if (!groundLayer || !shopLayer || !waterLayer) {
      console.error('Erro ao carregar as camadas do mapa');
    }

    this.heroHorda = new HeroHorda({ scene: this, x: 200, y: 400, textures: { base: SPRITES.HORDA.BASE } });

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //  this.heroAlianca.setCollideWorldBounds(true);
    this.heroHorda.setCollideWorldBounds(true);

    //  this.physics.add.collider(this.heroAlianca, waterLayer, this.heroAlianca.handleWaterCollision.bind(this.heroAlianca), undefined, this);
    this.physics.add.collider(this.heroHorda, waterLayer);

    waterLayer.setCollisionByExclusion([-1]);

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
