import Piece from './Piece'

export class Tower extends Piece {
    constructor(isWhite: boolean) {
        super('Tower', 'tower.png', isWhite)
    }
}
