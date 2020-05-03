import { Card } from './card.model';

export class Player {
    constructor(
        public name: string,
        public _id: string,
        public hand: Card[] = [],
        public isHost: boolean = false,
        public imgUrl?: string,
    ) { }
}