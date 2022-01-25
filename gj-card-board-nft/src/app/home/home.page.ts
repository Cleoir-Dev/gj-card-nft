import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import * as Phaser from 'phaser';
import { GameScene } from '../game/game';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  config: any;
  game: Phaser.Game;

  constructor(private plt: Platform) {
    this.config = {
      type: Phaser.AUTO,
      width: this.plt.width(),
      height: this.plt.height(),
      parent: 'gameContainer',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: GameScene
    };
  }

  ngOnInit(): void {
    this.game = new Phaser.Game(this.config);
  }

  ngOnDestroy(): void {
    this.game.destroy(true, false);
  }
}