import { Position } from '../Utils'
import Piece from './Piece'

export class Queen extends Piece {
    constructor(position: Position, isWhite: boolean) {
        super('Queen', position, 'queen.png', isWhite)
    }
}
