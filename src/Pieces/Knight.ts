import Game from '../Game'
import Piece from './Piece'
import Square from '../Square'

export const PIECE_TYPE_KNIGHT = 'Knight'

export class Knight extends Piece {
    constructor(isWhite: boolean) {
        super(PIECE_TYPE_KNIGHT, PIECE_TYPE_KNIGHT.toLowerCase(), isWhite)
    }

    calculatePossibleMoves(game: Game): void {
        this.possibleMoves = []

        const currentBoard: Square[][] = this.isOnMainBoard ? game.board : game.secondBoard
        const oppositeBoard: Square[][] = this.isOnMainBoard ? game.secondBoard : game.board

        let rowToCheck: number = this.position.row
        let columnToCheck: number = this.position.column

        // North-East - 1
        rowToCheck = this.position.row - 2
        columnToCheck = this.position.column + 1
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // North-East -2
        rowToCheck = this.position.row - 1
        columnToCheck = this.position.column + 2
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // South-East - 1
        rowToCheck = this.position.row + 2
        columnToCheck = this.position.column + 1
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // South-East -2
        rowToCheck = this.position.row + 1
        columnToCheck = this.position.column + 2
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // South-West - 1
        rowToCheck = this.position.row + 2
        columnToCheck = this.position.column - 1
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // South-West -2
        rowToCheck = this.position.row + 1
        columnToCheck = this.position.column - 2
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // North-West - 1
        rowToCheck = this.position.row - 2
        columnToCheck = this.position.column - 1
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }

        // North-West -2
        rowToCheck = this.position.row - 1
        columnToCheck = this.position.column - 2
        if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
            this.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
        }
    }

    createNewPieceOfSameType(): Knight {
        return new Knight(this.isWhite)
    }

    getShortName(): string {
        return 'N'
    }
}
