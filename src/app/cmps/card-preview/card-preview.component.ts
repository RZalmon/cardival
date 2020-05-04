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
  @Input() zIndex:number;
  @Output() onUpdateZIndex = new EventEmitter<any>();


  currCard:Card = null
  mouseX:number = null;
  mouseY:number = null;

get suit(){
  return `./assets/img/${this.card.suit}.svg`;
}

onDragStart(card, ev) {
 // console.log('here')
  ev.target.style.zIndex = this.zIndex + ''
  this.onUpdateZIndex.emit()
  console.log(this.zIndex);
  window.addEventListener('mousemove', this.onMouseMove)
}

onDragOver(ev){ 
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
