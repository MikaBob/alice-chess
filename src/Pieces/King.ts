import Piece from './Piece'

export class King extends Piece {
    constructor(isWhite: boolean) {
        super('King', 'king.png', isWhite)
    }
}
