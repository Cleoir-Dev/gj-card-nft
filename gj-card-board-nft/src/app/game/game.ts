import { LoadingController } from "@ionic/angular";
import * as Phaser from "phaser";
import { AddButtonRestart } from "./button-restart";
import CardPlayer from "./card-player";
import Grid from "./grid";

export class GameScene extends Phaser.Scene {
  count = 0;
  grid: Grid;
  player: CardPlayer;
  highlighted: any;
  timedEvent: any;
  text: Phaser.GameObjects.Text;
  textCount: Phaser.GameObjects.Text;
  song: Phaser.Sound.BaseSound;


  constructor(public loadingCtrl: LoadingController) {
    super({key: 'game'});
  }
  

  preload() {
    this.load.image('armor', 'assets/armor.png');
    this.load.image('card', 'assets/card.png');
    this.load.image('dead', 'assets/dead.png');
    this.load.image('deathknight', 'assets/deathknight.png');
    this.load.image('firedrake', 'assets/firedrake.png');
    this.load.image('goldendragon', 'assets/goldendragon.png');
    this.load.image('healingpotion', 'assets/healingpotion.png');
    this.load.image('kobold', 'assets/kobold.png');
    this.load.image('ogre', 'assets/ogre.png');
    this.load.image('paladin', 'assets/paladin.png');
    this.load.image('playercard', 'assets/playercard.png');
    this.load.image('restartbutton', 'assets/restartbutton.png');
    this.load.image('shield', 'assets/shield.png');
    this.load.image('troll', 'assets/troll.png');

    this.load.audio('stage', [
      'assets/audio/stage.ogg',
      'assets/audio/stage.mp3'
  ]);

    this.load.bitmapFont('pressstart', 'assets/pressstart.png', 'assets/pressstart.fnt');
    
  }
  create() {
    this.grid = new Grid({ scene: this, columns: 3, rows: 3 });

    // play song theme
    this.song = this.sound.add('stage');
    this.song.play({ loop: true });

    const style = { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: "#BAC123", align: "center"  };
    //Fase
    this.textCount = this.add.text(380, 970, '', style).setFontSize(30);
    this.textCount.setText([
      'Turn: ' + this.count + ' From: 20'
    ]);

    //tempo
    this.text = this.add.text(32, 970, 'Time: ', style).setFontSize(30);

    this.timedEvent = this.time.delayedCall(64500, this.onEvent, [], this);

    this.player = new CardPlayer({
      scene: this,
      name: 'Paladin',
      x: Number(this.game.config.width) / 2,
      y: Number(this.game.config.height) - 200,
      card: 'playercard',
      image: 'paladin',
      health: 16,
      depth: 1,
      ondragend: (pointer, gameObject) => {
        this.player.x = this.player.originalX;
        this.player.y = this.player.originalY;
        if (this.highlighted) {

          this.player.originalX = this.player.x = this.highlighted.x;
          this.highlighted.selected = true;
          switch (this.highlighted.cardtype) {
            case 'attack':
              this.player.attack(this.highlighted.value);
              this.highlighted.dead = true;
              this.highlighted.deadAnimation();
              break;
            case 'heal':
              this.player.health = Math.min(this.player.health + this.highlighted.value, this.player.maxHealth);
              this.highlighted.selected = true;
              break;
            case 'armor':
              this.player.armor = this.highlighted.value;
              break;
          }

          if (this.player.dead) {
            this.count = 0;
            this.song.stop();
            AddButtonRestart(this);
          } else {
            this.grid.fadeFrontRow();
          }
          this.count++;

          if(this.count == 20){
            this.count = 0;
            this.scene.start('winner');
            this.song.stop();
          }
        }
      }
    });
  }

  update(time, delta) {

    this.textCount.setText([
      'Turn: ' + this.count + ' From: 20'
    ]);

    this.text.setText('Time: ' + this.timedEvent.getProgress().toString().substr(0, 4));

    this.grid.cards[0].highlighted = false;
    this.grid.cards[1].highlighted = false;
    this.grid.cards[2].highlighted = false;
    this.highlighted = null;
    let columnWidth = Number(this.game.config.width);
    columnWidth = columnWidth / this.grid.columns
    let xDiff = Math.abs(this.player.x - this.player.originalX);
    if (this.player.y < 700 && xDiff < columnWidth * 1.4) {
      if (this.player.x < columnWidth) {
        this.grid.cards[0].highlighted = true;
        this.highlighted = this.grid.cards[0];
      } else if (this.player.x > columnWidth * 2) {
        this.grid.cards[2].highlighted = true;
        this.highlighted = this.grid.cards[2];
      } else {
        this.grid.cards[1].highlighted = true;
        this.highlighted = this.grid.cards[1];
      }
    }
   }

  onEvent ()
  {
    this.count = 0;
    this.scene.start('end');
    this.song.stop();
  }
}


