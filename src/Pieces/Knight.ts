import Game from '../Game'
import Square from '../Square'
import Piece from './Piece'

export class Knight extends Piece {
    constructor(isWhite: boolean) {
        super('Knight', 'knight.png', isWhite)
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
}
