import Game, { BOARD_COLUMNS, BOARD_ROWS } from '../Game'
import Square from '../Square'
import Piece from './Piece'

export const PIECE_TYPE_QUEEN = 'Queen'

export class Queen extends Piece {
    constructor(isWhite: boolean) {
        super(PIECE_TYPE_QUEEN, PIECE_TYPE_QUEEN.toLowerCase(), isWhite)
    }

    calculatePossibleMoves(game: Game): void {
        this.possibleMoves = []

        const currentBoard: Square[][] = this.isOnMainBoard ? game.board : game.secondBoard
        const oppositeBoard: Square[][] = this.isOnMainBoard ? game.secondBoard : game.board

        // North
        for (let rowToCheck = this.position.row - 1; rowToCheck > -1; rowToCheck--) {
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, this.position.column, oppositeBoard)) {
                if (this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][this.position.column])) {
                    rowToCheck = -1
                }
            }
        }

        // North-East
        for (let diagonalToCheck = 1; diagonalToCheck < BOARD_COLUMNS; diagonalToCheck++) {
            const rowToCheck: number = this.position.row - diagonalToCheck
            const columnToCheck: number = this.position.column + diagonalToCheck
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
                if (this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])) {
                    diagonalToCheck = BOARD_COLUMNS
                }
            }
        }

        // East
        for (let columnToCheck = this.position.column + 1; columnToCheck < BOARD_COLUMNS; columnToCheck++) {
            if (this.checkBoundariesAndOppositeBoard(this.position.row, columnToCheck, oppositeBoard)) {
                if (this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[this.position.row][columnToCheck])) {
                    columnToCheck = BOARD_COLUMNS
                }
            }
        }

        // South-East
        for (let diagonalToCheck = 1; diagonalToCheck < BOARD_COLUMNS; diagonalToCheck++) {
            const rowToCheck: number = this.position.row + diagonalToCheck
            const columnToCheck: number = this.position.column + diagonalToCheck
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
                if (this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])) {
                    diagonalToCheck = BOARD_COLUMNS
                }
            }
        }

        // South
        for (let rowToCheck = this.position.row + 1; rowToCheck < BOARD_ROWS; rowToCheck++) {
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, this.position.column, oppositeBoard)) {
                if (this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][this.position.column])) {
                    rowToCheck = BOARD_ROWS
                }
            }
        }

        // South-West
        for (let diagonalToCheck = 1; diagonalToCheck < BOARD_COLUMNS; diagonalToCheck++) {
            const rowToCheck: number = this.position.row + diagonalToCheck
            const columnToCheck: number = this.position.column - diagonalToCheck
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
                if (this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])) {
                    diagonalToCheck = BOARD_COLUMNS
                }
            }
        }

        // West
        for (let columnToCheck = this.position.column - 1; columnToCheck > -1; columnToCheck--) {
            if (this.checkBoundariesAndOppositeBoard(this.position.row, columnToCheck, oppositeBoard)) {
                if (this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[this.position.row][columnToCheck])) {
                    columnToCheck = -1
                }
            }
        }

        // North-West
        for (let diagonalToCheck = 1; diagonalToCheck < BOARD_COLUMNS; diagonalToCheck++) {
            const rowToCheck: number = this.position.row - diagonalToCheck
            const columnToCheck: number = this.position.column - diagonalToCheck
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
                if (this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])) {
                    diagonalToCheck = BOARD_COLUMNS
                }
            }
        }
    }

    createNewPieceOfSameType(): Queen {
        return new Queen(this.isWhite)
    }
}
