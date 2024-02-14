import { Position } from '../Utils'
import Game from '../Game'
import Piece from './Piece'

export const PIECE_TYPE_KNIGHT = 'Knight'

export class Knight extends Piece {
    constructor(isWhite: boolean) {
        super(PIECE_TYPE_KNIGHT, PIECE_TYPE_KNIGHT.toLowerCase(), isWhite)
    }

    calculatePossibleMoves(game: Game): void {
        this.possibleMoves = []

        let positionsToCheck: Position[] = [
            { row: this.position.row - 2, column: this.position.column + 1 }, // North-East - 1
            { row: this.position.row - 1, column: this.position.column + 2 }, // North-East - 2
            { row: this.position.row + 2, column: this.position.column + 1 }, // South-East - 1
            { row: this.position.row + 1, column: this.position.column + 2 }, // South-East - 2
            { row: this.position.row + 2, column: this.position.column - 1 }, // South-West - 1
            { row: this.position.row + 1, column: this.position.column - 2 }, // South-West - 2
            { row: this.position.row - 2, column: this.position.column - 1 }, // North-West - 1
            { row: this.position.row - 1, column: this.position.column - 2 }, // North-West - 2
        ]

        positionsToCheck.forEach((positionToCheck: Position) => {
            this.checkPossibleMove(positionToCheck.row, positionToCheck.column, game)
        })
    }

    createNewPieceOfSameType(): Knight {
        return new Knight(this.isWhite)
    }

    getShortName(): string {
        return 'N'
    }
}
