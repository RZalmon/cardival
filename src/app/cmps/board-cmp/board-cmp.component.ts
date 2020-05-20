import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/card.model';
@Component({
  selector: 'board-cmp',
  templateUrl: './board-cmp.component.html',
  styleUrls: ['./board-cmp.component.scss']
})
export class BoardCmpComponent implements OnInit {
  @Input() cards: Card[];
  zIndex = 1
  isMoving: boolean;
  @Output() shuffle = new EventEmitter<any>();
  constructor() { }
  onIncZIndex() {
    this.zIndex++
  }
  onUpdateZIndex(zIndex) {
    // console.log('socket Z-index', zIndex)
    this.zIndex = zIndex
    console.log('CURR Z-index', this.zIndex)
  }
  ngOnInit(): void {
  }
  onShuffle() {
    this.shuffle.emit()
  }
  handleStopMove() {
    this.isMoving = false;
  }
  handleChangeMove(ev) {
    this.isMoving = ev;
  }
}