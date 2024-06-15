export const loadBulletSprites = (scene: Phaser.Scene) : void => { 
    scene.load.image("bullet", "assets/bullet.png");
}

export const createBullet = (personagem: any, scene: any) => {
    const x = personagem.flipX ? personagem.x - 40 : personagem.x + 40;
    const y = personagem.y - 18;

    const bullet = scene.physics.add.image(x, y, "bullet").setScale(0.1);

    if(personagem.flipX){
        bullet.setVelocityX(-700)
        bullet.setFlipX(true);
    } else {
        bullet.setVelocityX(700)
    }

    return bullet;
}