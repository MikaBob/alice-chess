import { Bishop } from './Bishop'
import { Knight } from './Knight'
import { Queen } from './Queen'
import { Tower } from './Tower'
import Game from '../Game'
import Piece from './Piece'
import Square from '../Square'

export const PIECE_TYPE_PAWN = 'Pawn'
export const PAWN_INITIAL_ROW_WHITE = 6
export const PAWN_INITIAL_ROW_BLACK = 1

export class Pawn extends Piece {
    constructor(isWhite: boolean) {
        super(PIECE_TYPE_PAWN, PIECE_TYPE_PAWN.toLowerCase(), isWhite)
    }

    /**
     * Diagonals are not actually a normal move.
     * It's is an exceptional move when an enemy is present
     * and normal moves do not eat other pieces, therefore are not threats
     */
    pawnOverrideForAddSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(square: Square, isAnActualMove: boolean = true): boolean {
        if (square.hasSquareAPieceOfDifferentColorOrIsEmpty(this)) {
            if (isAnActualMove || (square.piece !== null && square.piece.isWhite !== this.isWhite)) this.possibleMoves.push(square.position)
            else square.isThreatenBy.push(this)
        }
        return square.piece !== null
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
                this.pawnOverrideForAddSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
            }

            // North-East
            columnToCheck++
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
                this.pawnOverrideForAddSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck], false)
            }

            // North-West
            columnToCheck -= 2
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
                this.pawnOverrideForAddSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck], false)
            }

            // North - 2 Squares
            if (this.position.row === PAWN_INITIAL_ROW_WHITE) {
                rowToCheck--
                columnToCheck = this.position.column
                if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard) && currentBoard[rowToCheck][columnToCheck].piece === null) {
                    this.pawnOverrideForAddSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
                }
            }
        } else {
            // South - 1 square
            rowToCheck++
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard) && currentBoard[rowToCheck][columnToCheck].piece === null) {
                this.pawnOverrideForAddSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
            }

            // South-East
            columnToCheck++
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
                this.pawnOverrideForAddSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck], false)
            }

            // South-West
            columnToCheck -= 2
            if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard)) {
                this.pawnOverrideForAddSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck], false)
            }

            // South - 2 Squares
            if (this.position.row === PAWN_INITIAL_ROW_BLACK) {
                rowToCheck++
                columnToCheck = this.position.column
                if (this.checkBoundariesAndOppositeBoard(rowToCheck, columnToCheck, oppositeBoard) && currentBoard[rowToCheck][columnToCheck].piece === null) {
                    this.pawnOverrideForAddSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(currentBoard[rowToCheck][columnToCheck])
                }
            }
        }
    }

    getPossiblePromotions(): Piece[] {
        return [new Knight(this.isWhite), new Bishop(this.isWhite), new Tower(this.isWhite), new Queen(this.isWhite)]
    }

    createNewPieceOfSameType(): Pawn {
        return new Pawn(this.isWhite)
    }

    getShortName(): string {
        return ''
    }
}
