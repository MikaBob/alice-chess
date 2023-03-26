import Piece from './Piece';

export class Pawn extends Piece {
    constructor(position: number[], isWhite: boolean) {
        super('Pawn', position, 'pawn.png', isWhite);
    }
}
