import { SocketService } from './../../services/socket.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/card.model';


@Component({
  selector: 'card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {
  @Input() card: Card;
  @Input() cards: Card[];
  @Input() zIndex: number;
  @Input() isMoving: boolean
  @Output() onUpdateZIndex = new EventEmitter<any>();
  @Output() onChangeMoveState = new EventEmitter<any>();

  currCard: Card
  mouseX: number = null;
  mouseY: number = null;
  dragPosition = { x: 0, y: 0 };

  get suit() {
    return `./assets/img/${this.card.suit}.svg`;
  }

  onDragStart(card, ev) {
    this.onChangeMoveState.emit(true)
    if (ev.target.localName === 'h2' || ev.target.localName === 'img') ev.target.offsetParent.style.zIndex = this.zIndex + '' //PLASTER
    else ev.target.style.zIndex = this.zIndex + ''
    this.onUpdateZIndex.emit()
    window.addEventListener('mousemove', this.onMouseMove)
  }

  onDragOver(ev) {
    this.onChangeMoveState.emit(false)
    this.currCard = null
    window.removeEventListener('mousemove', this.onMouseMove, false)
    this.socketService.off('card move', () => {
      console.log('card moveeee');
    })

  }


  onMouseMove = (ev) => {
    if (!this.isMoving) return
    console.log('TESTTTT',ev);
    this.mouseX = ev.layerX
    this.mouseY = ev.layerY
    this.socketService.emit('card move', { card: this.card, locX: this.mouseX, locY: this.mouseY })
  }



  constructor(private socketService: SocketService,
  ) { }
  ngOnInit(): void {

    this.socketService.on('card moved', ({ card, locX, locY }) => {
      this.currCard = this.cards.find(currCard => {
        return currCard._id === card._id
      })
      //  this.dragPosition = this.currCard.dragPosition 
      if (this.currCard) {
        this.currCard.dragPosition = { x: locX, y: locY }
      }
    })
  }

}

// onDragOver(ev) {
//   console.log('invoked!');

//   this.currCard = null
//   window.removeEventListener('mousemove', () => {
//     console.log('removed!');
//     this.socketService.off('card move', () => {
//       console.log('card moveeee');

//     })
//   })

// }
