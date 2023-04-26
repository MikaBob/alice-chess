import { Position } from '../Utils';
import Piece from './Piece';

export class Tower extends Piece {
    constructor(position: Position, isWhite: boolean) {
        super('Tower', position, 'tower.png', isWhite);
    }
}
