import { Position } from '../Utils';
import Piece from './Piece';

export class King extends Piece {
    constructor(position: Position, isWhite: boolean) {
        super('King', position, 'king.png', isWhite);
    }
}
