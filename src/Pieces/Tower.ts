import Piece from './Piece';

export class Tower extends Piece {
    constructor(position: number[], isWhite: boolean) {
        super('Tower', position, 'tower.png', isWhite);
    }
}
