import { SocketService } from './../../services/socket.service';
import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Card } from 'src/app/models/card.model';
import { Player } from 'src/app/models/player.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss'],
})
export class RoomPageComponent implements OnInit {
  cards: Card[] = []
  players: Player[] = []
  roomId: number = null



  constructor(
    private cardService: CardService,
    private socketService: SocketService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.socketService.setup()
    this.route.params.subscribe(params => {
      this.roomId = params.id
    });
    this.socketService.emit('entering-room', this.roomId)
    this.cards = this.cardService.getDeck()
    this.cardService.shuffle(this.cards)
    this.createDemoPlayers()
    this.socketService.on('shuffled cards', cards => {
      console.log(cards);

      this.cards = cards
    })
  }

  shuffle() {
    this.cardService.shuffle(this.cards);
    this.socketService.emit('shuffeling', this.cards)
  }
  createDemoPlayers() {
    let player1 = { name: 'PLAYER1', _id: '1234' }
    let player2 = { name: 'PLAYER2', _id: '5678' }
    let player3 = { name: 'PLAYER3', _id: 'abcd' }
    let player4 = { name: 'PLAYER4', _id: 'dcba' }
    let player5 = { name: 'PLAYER5', _id: 'efgh' }
    let player6 = { name: 'PLAYER6', _id: 'hgfe' }
    this.players.push(this.cardService.createPlayer(player1),
      this.cardService.createPlayer(player2),
      this.cardService.createPlayer(player3),
      this.cardService.createPlayer(player4),
      this.cardService.createPlayer(player5),
      this.cardService.createPlayer(player6))
  }
}
