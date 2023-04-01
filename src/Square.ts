import Piece from './Pieces/Piece';

export default class Square {
    isWhite: boolean;
    piece: Piece | null;
    position: number[];
    row: number;

    constructor(x: number, y: number, isWhite: boolean) {
        this.position = [x, y];
        this.isWhite = isWhite;
        this.row = 8 - y; // first row is at the bottom
        this.piece = null;
    }

    public setPieceOnTile(piece: Piece | null) {
        this.piece = piece;
    }
}
