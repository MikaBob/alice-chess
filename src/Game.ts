import { Bishop } from './Pieces/Bishop'
import { King } from './Pieces/King'
import { Knight } from './Pieces/Knight'
import { Pawn } from './Pieces/Pawn'
import Piece from './Pieces/Piece'
import { Queen } from './Pieces/Queen'
import { Tower } from './Pieces/Tower'
import Square from './Square'
import { Position, isPositionInList } from './Utils'

export const BOARD_ROWS = 8
export const BOARD_COLUMNS = 8

export default class Game {
    board: Square[][]
    secondBoard: Square[][]
    isWhiteTurnToPlay: boolean

    constructor() {
        this.board = []
        this.secondBoard = []
        let isWhiteTile = 0
        for (let i = 0; i < BOARD_ROWS; i++) {
            this.board[i] = []
            this.secondBoard[i] = []
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                this.board[i][j] = new Square(i, j, isWhiteTile % 2 === 0)
                this.secondBoard[i][j] = new Square(i, j, isWhiteTile % 2 === 0, false)
                isWhiteTile++
            }
            isWhiteTile++ // alternate at each rows
        }
        this.initChessSet()
        this.isWhiteTurnToPlay = true
    }

    public initChessSet() {
        // black
        this.board[0][0].setPieceOnSquare(new Tower(false))
        this.board[0][7].setPieceOnSquare(new Tower(false))

        this.board[0][1].setPieceOnSquare(new Knight(false))
        this.board[0][6].setPieceOnSquare(new Knight(false))

        this.board[0][2].setPieceOnSquare(new Bishop(false))
        this.board[0][5].setPieceOnSquare(new Bishop(false))

        this.board[0][3].setPieceOnSquare(new Queen(false))
        this.board[0][4].setPieceOnSquare(new King(false))

        for (let i = 0; i < BOARD_COLUMNS; i++) {
            this.board[1][i].setPieceOnSquare(new Pawn(false))
        }

        // white
        this.board[7][0].setPieceOnSquare(new Tower(true))
        this.board[7][7].setPieceOnSquare(new Tower(true))

        this.board[7][1].setPieceOnSquare(new Knight(true))
        this.board[7][6].setPieceOnSquare(new Knight(true))

        this.board[7][2].setPieceOnSquare(new Bishop(true))
        this.board[7][5].setPieceOnSquare(new Bishop(true))

        this.board[7][3].setPieceOnSquare(new Queen(true))
        this.board[7][4].setPieceOnSquare(new King(true))

        for (let i = 0; i < BOARD_COLUMNS; i++) {
            this.board[6][i].setPieceOnSquare(new Pawn(true))
        }
    }

    public executeMove(pieceToMove: Piece, positionTo: Position): boolean {
        //console.log('before', pieceToMove.isWhite, this.isWhiteTurnToPlay, this.board[pieceToMove.position.row][pieceToMove.position.column], positionTo, pieceToMove, this.isWhiteTurnToPlay);

        if (pieceToMove.isWhite === this.isWhiteTurnToPlay && isPositionInList(positionTo, pieceToMove.possibleMoves)) {
            if (pieceToMove.isOnMainBoard) {
                this.board[pieceToMove.position.row][pieceToMove.position.column].setPieceOnSquare(null)
                this.board[positionTo.row][positionTo.column].setPieceOnSquare(null)
                this.secondBoard[positionTo.row][positionTo.column].setPieceOnSquare(pieceToMove)
            } else {
                this.secondBoard[pieceToMove.position.row][pieceToMove.position.column].setPieceOnSquare(null)
                this.secondBoard[positionTo.row][positionTo.column].setPieceOnSquare(null)
                this.board[positionTo.row][positionTo.column].setPieceOnSquare(pieceToMove)
            }

            this.isWhiteTurnToPlay = !this.isWhiteTurnToPlay
            //console.log('after', pieceToMove.isWhite, this.isWhiteTurnToPlay, this.board[pieceToMove.position.row][pieceToMove.position.column], positionTo, pieceToMove, this.isWhiteTurnToPlay);
            return true
        }
        return false
    }
}
