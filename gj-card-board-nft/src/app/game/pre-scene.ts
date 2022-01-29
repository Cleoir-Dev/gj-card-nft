import * as Phaser from "phaser";


export class PreScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;

  constructor() {
    super({key: 'pre'});
  }

  preload() {
    this.load.image('lg', 'assets/logo.png');
    this.load.image('bg', 'assets/background.png');
    this.load.image('start', 'assets/start.png');

    this.load.audio('rude', [
      'assets/audio/rude.ogg',
      'assets/audio/rude.mp3'
  ]);

    this.load.bitmapFont('pressstart', 'assets/pressstart.png', 'assets/pressstart.fnt');
  }
  create() {

    let song = this.sound.add('rude');

    song.play({ loop: true });
    
    // background
    this.background = this.add.image(0, 0, "bg")
    .setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;
    // logo
    this.add.image(60, 150, "lg").setOrigin(0, 0);
    this.add.image(270, 700, "start").setOrigin(0, 0);
 

    this.input.on('pointerup', () => { 
      this.scene.start('game')
      song.stop();
    });
  }

  
}


