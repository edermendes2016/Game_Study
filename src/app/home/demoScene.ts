import * as Phaser from 'phaser';
import { createRobot, loadRobotSprites } from './robo';
import  durotarJson from 'src/assets/map_att/durotar.json';
import { HeroAlianca, loadHeroSprites } from '../entities/personagemWar';
import { LAYERS, SIZES, SPRITES, TILES } from '../utils/constants';
//Forma de importar as imagens direto do json


export class DemoScene extends Phaser.Scene{
    player: any;    
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    water!: Phaser.Tilemaps.TilemapLayer;
    robot: any;
    robotDeath!: Phaser.GameObjects.Sprite;
    alianca!: any;
    heroAlianca?: HeroAlianca;
   

    constructor() {
        super("DemoScene");        
    }

    preload() {       
        
        this.load.image(TILES.DUROTAR, 'assets/map_att/durotar.png');
        this.load.tilemapTiledJSON('map', 'assets/map_att/durotar.json');
        
        loadRobotSprites(this);
        
        loadHeroSprites(this);
        
       
    }

    create() {              
        
        // Mapa     
        const map = this.make.tilemap({key: "map"});
        const tileset = map.addTilesetImage(durotarJson.tilesets[0].name, TILES.DUROTAR, SIZES.TILE, SIZES.TILE);

        const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
        const wallLayer = map.createLayer(LAYERS.WALLS, tileset, 0, 0);

         //make 3 bars
        let healthBar = this.makeBar(100,10,0x2ecc71);
        this.setValue(healthBar,100);

        let powerBar = this.makeBar(100,20,0xe74c3c);
        this.setValue(powerBar,50);

        let magicBar = this.makeBar(100,30,0x2980b9);
        this.setValue(magicBar,33);
         
        //Create robot
        this.robot = createRobot(this);

        this.heroAlianca = new HeroAlianca(this, 400, 250, SPRITES.HEROALIANCA)

               
        // configure camera primeiro width / height

        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        

        // Ajustar o zoom da câmera para o tamanho da FOV
     //   const fovSize = 200; // Tamanho do campo de visão em pixels
    //    const zoomFactor = this.cameras.main.height / fovSize;
     //   this.cameras.main.setZoom(zoomFactor);

                
        
        // Adicionar colisão entre robô e jogador
        this.physics.add.collider(this.robot, this.player, () => {
            console.log("Colisão entre robô e jogador");
           // 
            // Desativar animações de idle e run do robô
            const playerMovement = this.data.get('playerMovement');
            if (playerMovement) {
                playerMovement.stopAnimations();
                this.robot.play("robot_death", true); // chamar a animação do personagem morrendo
                playerMovement.setColliding(true); // Parar o movimento do jogador
            }
            this.robot.setVelocity(0, 0);
        });

        this.cameras.main.startFollow(this.heroAlianca);
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);
              
    }    
   
    makeBar(x: any, y: any,color: any) {
        //draw the bar
        let bar = this.add.graphics().setScale(0.2);

        //color the bar
        bar.fillStyle(color, 1);

        //fill the bar with a rectangle
        bar.fillRect(0, 0, 200, 50);
        
        //position the bar
        bar.x = x;
        bar.y = y;

        //return the bar
        return bar;
    }
    setValue(bar: any,percentage: any) {
        //scale the bar
        bar.scaleX = percentage/100;
    }

    override update(delta: number) {  
       const playerMovement = this.data.get('playerMovement');
        if (playerMovement) {
            playerMovement.update();
        }

        this.heroAlianca?.update(delta);
    }
}
