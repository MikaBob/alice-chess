import { Bishop } from './Pieces/Bishop'
import { King, PIECE_TYPE_KING } from './Pieces/King'
import { Knight } from './Pieces/Knight'
import { PAWN_INITIAL_ROW_BLACK, PAWN_INITIAL_ROW_WHITE, Pawn } from './Pieces/Pawn'
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
            this.board[PAWN_INITIAL_ROW_BLACK][i].setPieceOnSquare(new Pawn(false))
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
            this.board[PAWN_INITIAL_ROW_WHITE][i].setPieceOnSquare(new Pawn(true))
        }
        this.calculateThreats()
    }

    public verifyMove(pieceToMove: Piece, positionTo: Position): boolean {
        if (pieceToMove.isWhite === this.isWhiteTurnToPlay && isPositionInList(positionTo, pieceToMove.possibleMoves)) {
            // Kings can't move on a threaten square
            if (pieceToMove.type === PIECE_TYPE_KING) {
                const kingsCurrentBoard: Square[][] = pieceToMove.isOnMainBoard ? this.board : this.secondBoard
                const piecesThreateningKingsNewPosition: Piece[] = kingsCurrentBoard[positionTo.row][positionTo.column].isThreatenBy
                //console.log((pieceToMove.isWhite ? 'white' : 'black') + ' king is moving', piecesThreateningKingsNewPosition)
                for (let i = 0; i < piecesThreateningKingsNewPosition.length; i++) {
                    if (piecesThreateningKingsNewPosition[i].isWhite !== pieceToMove.isWhite) {
                        return false
                    }
                }
            }

            let tmpGame: Game | null = this.cloneGame()
            const tmpPieceToMove: Piece = pieceToMove.clone()
            tmpGame.executeMove(tmpPieceToMove, positionTo)
            tmpGame.isWhiteTurnToPlay = !tmpGame.isWhiteTurnToPlay // cancel changing turns
            tmpGame.calculateThreats()
            if (tmpGame.isKingUnderThreat()) {
                tmpGame = null
            }
            return tmpGame !== null
        }
        return false
    }

    public executeMove(pieceToMove: Piece, positionTo: Position): void {
        //console.log('before', pieceToMove.isWhite, this.isWhiteTurnToPlay, this.board[pieceToMove.position.row][pieceToMove.position.column], positionTo, pieceToMove, this.isWhiteTurnToPlay);
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
    }

    public calculateThreats(): void {
        // reset all threats
        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                this.board[i][j].isThreatenBy = []
                this.secondBoard[i][j].isThreatenBy = []
            }
        }

        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                if (this.board[i][j].piece !== null) this.board[i][j].piece?.calculatePossibleMoves(this)
                if (this.secondBoard[i][j].piece !== null) this.secondBoard[i][j].piece?.calculatePossibleMoves(this)
            }
        }
    }

    public isKingUnderThreat(): boolean {
        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                if (this.board[i][j].piece !== null) {
                    if (this.board[i][j].piece?.type === PIECE_TYPE_KING && this.board[i][j].piece?.isWhite === this.isWhiteTurnToPlay && this.board[i][j].isThreatenBy.length > 0) {
                        //console.log(`Check on ${this.board[i][j].piece?.isWhite ? 'white' : 'black'} king (Main board)`, this.board[i][j], this.secondBoard[i][j])
                        return true
                    }
                }

                if (this.secondBoard[i][j].piece !== null) {
                    if (this.secondBoard[i][j].piece?.type === PIECE_TYPE_KING && this.secondBoard[i][j].piece?.isWhite === this.isWhiteTurnToPlay && this.secondBoard[i][j].isThreatenBy.length > 0) {
                        //console.log(`Check on ${this.board[i][j].piece?.isWhite ? 'white' : 'black'} king (Second board)`, this.board[i][j], this.secondBoard[i][j])
                        return true
                    }
                }
            }
        }
        return false
    }

    public cloneGame(): Game {
        const clone: Game = new Game()
        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                clone.board[i][j].setPieceOnSquare(this.board[i][j].piece)
                clone.secondBoard[i][j].setPieceOnSquare(this.secondBoard[i][j].piece)
            }
        }

        clone.isWhiteTurnToPlay = this.isWhiteTurnToPlay ? true : false
        return clone
    }
}
