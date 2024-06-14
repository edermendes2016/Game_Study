import * as Phaser from 'phaser';
import { createPersonagem, loadPersonagemSprites } from './personagem';
import { configControls, createControls } from './controls';
import { loadBulletSprites } from './bullet';
import { createInimigoAnimation, loadInimigoSprites, createInimigo } from './inimigo_slime';

export class GameScene extends Phaser.Scene{      
    water: any;
    personagem: any;
    constrols: any;

    constructor() {
        super("GameScene");        
    }

    preload() {        
        // carregar o preload antes de começar o jogo        
         this.load.image('tiles', 'assets/map/grass.png');
         this.load.image('border', 'assets/map/water.png');
         this.load.tilemapTiledJSON('map', 'assets/map/map.json');
        
        // // sprites do personagem
        loadPersonagemSprites(this); 
        loadBulletSprites(this);
        loadInimigoSprites(this);
    }

    create() {
        // Mapa
        const map = this.make.tilemap({key: "map"});
        const tileSetGrass = map.addTilesetImage("grass", "tiles");
        const tileSetWater = map.addTilesetImage("water", "border");

        const ground = map.createLayer("grass", tileSetGrass, 0 , 0);

        // // colisão com a água
        this.water = map.createLayer("water", tileSetWater, 0 , 0);
        this.water.setCollisionByProperty({ collider: true })

        
        this.personagem = createPersonagem(this); 
        
        this.physics.add.collider(this.personagem, this.water);

        // aplicar animação de respiração
        this.personagem.anims.play('player_idle', true);

        // aplicar movimentação do personagem
        this.constrols = createControls(this);

        // animação inimigo
        createInimigoAnimation(this);
        createInimigo(this);
    }    

    override update() {
       configControls(this.personagem, this.constrols, this);
    }
}
