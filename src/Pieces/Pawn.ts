import Game, { BOARD_ROWS } from '../Game'
import Square from '../Square'
import Piece from './Piece'

export class Pawn extends Piece {
    constructor(isWhite: boolean) {
        super('Pawn', 'pawn.png', isWhite)
    }

    calculatePossibleMoves(game: Game): void {
        this.possibleMoves = []

        const currentBoard: Square[][] = this.isOnMainBoard ? game.board : game.secondBoard
        const oppositeBoard: Square[][] = this.isOnMainBoard ? game.secondBoard : game.board

        // North
        if (this.position.row - 1 > -1) {
            for (let rowToCheck = this.position.row - 1; rowToCheck > 0; rowToCheck--) {
                if (oppositeBoard[rowToCheck][this.position.column].piece === null && this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][this.position.column])) {
                    rowToCheck = -1
                }
            }
        }

        // South
        if (this.position.row + 1 < BOARD_ROWS) {
            for (let rowToCheck = this.position.row + 1; rowToCheck < BOARD_ROWS; rowToCheck++) {
                if (oppositeBoard[rowToCheck][this.position.column].piece === null && this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][this.position.column])) {
                    rowToCheck = BOARD_ROWS
                }
            }
        }
    }
}
