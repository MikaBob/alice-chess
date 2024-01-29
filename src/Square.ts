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

    public setPieceOnSquare(piece: Piece | null) {
        this.piece = piece
        if (this.piece !== null) {
            this.piece.isOnMainBoard = this.isOnMainBoard
            this.piece.position = this.position
        }
    }

    public isThreatenByColor(colorTrueForWhiteAndFalseForBlack: boolean): boolean {
        return this.isThreatenBy.find((piece: Piece) => piece.isWhite === colorTrueForWhiteAndFalseForBlack) !== undefined
    }

    public isEmptyAndNotThreatenByColor(colorTrueForWhiteAndFalseForBlack: boolean): boolean {
        return this.piece === null && this.isThreatenBy.find((piece: Piece) => piece.isWhite === colorTrueForWhiteAndFalseForBlack) !== undefined
    }
}
