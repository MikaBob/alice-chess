import { Position } from './Utils'
import Piece from './Pieces/Piece'

export default class Square {
    isWhite: boolean
    piece: Piece | null
    position: Position
    isOnMainBoard: boolean
    isThreatenBy: Piece[]

    constructor(x: number, y: number, isWhite: boolean, isOnMainBoard = true) {
        this.position = { row: x, column: y }
        this.isWhite = isWhite
        this.piece = null
        this.isOnMainBoard = isOnMainBoard
        this.isThreatenBy = []
    }

    /**
     * Clear the square or put a piece on it
     * Will update the piece's position
     * @param piece
     */
    setPieceOnSquare(piece: Piece | null): void {
        this.piece = piece
        if (this.piece !== null) {
            this.piece.isOnMainBoard = this.isOnMainBoard
            this.piece.position = this.position
        }
    }

    /**
     * @param colorTrueForWhiteAndFalseForBlack
     * @returns true if the square has at least one threats of the given color
     */
    isThreatenedByColor(colorTrueForWhiteAndFalseForBlack: boolean): boolean {
        return this.isThreatenBy.find((piece: Piece) => piece.isWhite === colorTrueForWhiteAndFalseForBlack) !== undefined
    }

    /**
     *
     * @param colorTrueForWhiteAndFalseForBlack
     * @returns true if the square is empty and not under threat by the given color
     */
    isEmptyAndNotThreatenByColor(colorTrueForWhiteAndFalseForBlack: boolean): boolean {
        return this.piece === null && !this.isThreatenedByColor(colorTrueForWhiteAndFalseForBlack)
    }
}
