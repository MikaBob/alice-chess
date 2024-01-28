import Game, { BOARD_COLUMNS } from '../Game'
import Piece from './Piece'
import Square from '../Square'

export const PIECE_TYPE_BISHOP = 'Bishop'

export class Bishop extends Piece {
    constructor(isWhite: boolean) {
        super(PIECE_TYPE_BISHOP, PIECE_TYPE_BISHOP.toLowerCase(), isWhite)
    }

    calculatePossibleMoves(game: Game): void {
        this.possibleMoves = []

        const currentBoard: Square[][] = this.isOnMainBoard ? game.board : game.secondBoard
        const oppositeBoard: Square[][] = this.isOnMainBoard ? game.secondBoard : game.board

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

    createNewPieceOfSameType(): Bishop {
        return new Bishop(this.isWhite)
    }

    getShortName(): string {
        return 'B'
    }
}
