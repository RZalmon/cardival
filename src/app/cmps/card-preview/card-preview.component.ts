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
    this.onChangeMoveState.emit(false)
    this.currCard = null
    window.removeEventListener('mousemove', this.onMouseMove, false)
    this.socketService.off('card move', () => {
      console.log('card moveeee');
    })

  }


  onMouseMove = (ev) => {  
    console.log(this.cardPreview.nativeElement.getBoundingClientRect().left);
      
    if (!this.isMoving) return
    this.mouseX = ev.layerX
    this.mouseY = ev.layerY
    this.socketService.emit('card move', { card: this.card, locX: this.mouseX, locY: this.mouseY })
  }



 
  ngOnInit(): void {
    
    this.socketService.on('card moved', ({ card, locX, locY }) => {
      this.currCard = this.cards.find(currCard => {
        return currCard._id === card._id
      })
      if (this.currCard) {
        this.currCard.dragPosition = { x: locX -30, y: locY -50 }
      }
    })
  }

}
