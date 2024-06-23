export const loadBauSprites = (scene: Phaser.Scene): void => { 
    scene.load.spritesheet('bau', 'assets/bau/bau_small-sheet.png', {
        frameWidth: 16,
        frameHeight: 32
    });
}


export const createBau = (scene: Phaser.Scene): Phaser.GameObjects.Sprite => {
    // Criar sprite do baú na cena
    const bau = scene.add.sprite(50, 50, 'bau');

    // Definir a animação inicial como fechada
    bau.anims.play('bau_closed');

    // Habilitar interação do mouse
    bau.setInteractive();

    // Variável para rastrear se o baú foi aberto
    let bauAberto = false;

    // Configurar evento de clique
    bau.on('pointerdown', () => {
        // Verificar se o baú ainda não foi aberto
        if (!bauAberto) {
            // Tocar a animação de abrir
            bau.anims.play('bau_open');
            // Atualizar o estado do baú para aberto
            bauAberto = true;
        } else {
            // Tocar a animação de fechar
            bau.anims.playReverse('bau_open');
            // Atualizar o estado do baú para fechado
            bauAberto = false;
        }
    });

    return bau;
};






export const createBauAnimations = (scene: Phaser.Scene) => {  

    // Criar animação do baú abrindo e fechando
    scene.anims.create({
        key: 'bau_closed',
        frames: [
           // { key: 'bau', frame: 0 }, // Frame fechado
            { key: 'bau', frame: 1 }  // Frame fechado
        ],
        frameRate: 2, // Velocidade da animaçã
        
    }); 

    // Criar animação do baú abrindo e fechando
    scene.anims.create({
        key: 'bau_open',
        frames: [
            { key: 'bau', frame: 1 }, // Frame fechado
            { key: 'bau', frame: 0 }  // Frame aberto
        ],
        frameRate: 2, // Velocidade da animação        
    });
   
      
}