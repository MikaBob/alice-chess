import Game from '../Game'
import Square from '../Square'
import Piece from './Piece'

export const PIECE_TYPE_KING = 'King'

export class King extends Piece {
    constructor(isWhite: boolean) {
        super(PIECE_TYPE_KING, PIECE_TYPE_KING.toLowerCase(), isWhite)
    }

    calculatePossibleMoves(game: Game): void {
        this.possibleMoves = []

        const currentBoard: Square[][] = this.isOnMainBoard ? game.board : game.secondBoard
        const oppositeBoard: Square[][] = this.isOnMainBoard ? game.secondBoard : game.board

        let rowToCheck: number = this.position.row
        let columnToCheck: number = this.position.column

        // North
        rowToCheck--
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // North-East
        columnToCheck++
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // East
        rowToCheck++
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // South-East
        rowToCheck++
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // South
        columnToCheck--
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // South-West
        columnToCheck--
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // West
        rowToCheck--
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // North-West
        rowToCheck--
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }
    }

    createNewPieceOfSameType(): King {
        return new King(this.isWhite)
    }
}
