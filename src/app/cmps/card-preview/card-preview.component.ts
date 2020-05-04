import { SocketService } from './../../services/socket.service';
import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';


@Component({
  selector: 'card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {
  @Input() card: Card;
  @Input() cards: Card[];

  currCard:Card = null
  mouseX:number = null;
  mouseY:number = null;
  zIndex:number = 1

get suit(){
  return `./assets/img/${this.card.suit}.svg`;
}

onDragStart(card, ev) {
  console.log(this.zIndex);
  debugger
 // console.log('here')
  ev.target.style.zIndex = this.zIndex + ''
  this.zIndex++
  console.log(this.zIndex);
  window.addEventListener('mousemove', this.onMouseMove)
}

onDragOver(ev){ 
  // ev.target.style.zIndex = 2
  window.removeEventListener('mousemove', this.onMouseMove)
}

onMouseMove = (ev) => {  
  this.mouseX = ev.x
  this.mouseY = ev.y
  // this.socketService.emit('card move', {card:this.card,locX:this.mouseX, locY:this.mouseY})
}

  constructor(private socketService: SocketService,
    ) { }
  ngOnInit(): void {
    this.socketService.on('card moved', ({card,locX,locY}) => {   
    
      // this.card = card      
     })  

    // this.socketService.setup()
  }

}
