import * as Phaser from 'phaser';
import { createPersonagem, loadPersonagemSprites } from './personagem';
import { configControls, createControls } from './controls';
import { loadBulletSprites } from './bullet';
import { createInimigoAnimation, loadInimigoSprites, createInimigo } from './inimigo_slime';
import { createBoneco, createBonecoAnimation, loadBonecoSprites } from './boneco-treinamento';
import { createSkeleton, createSkeletonAnimations, loadSkeletonSprites } from './skeleton';
import { createRogue, createRogueAnimations, loadRogueSprites } from './rogue';
import { PlayerMovement } from './player-movement';
import { createBau, createBauAnimations, loadBauSprites } from './bau';
import { createRobot, loadRobotSprites } from './robo';

export class GameScene extends Phaser.Scene {
    water: any;
    personagem: any;
    controls: any;
    controlsRogue: any;
    boneco: any;
    skeleton: any;
    bau: any;
    rogue!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    FOVGraphics!: Phaser.GameObjects.Graphics;
    robot!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

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
        loadBonecoSprites(this);
        loadSkeletonSprites(this);
        loadRogueSprites(this);
        loadBauSprites(this);

        
        loadRobotSprites(this);
    }

    create() {
        // Mapa
        const map = this.make.tilemap({ key: "map" });
        const tileSetGrass = map.addTilesetImage("grass", "tiles");
        const tileSetWater = map.addTilesetImage("water", "border");

        const ground = map.createLayer("grass", tileSetGrass, 0, 0);

        const quitButton = this.add.text(730, 60, 'Quit', { fontSize: '32px' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('MenuScene'));

                   //make 3 bars
          let healthBar = this.makeBar(100,10,0x2ecc71);
          this.setValue(healthBar,100);
  
          let powerBar = this.makeBar(100,20,0xe74c3c);
          this.setValue(powerBar,50);
  
          let magicBar = this.makeBar(100,30,0x2980b9);
          this.setValue(magicBar,33);
          

        quitButton.setOrigin(0.5);

        // // colisão com a água
        this.water = map.createLayer("water", tileSetWater, 0, 0);
        this.water.setCollisionByProperty({ collider: true })


        this.personagem = createPersonagem(this);

        this.physics.add.collider(this.personagem, this.water);

        // aplicar movimentação do personagem
        this.controls = createControls(this);

        // Animação e criação do inimigo
        createInimigoAnimation(this);
        createInimigo(this);

        // Animação e criação do boneco
        createBonecoAnimation(this);
        this.boneco = createBoneco(this);

        // Animação e criação do esqueleto
        createSkeletonAnimations(this);
        const skeleton = createSkeleton(this);

        createRogueAnimations(this);
        this.rogue = createRogue(this);

        const config = {
            keys: {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                right: Phaser.Input.Keyboard.KeyCodes.D
            },
            animations: {
                run: 'rogue_run',
                idle: 'rogue_idle'
            },
            velocities: {
                x: 160,
                y: 260
            }
        };

        this.controlsRogue = new PlayerMovement(this, this.rogue, config);

        //Create robot
        this.robot = createRobot(this);

        // Criar baú
        createBauAnimations(this);
        this.bau = createBau(this);

        // Adicionar colisão entre personagem e boneco
        this.physics.add.collider(this.personagem, this.boneco, () => {
            console.log("Colisão entre personagem e boneco");
        });

        // Configurar o campo de visão
        this.FOVGraphics = this.add.graphics();
        this.updateFOV(this.personagem.x, this.personagem.y);

        this.updateFOV(this.rogue.x, this.rogue.y);

        // Configurar a câmera para seguir o personagem
        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.cameras.main.startFollow(this.rogue);

        //Ajustar o zoom da câmera para o tamanho da FOV
        const fovSize = 400; // Tamanho do campo de visão em pixels
        const zoomFactor = this.cameras.main.height / fovSize;
        this.cameras.main.setZoom(zoomFactor);

         // Adicionar colisão entre robô e jogador
         this.physics.add.collider(this.robot, this.rogue, () => {
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
    }

    override update() {
        configControls(this.personagem, this.controls, this);
        this.controlsRogue.update();

         // Atualizar o campo de visão
        this.updateFOV(this.personagem.x, this.personagem.y);
        this.updateFOV(this.rogue.x, this.rogue.y);
    }

    


    // Função para atualizar o campo de visão
    updateFOV(x: number, y: number) {
        // Limpar o gráfico do campo de visão
        this.FOVGraphics.clear();

        // Desenhar o campo de visão em torno do personagem
        this.FOVGraphics.fillStyle(0x000000, 0.5); // Cor e transparência
        this.FOVGraphics.slice(x, y, 100, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true);
        this.FOVGraphics.fillPath();
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

}
