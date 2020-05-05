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
  @Input() zIndex:number;
  @Output() onUpdateZIndex = new EventEmitter<any>();


  currCard:Card = this.card
  mouseX:number = null;
  mouseY:number = null;
  dragPosition = {x: 0, y: 0};

get suit(){
  return `./assets/img/${this.card.suit}.svg`;
}

onDragStart(card, ev) {
<<<<<<< HEAD
  console.log(ev); 
  if (ev.target.localName === 'h2' || ev.target.localName === 'img') ev.target.offsetParent.style.zIndex = this.zIndex + '' //PLASTER
  else ev.target.style.zIndex = this.zIndex + ''
=======
  ev.target.offsetParent.style.zIndex = this.zIndex + ''
>>>>>>> ba24cab7c93cefdcbb874571292cd9ad917357a3
  this.onUpdateZIndex.emit()
  window.addEventListener('mousemove', this.onMouseMove)
}

onDragOver(ev){   
  this.currCard = null
  window.removeEventListener('mousemove', ()=>{
    console.log('removed!');
    this.socketService.off('card move',()=>{
      console.log('card moveeee');
      
    })
  })  
  
}


onMouseMove = (ev) => {    
  this.mouseX = ev.clientX
  this.mouseY = ev.clientY
  this.socketService.emit('card move', {card:this.card,locX:this.mouseX, locY:this.mouseY})
}



  constructor(private socketService: SocketService,
    ) { }
   ngOnInit(): void {
    
    this.socketService.on('card moved', ({card,locX,locY}) => {   
      this.currCard =  this.cards.find(currCard=>{ 
        return currCard._id === card._id
      })
      //  this.dragPosition = this.currCard.dragPosition 
      if(this.currCard){
        this.currCard.dragPosition = {x:locX,y:locY}
      }
      })
  }

}
