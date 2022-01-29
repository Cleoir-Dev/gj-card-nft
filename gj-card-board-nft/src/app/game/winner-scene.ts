import * as Phaser from "phaser";

export class WinnerScene extends Phaser.Scene {

  constructor() {
    super({key: 'winner'});
  }

  preload() {
    this.load.image('cg', 'assets/congratulations.png');

    this.load.audio('won', [
      'assets/audio/won.ogg',
      'assets/audio/won.mp3'
  ]);
  }
  create() {
    // play song theme
    let song = this.sound.add('won');

    song.play({ loop: true });
    // logo
    this.add.image(20, 200, "cg").setOrigin(0, 0);
    this.input.on('pointerup', () => { 
      this.scene.start('pre');
      song.stop();
    });
  }
}


