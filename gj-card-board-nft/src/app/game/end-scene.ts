import * as Phaser from "phaser";


export class EndScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;

  constructor() {
    super({key: 'end'});
  }

  preload() {
    this.load.image('go', 'assets/gameover.png');
  }
  create() {
    
    // background
    this.background = this.add.image(0, 0, "go")
    .setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    this.input.on('pointerup', () => { this.scene.start('pre')});
  }

  
}


