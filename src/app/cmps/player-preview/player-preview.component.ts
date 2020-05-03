import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'player-preview',
  templateUrl: './player-preview.component.html',
  styleUrls: ['./player-preview.component.scss']
})
export class PlayerPreviewComponent implements OnInit {
  @Input() player: Player;

  constructor() { }

  ngOnInit(): void {
  }

}
