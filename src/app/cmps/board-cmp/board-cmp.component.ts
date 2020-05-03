import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'board-cmp',
  templateUrl: './board-cmp.component.html',
  styleUrls: ['./board-cmp.component.scss']
})
export class BoardCmpComponent implements OnInit {
  @Input() cards: Card[];

  @Output() shuffle = new EventEmitter<any>();

  onShuffle(){
    this.shuffle.emit('hi')
  }


  constructor() { }

  ngOnInit(): void {
  }

}
