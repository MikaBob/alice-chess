import Game, { BOARD_COLUMNS, BOARD_ROWS } from '../Game'
import Square from '../Square'
import Piece from './Piece'

export const PIECE_TYPE_TOWER = 'Tower'

export class Tower extends Piece {
    constructor(isWhite: boolean) {
        super(PIECE_TYPE_TOWER, PIECE_TYPE_TOWER.toLowerCase(), isWhite)
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

        // East
        for (let columnToCheck = this.position.column + 1; columnToCheck < BOARD_COLUMNS; columnToCheck++) {
            if (this.checkBoundariesAndOppositeBoard(this.position.row, columnToCheck, oppositeBoard)) {
                if (this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[this.position.row][columnToCheck])) {
                    columnToCheck = BOARD_COLUMNS
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

        // West
        for (let columnToCheck = this.position.column - 1; columnToCheck > -1; columnToCheck--) {
            if (this.checkBoundariesAndOppositeBoard(this.position.row, columnToCheck, oppositeBoard)) {
                if (this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[this.position.row][columnToCheck])) {
                    columnToCheck = -1
                }
            }
        }
    }

    createNewPieceOfSameType(): Tower {
        return new Tower(this.isWhite)
    }

    getShortName(): string {
        return 'R'
    }
}
