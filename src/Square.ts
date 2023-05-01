import Piece from './Pieces/Piece'
import { Position } from './Utils'

export default class Square {
    isWhite: boolean
    piece: Piece | null
    position: Position
    isOnMainBoard: boolean

    constructor(x: number, y: number, isWhite: boolean, isOnMainBoard = true) {
        this.position = { row: x, column: y }
        this.isWhite = isWhite
        this.piece = null
        this.isOnMainBoard = isOnMainBoard
    }

    public setPieceOnTile(piece: Piece | null) {
        this.piece = piece
        if (this.piece !== null) {
            this.piece.isOnMainBoard = this.isOnMainBoard
            this.piece.position = this.position
        }
    }
}
