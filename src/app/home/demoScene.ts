import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import * as Phaser from 'phaser';
import { createRobot, loadRobotSprites } from './robo';


export class DemoScene extends Phaser.Scene{
    player: any;    
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    water!: Phaser.Tilemaps.TilemapLayer;
    robot: any;
    robotDeath!: Phaser.GameObjects.Sprite;
   

    constructor() {
        super("DemoScene");        
    }

    preload() {       
        this.load.image('tiles', 'assets/map/grass.png');
        this.load.image('border', 'assets/map/water.png');
        this.load.tilemapTiledJSON('map', 'assets/map/map.json');

        this.load.spritesheet("newBoneco", "assets/boneco-treinamento/boneco_idle.png", {
            frameWidth: 164,
            frameHeight: 364,
            spacing: 0
        });

        loadRobotSprites(this);    
       
    }

    create() {              
        
        // Mapa     
        const map = this.make.tilemap({ key: "map" });
        const tileSetGrass = map.addTilesetImage("grass", "tiles");
        const tileSetWater = map.addTilesetImage("water", "border");

        const ground = map.createLayer("grass", tileSetGrass, 0, 0);

         // // colisão com a água
         this.water = map.createLayer("water", tileSetWater, 0, 0);
         this.water.setCollisionByProperty({ collider: true })


         //make 3 bars
        let healthBar = this.makeBar(100,10,0x2ecc71);
        this.setValue(healthBar,100);


        let powerBar = this.makeBar(100,20,0xe74c3c);
        this.setValue(powerBar,50);


        let magicBar = this.makeBar(100,30,0x2980b9);
        this.setValue(magicBar,33);
         
        //Create robot
        this.robot = createRobot(this);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers("newBoneco", {frames: [0,1,2,3]}),
            frameRate: 2,
            repeat: -1
        })

        this.player = this.add.sprite(750,55,"newBoneco").setScale(0.14);
        this.player.setFlipX(true);
        this.player.play("idle", true);
        

        //player Control
        this.physics.add.existing(this.player, false);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setAllowGravity(false);
        this.cursors = this.input.keyboard.createCursorKeys();

        
        // Definir tamanho do hitbox menor
        this.player.body.setSize(35, 280); // Largura, Altura
        this.player.body.setOffset(0, 40); // Ajuste os valores conforme necessário

        // configure camera primeiro width / height

        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        

        // Ajustar o zoom da câmera para o tamanho da FOV
        const fovSize = 200; // Tamanho do campo de visão em pixels
        const zoomFactor = this.cameras.main.height / fovSize;
        this.cameras.main.setZoom(zoomFactor);

        this.physics.add.collider(this.player, this.water);
        this.physics.add.collider(this.robot, this.water);
        
        
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

        this.cameras.main.startFollow(this.robot);
              
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

    override update() {
       this.player.body.velocity.x = 0;
       this.player.body.velocity.y = 0;

       if(this.cursors.up.isDown){
        this.player.body.velocity.y -= 450;
       } else if (this.cursors.down.isDown){
        this.player.body.velocity.y += 450;
       }

       if(this.cursors.left.isDown){
        this.player.body.velocity.x -= 450;
       } else if (this.cursors.right.isDown){
        this.player.body.velocity.x += 450;
       }

       const playerMovement = this.data.get('playerMovement');
        if (playerMovement) {
            playerMovement.update();
        }
    }
}
