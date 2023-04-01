import Piece from './Pieces/Piece';

export default class Square {
    isWhite: boolean;
    piece!: Piece;
    position: number[];
    row: number;

    constructor(x: number, y: number, isWhite: boolean) {
        this.position = [x, y];
        this.isWhite = isWhite;
        this.row = 8 - y; // first row is at the bottom
    }

    public setPieceOnTile(piece: Piece) {
        this.piece = piece;
    }
}
