import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Card } from 'src/app/models/card.model';


@Component({
  selector: 'room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {
  cards: Card[] = null

  shuffle(ev){
    this.cardService.shuffle(this.cards)
    console.log(ev);
  }

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cards = this.cardService.getDeck()
    this.cardService.shuffle(this.cards)
  }
}
