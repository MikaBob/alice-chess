import Game from '../Game'
import Piece from './Piece'
import Square from '../Square'

export const PIECE_TYPE_KING = 'King'

export class King extends Piece {
    constructor(isWhite: boolean) {
        super(PIECE_TYPE_KING, PIECE_TYPE_KING.toLowerCase(), isWhite)
    }

    calculatePossibleMoves(game: Game): void {
        this.possibleMoves = []

        const currentBoard: Square[][] = this.isOnMainBoard ? game.board : game.secondBoard
        const oppositeBoard: Square[][] = this.isOnMainBoard ? game.secondBoard : game.board

        for (let rowToCheck = this.position.row - 1; rowToCheck < this.position.row + 2; rowToCheck++) {
            for (let columnToCheck = this.position.column - 1; columnToCheck < this.position.column + 2; columnToCheck++) {
                if (rowToCheck === this.position.row && columnToCheck === this.position.column) continue
                if (
                    this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard) &&
                    !currentBoard[rowToCheck][columnToCheck].isThreatenedByColor(!this.isWhite) &&
                    !oppositeBoard[rowToCheck][columnToCheck].isThreatenedByColor(!this.isWhite)
                ) {
                    this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
                }
            }
        }
    }

    createNewPieceOfSameType(): King {
        return new King(this.isWhite)
    }

    getShortName(): string {
        return 'K'
    }
}
