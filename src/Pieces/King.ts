import Piece from './Piece';

export class King extends Piece {
    constructor(position: number[], isWhite: boolean) {
        super('King', position, 'king.png', isWhite);
    }
}
