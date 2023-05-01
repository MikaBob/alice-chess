import { Position } from '../Utils'
import Piece from './Piece'

export class Pawn extends Piece {
    constructor(position: Position, isWhite: boolean) {
        super('Pawn', position, 'pawn.png', isWhite)
    }
}
