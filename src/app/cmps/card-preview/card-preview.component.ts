import { SocketService } from './../../services/socket.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Card } from 'src/app/models/card.model';
@Component({
  selector: 'card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {
  constructor(private socketService: SocketService,
  ) { }
  @ViewChild('cardPreview') cardPreview;
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
  boardPos = document.querySelector('.board-cmp').getBoundingClientRect()
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
    // console.log('top:', this.cardPreview.nativeElement.getBoundingClientRect().top - this.boardPos.top);
    // console.log('right:', this.cardPreview.nativeElement.getBoundingClientRect().right - this.boardPos.right);
    // console.log('bottom:', this.cardPreview.nativeElement.getBoundingClientRect().bottom - this.boardPos.bottom);
    // console.log('left:', this.cardPreview.nativeElement.getBoundingClientRect().left - this.boardPos.left);
    // console.log('--------------');
    this.onChangeMoveState.emit(false)
    this.currCard = null
    window.removeEventListener('mousemove', this.onMouseMove, false)
    this.socketService.off('card move', () => {
      console.log('card moveeee');
    })
  }
  onMouseMove = (ev) => {
    // console.log('top:', this.cardPreview.nativeElement.getBoundingClientRect().top - this.boardPos.top);
    // console.log('right:', this.cardPreview.nativeElement.getBoundingClientRect().right - this.boardPos.right);
    // console.log('bottom:', this.cardPreview.nativeElement.getBoundingClientRect().bottom - this.boardPos.bottom);
    // console.log('left:', this.cardPreview.nativeElement.getBoundingClientRect().left - this.boardPos.left);
    if (!this.isMoving) return
    console.log('ha!');
    
    this.mouseX = this.cardPreview.nativeElement.getBoundingClientRect().left - this.boardPos.left
    this.mouseY = this.cardPreview.nativeElement.getBoundingClientRect().top - this.boardPos.top
    this.socketService.emit('card move', { card: this.card, locX: this.mouseX, locY: this.mouseY })
  }
  ngOnInit(): void {
    this.socketService.on('card moved', ({ card, locX, locY }) => {
      // console.log('X:', locX, 'Y:', locY);
      this.currCard = this.cards.find(currCard => {
        return currCard._id === card._id
      })
      // console.log('CC', this.currCard);
      if (this.currCard) {
        this.currCard.dragPosition = { x: locX - 62, y: locY - 5 }
      }
    })
  }
}

// import { SocketService } from './../../services/socket.service';
// import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
// import { Card } from 'src/app/models/card.model';
// @Component({
//   selector: 'card-preview',
//   templateUrl: './card-preview.component.html',
//   styleUrls: ['./card-preview.component.scss']
// })
// export class CardPreviewComponent implements OnInit {
//   constructor(private socketService: SocketService,
//   ) { }
//   @ViewChild('cardPreview') cardPreview;
//   @Input() card: Card;
//   @Input() cards: Card[];
//   @Input() zIndex: number;
//   @Input() isMoving: boolean
//   @Output() onUpdateZIndex = new EventEmitter<any>();
//   @Output() onChangeMoveState = new EventEmitter<any>();
//   currCard: Card
//   mouseX: number = null;
//   mouseY: number = null;
//   dragPosition = { x: 0, y: 0 };
//   boardPos = document.querySelector('.board-cmp').getBoundingClientRect()
//   cardPos = this.cardPreview.nativeElement.getBoundingClientRect()
//   get suit() {
//     return `./assets/img/${this.card.suit}.svg`;
//   }
//   onDragStart(card, ev) {
//     this.onChangeMoveState.emit(true)
//     if (ev.target.localName === 'h2' || ev.target.localName === 'img') ev.target.offsetParent.style.zIndex = this.zIndex + '' //PLASTER
//     else ev.target.style.zIndex = this.zIndex + ''
//     this.onUpdateZIndex.emit()
//     window.addEventListener('mousemove', this.onMouseMove)
//   }
//   onDragOver(ev) {
//     this.onChangeMoveState.emit(false)
//     this.currCard = null
//     window.removeEventListener('mousemove', this.onMouseMove, false)
//     this.socketService.off('card move', () => {
//       console.log('card moveeee');
//     })
//   }
//   onMouseMove = (ev) => {
//     console.log('top:', this.cardPos.top - this.boardPos.top);
//     console.log('right:',  this.cardPos.right - this.boardPos.right);
//     console.log('bottom:',  this.cardPos.bottom - this.boardPos.bottom);
//     console.log('left:', this.cardPos.left - this.boardPos.left);
//     if (!this.isMoving) return
//     this.mouseX = ev.layerX
//     this.mouseY = ev.layerY
//     this.socketService.emit('card move', { card: this.card, locX: this.mouseX, locY: this.mouseY })
//   }
//   ngOnInit(): void {
//     this.socketService.on('card moved', ({ card, locX, locY }) => {
//       this.currCard = this.cards.find(currCard => {
//         return currCard._id === card._id
//       })
//       if (this.currCard) {
//         this.currCard.dragPosition = { x: locX - 30, y: locY - 50 }
//       }
//     })
//   }
// }