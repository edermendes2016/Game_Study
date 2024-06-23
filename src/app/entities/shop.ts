export const createShopAlianca = (scene: Phaser.Scene): Phaser.GameObjects.Sprite => {
    // Criar sprite do shop na cena
    const shop_alianca = scene.physics.add.sprite(50, 20, 'shop_alianca');  
    
    shop_alianca.setSize(60, 60);    
    shop_alianca.setScale(0.7);

    // Definir o hitbox
    const body = shop_alianca.body as Phaser.Physics.Arcade.Body;
    body.setSize(90, 60);
    body.setOffset(20, 50); // Ajuste a posição do hitbox conforme necessário    

    return shop_alianca;
};

export const createShopHorda = (scene: Phaser.Scene): Phaser.GameObjects.Sprite => {
    // Criar sprite adicional na cena
    const shop_horda = scene.physics.add.sprite(445, 620, 'shop_horda');  
    
    shop_horda.setSize(40, 50);
    shop_horda.setFlipX(true);
    shop_horda.setScale(0.6);

    // Definir o hitbox
    const body = shop_horda.body as Phaser.Physics.Arcade.Body;
    body.setSize(100, 60);
    body.setOffset(20, 20); // Ajuste conforme necessário
    
    return shop_horda;
};

export const loadShopAliancaSprites = (scene: Phaser.Scene): void => { 
    scene.load.spritesheet('shop_alianca', 'assets/house_shop/buildings.png', {
        frameWidth: 128,
        frameHeight: 128        
    });
}

export const loadShopHordaSprites = (scene: Phaser.Scene): void => { 
    scene.load.spritesheet('shop_horda', 'assets/house_shop/shop_horda.png', {
        frameWidth: 128,
        frameHeight: 128     
    });
}
