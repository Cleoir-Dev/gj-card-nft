import * as Phaser from "phaser";


export class EndScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;
  private song: Phaser.Sound.BaseSound;

  constructor() {
    super({key: 'end'});
  }

  preload() {
    this.load.image('go', 'assets/gameover.png');
    this.load.audio('over', [
      'assets/audio/over.ogg',
      'assets/audio/over.mp3'
  ]);
  }
  create() {
    // play song theme
    this.song = this.sound.add('over');
    this.song.play({ loop: true });
    
    // background
    this.background = this.add.image(0, 0, "go")
    .setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    this.input.on('pointerup', () => { 
      this.scene.start('pre');
      this.song.stop();
    });
  }

  
}


