import { Personagem } from "./personagem";
import { createBullet } from "./bullet";
import { createBoneco } from "./boneco-treinamento";
import { createInimigo } from "./inimigo_slime";

export const createControls = (scene: Phaser.Scene): Phaser.Types.Input.Keyboard.CursorKeys => {
    return scene.input.keyboard.createCursorKeys();
}

export const configControls = (
    personagem: Personagem,
    controls: Phaser.Types.Input.Keyboard.CursorKeys,
    scene: Phaser.Scene
): void => {
    // Verificar se o personagem está atacando
    if (personagem.isAttacking) {
        // Impedir outros movimentos durante o ataque        
        return;
    }

    personagem.setVelocityX(0);
    personagem.setVelocityY(0);

    if (controls.right.isDown) {
        moverDireita(personagem);
        return;
    }
    if (controls.left.isDown) {
        moverEsquerda(personagem);
        return;
    }
    if (controls.up.isDown) {
        moverCima(personagem);
        return;
    }
    if (controls.down.isDown) {
        moverBaixo(personagem);
        return;
    }

    if (controls.space.isDown) {
        if (!personagem.isAttacking) {
            attack(personagem, scene);
        }
        return;
    }

    if (!personagem.isAttacking) {
        personagem.anims.play("player_idle", true);
        return;
    }
}

const defaulVelocidade = 200;

const moverDireita = (personagem: Personagem): void => {
    personagem.setFlipX(false);
    personagem.anims.play('player_walk_r', true);
    personagem.setVelocityX(defaulVelocidade);
}

const moverEsquerda = (personagem: Personagem): void => {
    personagem.setFlipX(true); 
    personagem.anims.play('player_walk_r', true);
    personagem.setVelocityX(-defaulVelocidade);  
     
}

const moverCima = (personagem: Personagem): void => {      
    personagem.anims.play('player_walk_l', true);
    personagem.setVelocityY(-defaulVelocidade);    
}

const moverBaixo = (personagem: Personagem): void => {   
    personagem.setFlipX(false);  
    personagem.anims.play('player_walk_r', true);
    personagem.setVelocityY(defaulVelocidade);    
}

// Função para iniciar o ataque
const attack = (personagem: Personagem, scene: Phaser.Scene): void => {
    personagem.isAttacking = true;
    personagem.anims.play("player_attack", true);
    
    const bullet = createBullet(personagem, scene);

    // Assumindo que o boneco já foi criado e é acessível
    const boneco = createBoneco(scene); // Criar o boneco    
    
     // Collider entre o bullet e o boneco
     scene.physics.add.collider(bullet, boneco, () => {
        // Lógica a ser executada quando o bullet colidir com o boneco
        bullet.destroy();
         // Destruir o bullet
        
        // Aqui você pode adicionar lógica para lidar com o impacto no boneco
        hitBoneco(boneco, scene); // Chamar a função para animar a destruição do boneco       
        
    });
    
    // Assumindo que a animação tem um evento 'oncomplete' para resetar o estado de ataque
    personagem.on('animationcomplete', (animation:any) => {
        if (animation.key === "player_attack") {
            personagem.isAttacking = false;
        }
    });
}



// Função para lidar com o impacto do bullet no boneco
export const hitBoneco = (boneco: Phaser.Physics.Arcade.Sprite, scene: Phaser.Scene): void => {
    // Verifique se o boneco já foi atingido
    if (!(boneco as any).foiAtingido) {
        // Definir 'foiAtingido' como verdadeiro para indicar que o boneco foi atingido
        (boneco as any).foiAtingido = true;

        // Reproduzir animação de destruição do boneco    
        boneco.anims.play("boneco_destruido", true);
        
        // Interromper a velocidade do boneco para evitar que ele seja empurrado para fora da tela
        boneco.setVelocity(0);

        // Callback para remover o boneco após a animação de destruição
        boneco.on('animationcomplete', (animation: any) => {
            if (animation.key === "boneco_destruido") {
                
                boneco.setVisible(false); // Tornar o boneco invisível
                boneco.body.enable = false; // Desativar a física do boneco
                scene.time.delayedCall(1000, () => {
                    boneco.setVisible(true); // Tornar o boneco visível novamente
                    boneco.body.enable = true; // Reativar a física do boneco
                    boneco.anims.play("boneco", false); // Reproduzir animação do boneco parado
                    (boneco as any).foiAtingido = false; // Reiniciar a flag 'foiAtingido' para falso
                    boneco.destroy(); // Destruir o boneco após a animação de destruição
                });
            }
        });
    }
}




