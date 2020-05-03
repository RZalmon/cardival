import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Card } from 'src/app/models/card.model';
import { Player } from 'src/app/models/player.model';


@Component({
  selector: 'room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {
  cards: Card[] = []
  players: Player[] = []

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cards = this.cardService.getDeck()
    this.cardService.shuffle(this.cards)
    this.createDemoPlayers()
  }

  shuffle(ev){
    this.cardService.shuffle(this.cards)
  }

  createDemoPlayers(){
    let player1 = {name: 'PLAYER1', _id: '1234'}
    let player2 = {name: 'PLAYER2', _id: '5678'}
    this.players.push(this.cardService.createPlayer(player1), this.cardService.createPlayer(player2))
  }
}
