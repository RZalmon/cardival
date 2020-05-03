import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'board-cmp',
  templateUrl: './board-cmp.component.html',
  styleUrls: ['./board-cmp.component.scss']
})
export class BoardCmpComponent implements OnInit {
  @Input() cards: Card[];

  constructor() { }

  ngOnInit(): void {
  }

}
