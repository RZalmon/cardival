import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }
  names = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  suits = ["spades", "diamonds", "clubs", "hearts"];
  values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  public getDeck() {
    var deck = new Array();
    for (let i = 0; i < this.suits.length; i++) {
      for (let x = 0; x < this.values.length; x++) {
        var card = new Card(this.values[x], this.suits[i], this.names[x])
        card.setId()
        deck.push(card);
      }
    }
    return deck;
  }

  public shuffle(deck: Card[]) {
    // for 1000 turns
    // switch the values of two random cards
    for (var i = 0; i < 1000; i++) {
      var location1 = Math.floor((Math.random() * deck.length));
      var location2 = Math.floor((Math.random() * deck.length));
      var tmp = deck[location1];

      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }
  }
  public createPlayer(user){
    return new Player(user.name, user.boardLocation ,user._id)
  }
}
