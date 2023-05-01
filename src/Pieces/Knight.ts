import { Position } from '../Utils'
import Piece from './Piece'

export class Knight extends Piece {
    constructor(position: Position, isWhite: boolean) {
        super('Knight', position, 'knight.png', isWhite)
    }
}
