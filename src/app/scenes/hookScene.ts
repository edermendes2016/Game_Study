import * as Phaser from 'phaser';
import { LAYERS, SIZES, SPRITES, TILES } from '../utils/constants';
import hookJson from 'src/assets/map_att/hook.json';
import { HeroAlianca, loadAliancaSprites } from '../entities/aliancaPlayer';
import { HeroHorda, loadHordaSprites } from '../entities/hordaPlayer';
import { createShopAlianca, createShopHorda, loadShopAliancaSprites, loadShopHordaSprites } from '../entities/shop';
import { HookAttack, createAnimationsHook, loadHookSprites } from '../entities/hookAttack';
import { Enemy01, loadEmemy01Sprites } from '../entities/enemy01';
import { SetBaseHook } from '../entities/setBaseHook';
import { Portal } from '../entities/portal';
import { GameScene } from './gameScene';

export class HookScene extends Phaser.Scene {
  //  heroAlianca!: HeroAlianca;
    heroHorda!: HeroHorda;
    hook!: HookAttack;
    canHeroMove: boolean = true; // Controle do movimento do herói
    canHordaMove: boolean = true;
    waterSplash: Phaser.Sound.BaseSound | undefined;
    enemies!: Phaser.Physics.Arcade.Group;
    enemiesDestroyed: number;

    constructor() {
        super("HookScene");

        this.enemiesDestroyed = 0;
    }

    preload() {
        this.load.image(TILES.HOOK, 'assets/map_att/summer_tiles.png');
        this.load.tilemapTiledJSON('map', 'assets/map_att/hook.json');    

        loadShopAliancaSprites(this);
        loadShopHordaSprites(this);

        this.load.audio('waterSplash', ['assets/sounds/splash.mp3']);
        loadHookSprites(this);  

        loadAliancaSprites(this);
        loadHordaSprites(this);

        loadEmemy01Sprites(this);

        this.load.spritesheet(SPRITES.PORTAL.BASE, 'assets/portal/portal.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
       
    }

    create() {
        // Mapa
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage(hookJson.tilesets[0].name, TILES.HOOK, SIZES.TILE, SIZES.TILE);

        const groundLayer = map.createLayer(LAYERS.HOOKMAP.GROUND, tileset, 0, 0);
        const shopLayer = map.createLayer(LAYERS.HOOKMAP.SHOP, tileset, 0, 0);
        const waterLayer = map.createLayer(LAYERS.HOOKMAP.WATER, tileset, 0, 0);

       // this.heroAlianca = new HeroAlianca(this, 100, 50, SPRITES.ALIANCA);
        this.heroHorda = new HeroHorda({scene: this, x:200, y:400, textures: { base: SPRITES.HORDA.BASE }});

        // Criação do grupo de inimigos
        this.enemies = this.physics.add.group({
            classType: Enemy01,
            runChildUpdate: true
        });

        // Adicionar alguns inimigos
        this.enemies.add(new Enemy01({scene: this, x:100, y:100, textures: { base: SPRITES.BOAR.BASE }}));
        this.enemies.add(new Enemy01({scene: this, x:200, y:100, textures: { base: SPRITES.BOAR.BASE }}));
        this.enemies.add(new Enemy01({scene: this, x:300, y:100, textures: { base: SPRITES.BOAR.BASE }}));
        // this.enemies.add(this.heroAlianca);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        //  this.heroAlianca.setCollideWorldBounds(true);
        this.heroHorda.setCollideWorldBounds(true);

        //  this.physics.add.collider(this.heroAlianca, waterLayer, this.heroAlianca.handleWaterCollision.bind(this.heroAlianca), undefined, this);
        this.physics.add.collider(this.heroHorda, waterLayer);
        this.physics.add.collider(this.enemies, waterLayer, (enemy: Phaser.GameObjects.GameObject) => {
            (enemy as SetBaseHook).handleWaterCollision();
        });

        waterLayer.setCollisionByExclusion([-1]);

        // Adicionar as lojas e outros elementos
        const shopAlianca = createShopAlianca(this);
        const shopHorda = createShopHorda(this);

        this.waterSplash = this.sound.add("waterSplash");

        createAnimationsHook(this);

        this.anims.create({
            key: 'ropeAnim',
            frames: this.anims.generateFrameNumbers('rope', { start: 0, end: 15 }),
            frameRate: 10
        });

        // Adicionar o HookAttack, agora verificando a colisão com o grupo de inimigos
        this.hook = new HookAttack(this, this.heroHorda, this.enemies);

        // Adicionar listener de teclado
        this.input.keyboard.on('keydown-SPACE', () => {
            if (!this.hook.isHookActive) {
                this.hook.fire();
            }
        });

        // Adicionar evento para quando um inimigo for destruído
        this.enemies.children.each((enemy) => {
            enemy.on('destroy', () => {
                this.enemiesDestroyed++;
                if (this.enemiesDestroyed >= 3) {               
                 const portal = new Portal({ scene: this, x: 210, y: 505, textures: { base: SPRITES.PORTAL.BASE }})
                    this.physics.add.collider(this.heroHorda, portal, () => {
                        this.scene.stop();                        
                        this.scene.add('GameScene', GameScene, true);
                    });
                   console.log('Proxima Scene')
                   this.enemiesDestroyed = 0;
                }
            });
        });        
    }

    override update() {
        // if (this.canHeroMove) {
        //    // this.heroAlianca?.update();
        // }
        
        if (this.canHordaMove) {
            this.heroHorda?.update();
        }
    }
}
