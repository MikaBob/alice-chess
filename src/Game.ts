import { King, PIECE_TYPE_KING } from './Pieces/King'
import { PAWN_INITIAL_ROW_BLACK, PAWN_INITIAL_ROW_WHITE, Pawn } from './Pieces/Pawn'
import Piece from './Pieces/Piece'
import { PIECE_TYPE_TOWER, Tower } from './Pieces/Tower'
import Square from './Square'
import { fromPositionToCoordinates, Position, isPositionInList, getNewPieceFromShortName, getNewPieceFromName, fromCoordinatesToPosition } from './Utils'
import { Bishop } from './Pieces/Bishop'
import { Knight } from './Pieces/Knight'
import { Queen } from './Pieces/Queen'

export const BOARD_ROWS = 8
export const BOARD_COLUMNS = 8

export type RegexParseMoveResult = {
    board: string
    piece: string | null
    from: string
    action: string
    to: string
    promotion: string | null
}

export default class Game {
    board: Square[][]
    secondBoard: Square[][]
    isWhiteTurnToPlay: boolean
    moveList: string[]

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
        this.moveList = []
    }

    public initChessSet() {
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
        this.addCastlingAsPossibleMoves()
    }

    public verifyMove(pieceToMove: Piece, positionTo: Position): boolean {
        if (pieceToMove.isWhite === this.isWhiteTurnToPlay && isPositionInList(positionTo, pieceToMove.possibleMoves)) {
            let tmpGame: Game = this.cloneGame()
            const tmpPieceToMove: Piece = pieceToMove.isOnMainBoard
                ? (tmpGame.board[pieceToMove.position.row][pieceToMove.position.column].piece as Piece)
                : (tmpGame.secondBoard[pieceToMove.position.row][pieceToMove.position.column].piece as Piece)
            tmpGame.executeMove(tmpPieceToMove, positionTo)
            tmpGame.isWhiteTurnToPlay = !tmpGame.isWhiteTurnToPlay // cancel changing turns
            tmpGame.calculateThreats()
            return !tmpGame.isKingUnderThreat()
        }
        return false
    }

    public executeMove(pieceToMove: Piece, positionTo: Position): void {
        let boardName = 'M'
        let deltaOfHorizontalSquares = pieceToMove.position.column - positionTo.column
        let moveName =
            pieceToMove.getShortName() +
            fromPositionToCoordinates(pieceToMove.position).toLowerCase() +
            (this.board[positionTo.row][positionTo.column].piece === null ? '-' : 'x') +
            fromPositionToCoordinates(positionTo).toLowerCase()

        if (pieceToMove.isOnMainBoard) {
            this.board[pieceToMove.position.row][pieceToMove.position.column].setPieceOnSquare(null) // empty square where it currently stands
            this.board[positionTo.row][positionTo.column].setPieceOnSquare(null) // empty square  where it will go
            this.secondBoard[positionTo.row][positionTo.column].setPieceOnSquare(pieceToMove) // move piece on the other board
        } else {
            this.secondBoard[pieceToMove.position.row][pieceToMove.position.column].setPieceOnSquare(null) // empty square where it currently stands
            this.secondBoard[positionTo.row][positionTo.column].setPieceOnSquare(null) // empty square where it will go
            this.board[positionTo.row][positionTo.column].setPieceOnSquare(pieceToMove) // move piece on the other board
            boardName = 'S'
        }

        // for castling, move also the tower
        if (pieceToMove.type === PIECE_TYPE_KING) {
            // a king moving by 2 squares can only be castling
            if (Math.abs(deltaOfHorizontalSquares) > 1) {
                let isBigCastle: boolean = deltaOfHorizontalSquares > 0 // positif = left of the king = big castling
                let tower: Tower = this.board[pieceToMove.position.row][isBigCastle ? 0 : 7].piece as Tower
                this.board[tower.position.row][tower.position.column].setPieceOnSquare(null) // empty square where tower currently stands
                this.secondBoard[tower.position.row][isBigCastle ? 3 : 5].setPieceOnSquare(tower) // move piece on the other board
                moveName = isBigCastle ? 'O-O-O' : 'O-O'
            }
        }

        this.moveList.push(boardName + moveName) // write history
        this.isWhiteTurnToPlay = !this.isWhiteTurnToPlay
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

    public calculateKingsMoves(): void {
        this.getKingOfColor(this.isWhiteTurnToPlay)?.calculatePossibleMoves(this) // re-calculate after calculating threats to prevent showing kings move to threaten squares
        this.addCastlingAsPossibleMoves()
    }

    private addCastlingAsPossibleMoves() {
        let bigCastlePossible = true
        let smallCastlePossible = true

        // check if king / tower haven't move in the game
        if (this.isWhiteTurnToPlay) {
            this.moveList.forEach((move: string) => {
                if (move.indexOf('MRa1') !== -1) bigCastlePossible = false
                if (move.indexOf('MRh1') !== -1) smallCastlePossible = false
                if (move.indexOf('MKe1') !== -1) {
                    bigCastlePossible = false
                    smallCastlePossible = false
                }
            })
        } else {
            this.moveList.forEach((move: string) => {
                if (move.indexOf('MRa8') !== -1) bigCastlePossible = false
                if (move.indexOf('MRh8') !== -1) smallCastlePossible = false
                if (move.indexOf('MKe8') !== -1) {
                    bigCastlePossible = false
                    smallCastlePossible = false
                }
            })
        }

        let king: King = this.getKingOfColor(this.isWhiteTurnToPlay) as King
        if (!king) throw new Error(`Could not find black king!`)

        const rowToCheck = this.isWhiteTurnToPlay ? 7 : 0
        if (king && king.position.row === rowToCheck && king.position.column === 4) {
            // check if squares are free in the main board and are not under threat on both boards
            let towerLeft: Piece | null = this.board[rowToCheck][0].piece
            if (
                bigCastlePossible &&
                towerLeft &&
                towerLeft.type === PIECE_TYPE_TOWER &&
                towerLeft.isWhite === this.isWhiteTurnToPlay &&
                this.board[rowToCheck][1].piece === null &&
                !this.board[rowToCheck][2].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay) &&
                !this.board[rowToCheck][3].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay) &&
                !this.secondBoard[rowToCheck][2].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay) &&
                !this.secondBoard[rowToCheck][3].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay)
            ) {
                bigCastlePossible = true
            } else bigCastlePossible = false

            let towerRight: Piece | null = this.board[rowToCheck][7].piece
            if (
                smallCastlePossible &&
                towerRight &&
                towerRight.type === PIECE_TYPE_TOWER &&
                towerRight.isWhite === this.isWhiteTurnToPlay &&
                !this.board[rowToCheck][6].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay) &&
                !this.board[rowToCheck][5].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay) &&
                !this.secondBoard[rowToCheck][6].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay) &&
                !this.secondBoard[rowToCheck][5].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay)
            ) {
                smallCastlePossible = true
            } else smallCastlePossible = false
        } else {
            bigCastlePossible = false
            smallCastlePossible = false
        }

        if (bigCastlePossible) king.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(this.board[rowToCheck][2])
        if (smallCastlePossible) king.addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(this.board[rowToCheck][6])
    }

    public getKingOfColor(ofColorWhite: boolean): King | null {
        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                if (this.board[i][j].piece !== null) if (this.board[i][j].piece?.type === PIECE_TYPE_KING && this.board[i][j].piece?.isWhite === ofColorWhite) return this.board[i][j].piece
                if (this.secondBoard[i][j].piece !== null)
                    if (this.secondBoard[i][j].piece?.type === PIECE_TYPE_KING && this.secondBoard[i][j].piece?.isWhite === ofColorWhite) return this.secondBoard[i][j].piece
            }
        }
        return null
    }

    public cloneGame(): Game {
        const clone: Game = new Game()
        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                clone.board[i][j].setPieceOnSquare(this.board[i][j].piece ? (this.board[i][j].piece as Piece).clone() : null)
                clone.secondBoard[i][j].setPieceOnSquare(this.secondBoard[i][j].piece ? (this.secondBoard[i][j].piece as Piece).clone() : null)
            }
        }

        clone.isWhiteTurnToPlay = this.isWhiteTurnToPlay ? true : false
        return clone
    }

    public cancelLastMove(): void {
        if (this.moveList.length < 1) return

        const moveListInReverse: string[] = this.moveList.toReversed()
        const lastMove: string = moveListInReverse.shift() as string

        const regexParseMove: RegExp = /^(?<board>M|S)(?<piece>K|N|Q|R|B)?(?<from>[a-h][1-8])(?<action>-|x)(?<to>[a-h][1-8])=?(?<promotion>N|Q|R|B)?$/
        const { board, piece, from, action, to, promotion } = regexParseMove.exec(lastMove)?.groups as RegexParseMoveResult

        const lastMoveWasOnMainBoard = board === 'M'
        const initialPositionOfLastMove: Position = fromCoordinatesToPosition(from)
        const finalPositionOfLastMove: Position = fromCoordinatesToPosition(to)

        if (lastMoveWasOnMainBoard) {
            this.board[initialPositionOfLastMove.row][initialPositionOfLastMove.column].setPieceOnSquare(this.secondBoard[finalPositionOfLastMove.row][finalPositionOfLastMove.column].piece)
            this.secondBoard[finalPositionOfLastMove.row][finalPositionOfLastMove.column].setPieceOnSquare(null)
        } else {
            this.secondBoard[initialPositionOfLastMove.row][initialPositionOfLastMove.column].setPieceOnSquare(this.board[finalPositionOfLastMove.row][finalPositionOfLastMove.column].piece)
            this.board[finalPositionOfLastMove.row][finalPositionOfLastMove.column].setPieceOnSquare(null)
        }

        this.moveList.pop()
        this.calculateThreats()
        this.calculateKingsMoves()
        this.isWhiteTurnToPlay = !this.isWhiteTurnToPlay

        /* 
        @TODO
        take back
            eating
            promoting
        */
    }

    public promotePawn(pawnToPromote: Pawn, pieceNameToPromoteTo: string): void {
        let newPiece: Piece | null = getNewPieceFromName(pieceNameToPromoteTo, pawnToPromote.isWhite)

        if (newPiece === null) {
            this.cancelLastMove()
            return
        }

        newPiece.position = pawnToPromote.position
        newPiece.isOnMainBoard = pawnToPromote.isOnMainBoard

        if (newPiece.isOnMainBoard) {
            this.board[newPiece.position.row][newPiece.position.column].setPieceOnSquare(newPiece)
        } else {
            this.secondBoard[newPiece.position.row][newPiece.position.column].setPieceOnSquare(newPiece)
        }

        const previousMove: string = this.moveList.pop() as string // remove pawn's move from the list
        this.moveList.push(previousMove + '=' + newPiece.getShortName()) // add promotion notation

        this.calculateThreats()
        this.calculateKingsMoves()
    }
}
