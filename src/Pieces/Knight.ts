import Piece from './Piece'

export class Knight extends Piece {
    constructor(isWhite: boolean) {
        super('Knight', 'knight.png', isWhite)
    }
}
