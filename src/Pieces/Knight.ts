import Piece from './Piece';

export class Knight extends Piece {
    constructor(position: number[], isWhite: boolean) {
        super('Knight', position, 'knight.png', isWhite);
    }
}