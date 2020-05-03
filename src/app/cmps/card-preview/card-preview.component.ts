import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {
  @Input() card: Card;

  constructor() { }

  get suit() {
    return `./assets/img/${this.card.suit}.svg`
  }

  ngOnInit(): void {
    console.log(this.card);

  }

}
