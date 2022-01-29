import * as Phaser from "phaser";

export class WinnerScene extends Phaser.Scene {

  constructor() {
    super({key: 'winner'});
  }

  preload() {
    this.load.image('cg', 'assets/congratulations.png');
  }
  create() {
    // logo
    this.add.image(20, 200, "cg").setOrigin(0, 0);
    this.input.on('pointerup', () => { this.scene.start('pre')});
  }
}


