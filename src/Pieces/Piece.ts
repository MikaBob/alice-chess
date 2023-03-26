export default class Piece {
    type: string;
    position: number[];
    img: string;
    isWhite: boolean;
    constructor(type: string, position: number[], img: string, isWhite: boolean) {
        this.type = type;
        this.position = position;
        this.isWhite = isWhite;
        this.img = (this.isWhite ? 'white/' : 'black/') + img;
    }
}
