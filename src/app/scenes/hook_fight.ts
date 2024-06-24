import * as Phaser from 'phaser';
import { LAYERS, SIZES, SPRITES, TILES } from '../utils/constants';
import hookJson from 'src/assets/map_att/hook.json';
import { HeroAlianca, loadAliancaSprites } from '../entities/aliancaPlayer';
import { HeroHorda, loadHordaSprites } from '../entities/hordaPlayer';
import { createShopAlianca, createShopHorda, loadShopAliancaSprites, loadShopHordaSprites } from '../entities/shop';

import { HookAttack, createAnimationsHook, loadHookSprites } from '../entities/hookAttack';

export class HookScene extends Phaser.Scene {
    heroAlianca!: HeroAlianca;
    heroHorda!: HeroHorda;
    hook!: HookAttack;
    canHeroMove: boolean = true; // Controle do movimento do herói
    canHordaMove: boolean = true;
    waterSplash: Phaser.Sound.BaseSound | undefined;

    constructor() {
        super("HookScene");
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

        
        
    }

    create() {
        // Mapa
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage(hookJson.tilesets[0].name, TILES.HOOK, SIZES.TILE, SIZES.TILE);

        const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
        const shopLayer = map.createLayer(LAYERS.SHOP, tileset, 0, 0);
        const waterLayer = map.createLayer(LAYERS.WATER, tileset, 0, 0);

        this.heroAlianca = new HeroAlianca(this, 100, 50, SPRITES.ALIANCA);
        this.heroHorda = new HeroHorda(this, 100, 600, SPRITES.HORDA);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.heroAlianca.setCollideWorldBounds(true);
        this.heroHorda.setCollideWorldBounds(true);

        this.physics.add.collider(this.heroAlianca, waterLayer, this.onWaterCollision, undefined, this);
        this.physics.add.collider(this.heroHorda, waterLayer);
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

        this.hook = new HookAttack(this, this.heroHorda, this.heroAlianca);

        // Adicionar listener de teclado
        this.input.keyboard.on('keydown-SPACE', () => {
            if (!this.hook.isHookActive) {
                this.hook.fire();
            }
        });
    }

    onWaterCollision(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
        const heroAlianca = object1 as HeroAlianca;
        heroAlianca.handleWaterCollision();
    }

    override update() {
        if (this.canHeroMove) {
            this.heroAlianca?.update();
        }
        if (this.canHordaMove) {
            this.heroHorda?.update();
        }
    }
}
