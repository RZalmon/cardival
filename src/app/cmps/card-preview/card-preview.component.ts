import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
// import ass from '../../../assets/img/clubs.svg'

@Component({
  selector: 'card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {
  @Input() card: Card;

get suit(){
  let {suit} = this.card;
switch (suit) {
  case 'hearts':
   return '../../../assets/img/hearts.svg'
   break;
   case 'diamonds':
    return '../../../assets/img/diamonds.svg'
    break;
    case 'spades':
      return '../../../assets/img/spades.svg'
      break;
         case 'clubs':
          return '../../../assets/img/clubs.svg'
          break;
  default:
}
}

  constructor() { }

  ngOnInit(): void {
    console.log(this.card);
    
  }

}
