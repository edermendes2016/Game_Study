export const loadHookSprites = (scene: Phaser.Scene): void => { 
    scene.load.spritesheet('att_hook', 'assets/attack/att_hook.png', {
        frameWidth: 16,
        frameHeight: 16        
    });
}


