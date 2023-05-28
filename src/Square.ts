import Piece from './Pieces/Piece'
import { Position } from './Utils'

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

    public hasSquareAPieceOfDifferentColorOrIsEmpty(pieceToCheckFor: Piece): boolean {
        // if square is not empty and pieces are of same color
        if (this.piece != null && pieceToCheckFor.isWhite === this.piece.isWhite) {
            return false
        }
        return true
    }
}
