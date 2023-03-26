import Piece from './Piece';

export class Queen extends Piece {
    constructor(position: number[], isWhite: boolean) {
        super('Queen', position, 'queen.png', isWhite);
    }
}
