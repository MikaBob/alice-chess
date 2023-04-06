import Piece from './Pieces/Piece';

export default class Square {
    isWhite: boolean;
    piece: Piece | null;
    position: number[];

    constructor(x: number, y: number, isWhite: boolean) {
        this.position = [x, y];
        this.isWhite = isWhite;
        this.piece = null;
    }

    public setPieceOnTile(piece: Piece | null) {
        this.piece = piece;
        if (this.piece !== null) {
            this.piece.position = this.position;
        }
    }
}
