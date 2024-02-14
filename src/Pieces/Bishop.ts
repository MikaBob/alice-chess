import Game, { BOARD_COLUMNS } from '../Game'
import Piece from './Piece'

export const PIECE_TYPE_BISHOP = 'Bishop'

export class Bishop extends Piece {
    constructor(isWhite: boolean) {
        super(PIECE_TYPE_BISHOP, PIECE_TYPE_BISHOP.toLowerCase(), isWhite)
    }

    calculatePossibleMoves(game: Game): void {
        this.possibleMoves = []

        // North-East
        for (let diagonalToCheck = 1; diagonalToCheck < BOARD_COLUMNS; diagonalToCheck++) {
            if (this.checkPossibleMove(this.position.row - diagonalToCheck, this.position.column + diagonalToCheck, game)) diagonalToCheck = BOARD_COLUMNS
        }

        // South-East
        for (let diagonalToCheck = 1; diagonalToCheck < BOARD_COLUMNS; diagonalToCheck++) {
            if (this.checkPossibleMove(this.position.row + diagonalToCheck, this.position.column + diagonalToCheck, game)) diagonalToCheck = BOARD_COLUMNS
        }

        // South-West
        for (let diagonalToCheck = 1; diagonalToCheck < BOARD_COLUMNS; diagonalToCheck++) {
            if (this.checkPossibleMove(this.position.row + diagonalToCheck, this.position.column - diagonalToCheck, game)) diagonalToCheck = BOARD_COLUMNS
        }

        // North-West
        for (let diagonalToCheck = 1; diagonalToCheck < BOARD_COLUMNS; diagonalToCheck++) {
            if (this.checkPossibleMove(this.position.row - diagonalToCheck, this.position.column - diagonalToCheck, game)) diagonalToCheck = BOARD_COLUMNS
        }
    }

    createNewPieceOfSameType(): Bishop {
        return new Bishop(this.isWhite)
    }

    getShortName(): string {
        return 'B'
    }
}
