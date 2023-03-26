import Piece from './Piece';

export class Bishop extends Piece {
    constructor(position: number[], isWhite: boolean) {
        super('Bishop', position, 'bishop.png', isWhite);
    }
}
