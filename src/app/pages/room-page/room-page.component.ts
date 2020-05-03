import { SocketService } from './../../services/socket.service';
import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss'],
})
export class RoomPageComponent implements OnInit {
  cards: Card[] = null;

  shuffle() {
    this.cardService.shuffle(this.cards);
  }

  constructor(
    private cardService: CardService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.cards = this.cardService.getDeck();
    this.cardService.shuffle(this.cards);
    this.socketService.setup()
    this.socketService.emit('entering room', this.cards)

  }
}
