let maxWidth = 960;
let maxHeight = 540;

const config = {
    type: Phaser.AUTO,
    canvas: document.getElementById('GameScreen'), // Usa el canvas existente
    width: maxWidth, // Ajusta el ancho según sea necesario
    height: maxHeight, // Ajusta la altura según sea necesario
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);



let eggs = []

class GameManager {
    constructor(scene, time, gameOver) {
        this.gameOver =  gameOver;
        this.score = 0;
        this.scene = scene;
        this.time = time;
    }

    updateScoreText() {
        if(this.score<0){
            this.score = 0;
        }
        this.scene.scoreText.setText(this.score);
    }

    updateTime(){
    }
}

let gameManager;

class Huevera{
    constructor(scene, type, x, y, rgbHuevera){
        this.type = type;
        this.x = x;
        this.y = y;
        this.textureIndex = rgbHuevera;
        this.image = scene.add.image(this.x, this.y, 'huevera').setScale(.8).setOrigin(0,0);
        switch (this.textureIndex){
            case 0:
                this.image.setTint(Phaser.Display.Color.GetColor(255,0,0));
                break;
                case 1:
                this.image.setTint(Phaser.Display.Color.GetColor(0,255,0));
                break;
                case 2:
                this.image.setTint(Phaser.Display.Color.GetColor(0,0,255));
                break;
        }
        // .setTint(Phaser.Display.Color.GetColor(this.rgbColor.r,this.rgbColor.G,this.rgbColor.B))
        ;
    }
}

class Egg {
    //INDEX: 
    ///ROJO = 2
    //VERDE = 1
    //AZUL = 0
    constructor(scene ,type, texture, x, y) {
        this.colors = ['0,0,255','0,255,0','255,0,0'];
        this.dragging = false;
        this.type = type;
        this.textureIndex = texture;
        this.x = x;
        this.y = y;
        this.scored = false; // Nueva propiedad para evitar múltiples puntuaciones
        this.destroyed = false; // Nueva propiedad para marcar si el huevo fue destruido

        // this.image = scene.add.image(this.x, this.y, this.texture);
        switch(this.textureIndex){
            case 0:
                this.image = scene.add.image(this.x, this.y,'huevo')
                .setOrigin(.5,.5)
                .setTint(Phaser.Display.Color.GetColor(0,0,255))
                .setDepth(3);
                break;
                case 1:
                this.image = scene.add.image(this.x, this.y,'huevo')
                .setOrigin(.5,.5)
                .setTint(Phaser.Display.Color.GetColor(0,255,0))
                .setDepth(3);
                break;
                case 2:
                this.image = scene.add.image(this.x, this.y,'huevo')
                .setOrigin(.5,.5)
                .setTint(Phaser.Display.Color.GetColor(255,0,0))
                .setDepth(3);
                break;
                default:
                this.image = scene.add.image(this.x, this.y,'huevo')
                .setOrigin(.5,.5)
                .setTint(Phaser.Display.Color.GetColor(255,255,255))
                .setDepth(3);
                break;
        }


        this.image.setInteractive(new Phaser.Geom.Rectangle(0, 0, 55, 80), Phaser.Geom.Rectangle.Contains);
        scene.input.setDraggable(this.image);
        
    }

    displayInfo() {
        // console.log(`Type: ${this.type}, Texture: ${this.texture}`);
    }

    eggDestroy(){
        this.image.destroy();
        this.destroyed = true; // Marca el huevo como destruido
    }

    scoreCounter(index){
        if (this.textureIndex == index) {
            gameManager.score += 30;
        } else {
            gameManager.score -= 60;
        }
        gameManager.updateScoreText(); // Actualiza el texto del puntaje
    }

    eggFall(scene){
        if (this.destroyed) return true; // Evita procesar lógica si el huevo ya fue destruido

        if(!this.dragging){
            this.image.y += 3;
            if(this.image.y > 600){
                this.eggDestroy();
                gameManager.score -=5;
                gameManager.updateScoreText();
                return true;
            }

        }
        this.image.on('dragstart', ()=>{
            if(!gameManager.time <= 0){
                this.dragging = true;
                console.log('arrastrando huevo');
            }
        })

        this.image.on('drag', (pointer, dragX, dragY) => {
           if(this.dragging){
               this.image.x=dragX;
               this.image.y=dragY;
           }
        });

        this.image.on('dragend',()=>{
            if (this.scored || this.destroyed) return; // Evita múltiples puntuaciones o lógica en huevos destruidos
            this.dragging = false;
            if (Phaser.Geom.Intersects.RectangleToRectangle(scene.hueveraRoja.image.getBounds(), this.image.getBounds())){
                console.log("hueveraRoja");
                this.scoreCounter(2);
                this.scored = true; // Marca como puntuado
                this.eggDestroy();
                scene.hueveraSFX.play();
                return true;
            }
            else if(Phaser.Geom.Intersects.RectangleToRectangle(scene.hueveraVerde.image.getBounds(), this.image.getBounds())){
                console.log("hueveraVerde");
                this.scoreCounter(1);
                this.scored = true; // Marca como puntuado
                this.eggDestroy();
                scene.hueveraSFX.play();
                return true;
            }
            else if(Phaser.Geom.Intersects.RectangleToRectangle(scene.hueveraAzul.image.getBounds(), this.image.getBounds())){
                console.log("hueveraAzul");
                this.scoreCounter(0);
                this.scored = true; // Marca como puntuado
                this.eggDestroy();
                scene.hueveraSFX.play();
                return true;
              }
            console.log('huevo soltado');
        })
    }
}

function gameOverDisplay(scene) {
    scene.gameOverScreen.setActive(true).setVisible(true); // Activa y muestra la pantalla de Game Over
    scene.add.text(maxWidth / 2, maxHeight / 2, 'GAME OVER', {
        fontSize: '50px',
        fill: '#ffffff',
        fontFamily: 'Arial'
    }).setOrigin(0.5).setDepth(11);
    scene.add.text(maxWidth/2,maxHeight/2+50,`Puntuación: ${gameManager.score}`,{
        fontSize: '50px',
        fill: '#ffffff',
        fontFamily: 'Arial'
    }).setOrigin(0.5).setDepth(11); // Centra el texto en la pantalla
}

function eggSpawner(spawn){
    let x = Phaser.Math.Between(maxWidth/4+50,maxWidth-50);
    let y = 0;
    let texture = Phaser.Math.Between(0,2);
    console.log(texture);
    eggs.push(new Egg(spawn, 'tipo1', texture, x, y));
}


function preload() {
    // Carga de recursos
    this.load.image('huevo','img/huevo.webp');
    this.load.image('huevera','img/huevera.webp');
    this.load.image('grass','img/grass.webp');
    this.load.image('fence','img/fence.webp');
    this.load.audio('hueveraSFX','audio/hueveraSFX.mp3');
    this.load.audio('bgmusic','audio/bgmusic.wav');
}

function create() {
    gameManager = new GameManager(this,50, false);
    this.bgmusic = this.sound.add('bgmusic', {volume:.3, loop:true});
    this.bgmusic.play();
    this.grass = this.add.image(0, 0, 'grass').setOrigin(0,0);
    this.fence = this.add.image(220,200,'fence').setOrigin(.5,.5).setDepth(1).setScale(.5);
    this.fence.rotation = -90 * (Math.PI / 180);
    this.add.rectangle(0, 0, maxWidth / 4, maxHeight, 0xbbbbbb)
    .setOrigin(0, 0);
    this.timeTexto = this.add.text(maxWidth-100,30,gameManager.time,{fontSize:'30px',fill:'#ff0000',fontFamily:'Arial'});
        setInterval(()=>{
            if(gameManager.time>0){
                gameManager.time--;
            }else if (gameManager.time==0){gameManager.gameOver=true}
            this.timeTexto.setText(gameManager.time)
        },1000);
    this.scoreText = this.add.text(10, 10, gameManager.score, {
        fontSize: '20px',
        fill: '#ffffff',
        fontFamily: 'Arial'
    });
    this.hueveraRoja = new Huevera(this, 'roja',15,20,0);
    this.hueveraVerde = new Huevera(this, 'roja',15,200,1);
    this.hueveraAzul = new Huevera(this, 'roja',15,400,2);
    eggSpawner(this);
    this.hueveraSFX = this.sound.add('hueveraSFX');
    setInterval(() => {
        if(!gameManager.gameOver){
            eggSpawner(this);
        }
    }, 1000);
    this.gameOverScreen = this.add.rectangle(0,0,maxWidth,maxHeight,0xff00ff)
    .setOrigin(0,0)
    .setDepth(10)
    .setActive(false)
    .setVisible(false);
}

function update() {
    if (!gameManager.gameOver) {
        for (let i = eggs.length - 1; i >= 0; i--) {
            eggs[i].displayInfo();
            if (eggs[i].eggFall(this)) {
                eggs.splice(i, 1);
                console.log(eggs);
            }
        }
    } else {
        gameOverDisplay(this); // Llama a la función para mostrar la pantalla de Game Over
    }
}
