export class Card {
    constructor(
        public value: number,
        public suit: string,
        public name: string,
        public loc: string = 'deck',
        public isShown?: boolean,
        public imgUrl?: string,
        public _id?: string,
        public top?:number,
        public left?:number,
        public dragPosition:any = {x: 0, y: 0},
        public zIndex?: number,
        
    ) { }

    setId?(length = 7) {
        var _id = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            _id += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        this._id = _id;
    }
}