import Piece from './Piece'

export class Queen extends Piece {
    constructor(isWhite: boolean) {
        super('Queen', 'queen.png', isWhite)
    }
}
