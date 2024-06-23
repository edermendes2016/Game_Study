import * as Phaser from 'phaser';
import { LAYERS, SIZES, SPRITES, TILES } from '../utils/constants';
import hookJson from 'src/assets/map_att/hook.json';
import { HeroAlianca, loadAliancaSprites } from '../entities/aliancaPlayer';
import { HeroHorda, loadHordaSprites } from '../entities/hordaPlayer';
import { createShopAlianca, createShopHorda, loadShopAliancaSprites, loadShopHordaSprites } from '../entities/shop';
import { loadHookSprites } from '../entities/attack';

export class HookScene extends Phaser.Scene{
    heroAlianca!: HeroAlianca;  
    heroHorda!: HeroAlianca;   

    constructor() {
        super("HookScene");        
    }

    preload() {       
        this.load.image(TILES.HOOK, 'assets/map_att/summer_tiles.png');
        this.load.tilemapTiledJSON('map', 'assets/map_att/hook.json');
        
        loadShopAliancaSprites(this);
        loadShopHordaSprites(this);

        loadHookSprites(this);
        this.load.spritesheet('rope', 'assets/attack/rope.png', { frameWidth: 16, frameHeight: 16 });
        
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

        this.heroAlianca = new HeroAlianca(this, 100, 50, SPRITES.ALIANCA)
        this.heroHorda = new HeroHorda(this, 100, 600, SPRITES.HORDA) 
        
        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.heroAlianca.setCollideWorldBounds(true);
        this.heroHorda.setCollideWorldBounds(true);

        this.physics.add.collider(this.heroAlianca, waterLayer);
        this.physics.add.collider(this.heroHorda, waterLayer);
        waterLayer.setCollisionByExclusion([-1]);



         // Adicionar as lojas e outros elementos
        const shopAlianca = createShopAlianca(this);
        const shopHorda = createShopHorda(this); 


        this.anims.create({
            key: 'ropeAnim',
            frames: this.anims.generateFrameNumbers('rope', { start: 0, end: 3 }), // Assumindo 4 frames de animação
            frameRate: 10,
            repeat: -1 // Loop contínuo
        });

        // Adicionar listener de teclado
        this.input.keyboard.on('keydown-SPACE', () => {
            this.attack();            
        });

        
        
    } 

    
    attack() {
        // Posição inicial do gancho
        const hookStartX = this.heroHorda.x;
        const hookStartY = this.heroHorda.y; 
       
        // Ajustar a posição inicial da corda
        const ropeOffsetX = -4; // Ajuste conforme necessário
        const ropeOffsetY = 0 ; // Ajuste conforme necessário para mover a corda para frente
    
        // Criar o sprite da corda com a animação
        const rope = this.add.sprite(hookStartX + ropeOffsetX, hookStartY + ropeOffsetY, 'rope').setScale(2);
        rope.play('ropeAnim');


        // Criar o sprite do gancho
        const hook = this.add.sprite(hookStartX, hookStartY, 'att_hook').setScale(2);
       

        // Verificar se a animação existe antes de reproduzir
        if (hook.anims) {
            hook.play('hookAttack');
        } else {
            console.error('A animação "hookAttack" não foi encontrada.');
        }
    
        // Definir o crescimento da corda
        this.tweens.add({
            targets: rope,
            displayHeight: 320, // Aumente a altura final da corda conforme necessário
            duration: 1500, // Duração do crescimento da corda
            onUpdate: () => {
                // Manter a posição da base da corda constante e apenas estender para cima
                rope.y = hookStartY - rope.displayHeight / 2;
                hook.y = rope.y - rope.displayHeight / 2;
            },
            onComplete: () => {
                // Tween para retornar a corda à posição inicial
                this.tweens.add({
                    targets: rope,
                    displayHeight: 1, // Voltar a altura da corda ao valor inicial
                    duration: 500, // Duração do retorno da corda
                    onUpdate: () => {
                        // Manter a posição da base da corda constante durante o retorno
                        rope.y = hookStartY - rope.displayHeight / 2;
                        hook.y = rope.y - rope.displayHeight / 2;
                    },
                    onComplete: () => {
                        // Remover a corda e o gancho após a animação, se necessário
                        rope.destroy();
                        hook.destroy();
                    }
                });
            }
        });


       
    
        // Adicionar lógica de ataque (colisão, dano, etc.)
    }
    
    
   
  
    override update() {        
        this.heroAlianca?.update();  
        this.heroHorda?.update();         
    }
}
