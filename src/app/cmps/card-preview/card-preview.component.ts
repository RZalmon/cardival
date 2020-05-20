import { SocketService } from './../../services/socket.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Card } from 'src/app/models/card.model';
@Component({
  selector: 'card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss'],
})
export class CardPreviewComponent implements OnInit {
  constructor(private socketService: SocketService) {}
  @ViewChild('cardPreview') cardPreview;
  @Input() card: Card;
  @Input() cards: Card[];
  @Input() zIndex: number;
  @Input() isMoving: boolean;
  @Output() onUpdateZIndex = new EventEmitter<any>();
  @Output() onChangeMoveState = new EventEmitter<any>();
  // @Output() onCardClicked = new EventEmitter<any>();
  currCard: Card;
  mouseX: number = null;
  mouseY: number = null;
  dragPosition = { x: 0, y: 0 };
  boardPos = document.querySelector('.board-cmp').getBoundingClientRect();
  get suit() {
    return `./assets/img/${this.card.suit}.svg`;
  }
  onDragStart(card, ev) {
    this.onChangeMoveState.emit(true);
    if (ev.target.localName === 'h2' || ev.target.localName === 'img')
      ev.target.offsetParent.style.zIndex = this.zIndex + '';
    //PLASTER
    else ev.target.style.zIndex = this.zIndex + '';
    this.onUpdateZIndex.emit();
    window.addEventListener('mousemove', () => {
      this.onMouseMove(card);
    });
  }
  onDragOver(ev) {
    this.onChangeMoveState.emit(false);
    this.currCard = null;
    window.removeEventListener('mousemove', this.onMouseMove, false);
    this.socketService.off('card move', () => {
      console.log('card moveeee');
    });
  }
  onMouseMove = (card) => {        
    if (!this.isMoving) return;
    this.mouseX =
      this.cardPreview.nativeElement.getBoundingClientRect().left -
      this.boardPos.left;
    this.mouseY =
      this.cardPreview.nativeElement.getBoundingClientRect().top -
      this.boardPos.top;
      if(!card.top){
        card.top = this.mouseX
      }
      if(!card.left){
        card.left = this.mouseY
      }
    this.socketService.emit('card move', {
      card: card,
      locX: this.mouseX,
      locY: this.mouseY,   
    });
  };
  

   ngOnInit(): void {
    this.socketService.on( 'card moved', async ({ card, locX, locY}) => {
      this.currCard = this.cards.find((currCard) => {
        return currCard._id === card._id;
      });      
      if (this.currCard) {        
        this.currCard.dragPosition = { x: locX - card.top, y: locY - card.left };
        let elCard =  await (<HTMLElement>document.querySelector(`.${this.currCard._id}`))
        // console.log(this.zIndex);
        if(elCard){
          elCard.style.zIndex = this.zIndex + ''

        }
      }
    });
  }
}