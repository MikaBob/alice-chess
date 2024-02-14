import Game, { BOARD_COLUMNS, BOARD_ROWS } from '../Game'
import Piece from './Piece'

export const PIECE_TYPE_QUEEN = 'Queen'

export class Queen extends Piece {
    constructor(isWhite: boolean) {
        super(PIECE_TYPE_QUEEN, PIECE_TYPE_QUEEN.toLowerCase(), isWhite)
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

        // North
        for (let rowToCheck = this.position.row - 1; rowToCheck > -1; rowToCheck--) {
            if (this.checkPossibleMove(rowToCheck, this.position.column, game)) rowToCheck = -1
        }

        // South
        for (let rowToCheck = this.position.row + 1; rowToCheck < BOARD_ROWS; rowToCheck++) {
            if (this.checkPossibleMove(rowToCheck, this.position.column, game)) rowToCheck = BOARD_ROWS
        }

        // East
        for (let columnToCheck = this.position.column + 1; columnToCheck < BOARD_COLUMNS; columnToCheck++) {
            if (this.checkPossibleMove(this.position.row, columnToCheck, game)) columnToCheck = BOARD_COLUMNS
        }

        // West
        for (let columnToCheck = this.position.column - 1; columnToCheck > -1; columnToCheck--) {
            if (this.checkPossibleMove(this.position.row, columnToCheck, game)) columnToCheck = -1
        }
    }

    createNewPieceOfSameType(): Queen {
        return new Queen(this.isWhite)
    }

    getShortName(): string {
        return 'Q'
    }
}
