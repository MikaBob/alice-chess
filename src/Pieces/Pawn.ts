import Game from '../Game'
import Square from '../Square'
import Piece from './Piece'

export const PAWN_INITIAL_ROW_WHITE = 6
export const PAWN_INITIAL_ROW_BLACK = 1

export class Pawn extends Piece {
    constructor(isWhite: boolean) {
        super('Pawn', 'pawn.png', isWhite)
    }

    calculatePossibleMoves(game: Game): void {
        this.possibleMoves = []

        const currentBoard: Square[][] = this.isOnMainBoard ? game.board : game.secondBoard
        const oppositeBoard: Square[][] = this.isOnMainBoard ? game.secondBoard : game.board

        let rowToCheck: number = this.position.row
        let columnToCheck: number = this.position.column

        if (this.isWhite) {
            // North - 1 square
            rowToCheck--
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard) && currentBoard[rowToCheck][columnToCheck].piece === null) {
                this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
            }

            // North-East
            columnToCheck++
            if (
                this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard) &&
                currentBoard[rowToCheck][columnToCheck].piece !== null &&
                currentBoard[rowToCheck][columnToCheck].piece?.isWhite !== this.isWhite
            ) {
                this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
            }

            // North-West
            columnToCheck -= 2
            if (
                this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard) &&
                currentBoard[rowToCheck][columnToCheck].piece !== null &&
                currentBoard[rowToCheck][columnToCheck].piece?.isWhite !== this.isWhite
            ) {
                this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
            }

            // North - 2 Squares
            if (this.position.row === PAWN_INITIAL_ROW_WHITE) {
                rowToCheck--
                columnToCheck = this.position.column
                if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard) && currentBoard[rowToCheck][columnToCheck].piece === null) {
                    this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
                }
            }
        } else {
            // South - 1 square
            rowToCheck++
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard) && currentBoard[rowToCheck][columnToCheck].piece === null) {
                this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
            }

            // South-East
            columnToCheck++
            if (
                this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard) &&
                currentBoard[rowToCheck][columnToCheck].piece !== null &&
                currentBoard[rowToCheck][columnToCheck].piece?.isWhite !== this.isWhite
            ) {
                this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
            }

            // South-West
            columnToCheck -= 2
            if (
                this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard) &&
                currentBoard[rowToCheck][columnToCheck].piece !== null &&
                currentBoard[rowToCheck][columnToCheck].piece?.isWhite !== this.isWhite
            ) {
                this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
            }

            // South - 2 Squares
            if (this.position.row === PAWN_INITIAL_ROW_BLACK) {
                rowToCheck++
                columnToCheck = this.position.column
                if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard) && currentBoard[rowToCheck][columnToCheck].piece === null) {
                    this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
                }
            }
        }
    }
}
