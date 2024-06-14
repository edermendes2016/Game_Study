export const loadSkeletonSprites = (scene: Phaser.Scene): void => {
    scene.load.spritesheet("skeleton", "assets/skeleton/skeleton.png", {
        frameWidth: 64,
        frameHeight: 64,
        spacing: 1
    });
    scene.load.spritesheet("skeleton_weapon", "assets/skeleton/quiver.png", {
        frameWidth: 64,
        frameHeight: 64,
        spacing: 1
    });

    scene.load.spritesheet("skeleton_bow", "assets/skeleton/bow.png", {
        frameWidth: 64,
        frameHeight: 64,
        spacing: 1
    });
};


export const createSkeletonAnimations = (scene: Phaser.Scene): void => {
    scene.anims.create({
        key: 'skeleton_weapon',
        frames: scene.anims.generateFrameNumbers('skeleton_weapon', {
            start: 0,
            end: 11
        }),
        frameRate: 3,
        repeat: -1
    });

    scene.anims.create({
        key: 'skeleton_bow',
        frames: scene.anims.generateFrameNumbers('skeleton_bow', {
            start: 0,
            end: 11
        }),
        frameRate: 3,
        repeat: -1
    });

    scene.anims.create({
        key: 'skeleton',
        frames: scene.anims.generateFrameNumbers('skeleton', {
            start: 0,
            end: 11
        }),
        frameRate: 3,
        repeat: -1
    });

   
};


export const createSkeleton = (scene: Phaser.Scene): Phaser.GameObjects.Container => {
    const skeletonMain = scene.physics.add.sprite(0, 370, "skeleton").setScale(1);
    
    const skeletonBow = scene.add.sprite(0, 370, "skeleton_bow").setScale(1);
    const skeletonWeapon = scene.add.sprite(0, 370, "skeleton_weapon").setScale(1);

    skeletonWeapon.anims.play("skeleton_weapon", true);
    skeletonMain.anims.play("skeleton", true);
    skeletonBow.anims.play("skeleton_bow", true);
    

    const skeletonContainer = scene.add.container(60, 200, [skeletonWeapon, skeletonMain, skeletonBow]);
    scene.physics.world.enable(skeletonContainer);

    // Ajustar o corpo de física para englobar o container
    const body = (skeletonContainer.body as Phaser.Physics.Arcade.Body);
    body.setSize(64, 64); // Ajustar ao tamanho total das sprites combinadas  

    return skeletonContainer;
};
