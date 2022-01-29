import { Component, OnDestroy, OnInit } from '@angular/core';

import * as Phaser from 'phaser';
import { EndScene } from '../game/end-scene';
import { GameScene } from '../game/game';
import { PreScene } from '../game/pre-scene';
import { WinnerScene } from '../game/winner-scene';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  config: any;
  game: Phaser.Game;
  public loading: any;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      width: 640,
      height: 1024,
      backgroundColor: '#3f3185',
      parent: 'gameContainer',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [ PreScene, GameScene, EndScene, WinnerScene ]
    };
  }

  ngOnInit(): void {
      this.game = new Phaser.Game(this.config);
  }

  ngOnDestroy(): void {
    this.game.destroy(true, false);
  }

}
