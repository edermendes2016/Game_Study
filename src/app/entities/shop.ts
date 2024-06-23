export const loadShopSprites = (scene: Phaser.Scene): void => { 
    scene.load.spritesheet('shop', 'assets/house_shop/buildings.png', {
        frameWidth: 16,
        frameHeight: 32
    });
}

export const createShops = (scene: Phaser.Scene): Phaser.GameObjects.Sprite => {
    // Criar sprite do baú na cena
    const shop = scene.add.sprite(200, 100, 'shop');   

    return shop;
};
