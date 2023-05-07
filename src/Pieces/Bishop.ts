import Piece from './Piece'

export class Bishop extends Piece {
    constructor(isWhite: boolean) {
        super('Bishop', 'bishop.png', isWhite)
    }
}
