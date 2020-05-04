import { Card } from './card.model';
import { Player } from './player.model';

export class Room {
    constructor(
        public name: string,
        public host: Player,
        public hand: Card[] = [],
        public deck: Player[] = [],
        public _id?: string,
    ) { }
}