import { Position } from '../Utils'
import Piece from './Piece'

export class Bishop extends Piece {
    constructor(position: Position, isWhite: boolean) {
        super('Bishop', position, 'bishop.png', isWhite)
    }
}
