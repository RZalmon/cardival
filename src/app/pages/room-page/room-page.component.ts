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
  cards: Card[] = [];
  players: Player[] = [];
  roomId: number = null;
  playerCount: number = 0;

  constructor(
    private cardService: CardService,
    private socketService: SocketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.socketService.setup();
    this.route.params.subscribe((params) => {
      this.roomId = params.id;
    });
    this.socketService.emit('entering-room', this.roomId);
    this.cards = this.cardService.getDeck();
    this.cardService.shuffle(this.cards);
    this.createDemoPlayers();
    this.socketService.on('shuffled cards', (cards) => {
      this.cards = cards;
    });
  }

  get playersCount() {
    this.playerCount++;
    console.log('PLAYER' + this.playerCount);

    return 'PLAYER' + this.playerCount;
  }

  shuffle() {
    this.cardService.shuffle(this.cards);
    this.socketService.emit('shuffeling', this.cards);
  }
  createDemoPlayers() {
    let player1 = { name: 'someone1', boardLocation: 'PLAYER1', _id: '1234' };
    let player2 = { name: 'someone2', boardLocation: 'PLAYER2', _id: '5678' };
    let player3 = { name: 'someone3', boardLocation: 'PLAYER3', _id: '8897' };
    let player4 = { name: 'someone4', boardLocation: 'PLAYER4', _id: '5555' };
    let player5 = { name: 'someone5', boardLocation: 'PLAYER5', _id: 'efgh' };
    let player6 = { name: 'someone6', boardLocation: 'PLAYER6', _id: 'hgfe' };
    
    this.players.push(
      this.cardService.createPlayer(player1),
      this.cardService.createPlayer(player2),
      this.cardService.createPlayer(player3),
      this.cardService.createPlayer(player4),
      this.cardService.createPlayer(player5),
      this.cardService.createPlayer(player6)
    );
    console.log(this.players);
    
  }
}
