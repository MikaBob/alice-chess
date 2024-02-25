import { Bishop } from './Pieces/Bishop'
import { fromPositionToCoordinates, Position, isPositionInList, getNewPieceFromShortName, getNewPieceFromName, fromCoordinatesToPosition } from './Utils'
import { KING_INITIAL_COLUMN, King, PIECE_TYPE_KING } from './Pieces/King'
import { Knight } from './Pieces/Knight'
import { PAWN_INITIAL_ROW_BLACK, PAWN_INITIAL_ROW_WHITE, Pawn } from './Pieces/Pawn'
import { PIECE_TYPE_TOWER, Tower } from './Pieces/Tower'
import { Queen } from './Pieces/Queen'
import Piece from './Pieces/Piece'
import Square from './Square'

const MAIN_BOARD_SHORT_NAME = 'M'
const SECOND_BOARD_SHORT_NAME = 'S'
const BIG_CASTLING_SHORT_NAME = 'O-O-O'
const SMALL_CASTLING_SHORT_NAME = 'O-O'
const REGEX_PARSE_MOVE: RegExp = /^(?<board>M|S)(?<piece>K|N|Q|R|B)?(?<from>[a-h][1-8])(?<action>-|x)(?<to>[a-h][1-8])=?(?<promotion>N|Q|R|B)?$/

type RegexParseMoveResult = {
    action: string | undefined
    board: string | undefined
    from: string | undefined
    piece: string | undefined
    promotion: string | undefined
    to: string | undefined
}

export type ParsedMoveFromMoveList = {
    board: Square[][]
    from: Position
    initiatedOnMainBoard: boolean
    isEatingAPiece: boolean
    move: string
    moveAlreadyExecuted: boolean
    piece: Piece
    promotion: Piece | null
    to: Position
}

export const BOARD_COLUMNS = 8
export const BOARD_ROWS = 8
export default class Game {
    board: Square[][]
    secondBoard: Square[][]
    isWhiteTurnToPlay: boolean
    moveList: string[]

    constructor() {
        this.board = []
        this.secondBoard = []
        let isWhiteTile = 0

        // squares
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

    /**
     * Create and initialize pieces on the board
     */
    initChessSet(): void {
        // Black
        this.board[0][0].setPieceOnSquare(new Tower(false))
        this.board[0][7].setPieceOnSquare(new Tower(false))

        this.board[0][1].setPieceOnSquare(new Knight(false))
        this.board[0][6].setPieceOnSquare(new Knight(false))

        this.board[0][2].setPieceOnSquare(new Bishop(false))
        this.board[0][5].setPieceOnSquare(new Bishop(false))

        this.board[0][3].setPieceOnSquare(new Queen(false))
        this.board[0][KING_INITIAL_COLUMN].setPieceOnSquare(new King(false))

        for (let i = 0; i < BOARD_COLUMNS; i++) {
            this.board[PAWN_INITIAL_ROW_BLACK][i].setPieceOnSquare(new Pawn(false))
        }

        // White
        this.board[7][0].setPieceOnSquare(new Tower(true))
        this.board[7][7].setPieceOnSquare(new Tower(true))

        this.board[7][1].setPieceOnSquare(new Knight(true))
        this.board[7][6].setPieceOnSquare(new Knight(true))

        this.board[7][2].setPieceOnSquare(new Bishop(true))
        this.board[7][5].setPieceOnSquare(new Bishop(true))

        this.board[7][3].setPieceOnSquare(new Queen(true))
        this.board[7][KING_INITIAL_COLUMN].setPieceOnSquare(new King(true))

        for (let i = 0; i < BOARD_COLUMNS; i++) {
            this.board[PAWN_INITIAL_ROW_WHITE][i].setPieceOnSquare(new Pawn(true))
        }

        this.calculateThreats()
        this.addCastlingAsPossibleMoves() // In case we change the set, we could castle at the 1st turn
    }

    /**
     * Verify ahead if a move is valid by executing it in a cloned game
     *
     * @param pieceToMove
     * @param positionTo
     * @returns true if the move is valid
     */
    verifyMove(pieceToMove: Piece | null, positionTo: Position): boolean {
        if (pieceToMove === null) return false
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

    /**
     * Move a piece without checking if it is in its possible moves.
     * Will add the move in the move list (history)
     * Change turns
     *
     * @param pieceToMove
     * @param positionTo
     */
    executeMove(pieceToMove: Piece, positionTo: Position): void {
        let boardName = MAIN_BOARD_SHORT_NAME
        let moveName =
            pieceToMove.getShortName() +
            fromPositionToCoordinates(pieceToMove.position).toLowerCase() +
            (this.board[positionTo.row][positionTo.column].piece !== null || this.secondBoard[positionTo.row][positionTo.column].piece !== null ? 'x' : '-') +
            fromPositionToCoordinates(positionTo).toLowerCase()
        const initialPiecePostion: Position = pieceToMove.position
        if (pieceToMove.isOnMainBoard) {
            this.board[pieceToMove.position.row][pieceToMove.position.column].setPieceOnSquare(null) // empty square where it currently stands
            this.board[positionTo.row][positionTo.column].setPieceOnSquare(null) // empty square  where it will go
            this.secondBoard[positionTo.row][positionTo.column].setPieceOnSquare(pieceToMove) // move piece on the other board
        } else {
            this.secondBoard[pieceToMove.position.row][pieceToMove.position.column].setPieceOnSquare(null) // empty square where it currently stands
            this.secondBoard[positionTo.row][positionTo.column].setPieceOnSquare(null) // empty square where it will go
            this.board[positionTo.row][positionTo.column].setPieceOnSquare(pieceToMove) // move piece on the other board
            boardName = SECOND_BOARD_SHORT_NAME
        }

        // for castling, move also the tower
        if (pieceToMove.type === PIECE_TYPE_KING) {
            let deltaOfHorizontalSquares = initialPiecePostion.column - positionTo.column
            // a king moving by 2 squares can only be castling
            if (Math.abs(deltaOfHorizontalSquares) > 1) {
                let isBigCastle: boolean = deltaOfHorizontalSquares > 0 // positif = left of the king => big castling
                let tower: Tower = this.board[pieceToMove.position.row][isBigCastle ? 0 : 7].piece as Tower
                this.board[tower.position.row][tower.position.column].setPieceOnSquare(null) // empty square where tower currently stands
                this.secondBoard[tower.position.row][isBigCastle ? 3 : 5].setPieceOnSquare(tower) // move piece on the other board
                moveName = isBigCastle ? BIG_CASTLING_SHORT_NAME : SMALL_CASTLING_SHORT_NAME
            }
        }
        this.moveList.push([BIG_CASTLING_SHORT_NAME, SMALL_CASTLING_SHORT_NAME].indexOf(moveName) < 0 ? boardName + moveName : moveName) // write history
        this.isWhiteTurnToPlay = !this.isWhiteTurnToPlay
    }

    /**
     * Calculate the threats on the board by re-calculating
     * the possible move for every pieces remaining on the board
     */
    calculateThreats(): void {
        // reset all threats
        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                this.board[i][j].isThreatenBy = []
                this.secondBoard[i][j].isThreatenBy = []
            }
        }

        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                if (this.board[i][j].piece !== null && this.board[i][j].piece?.type !== PIECE_TYPE_KING) this.board[i][j].piece?.calculatePossibleMoves(this)
                if (this.secondBoard[i][j].piece !== null && this.secondBoard[i][j].piece?.type !== PIECE_TYPE_KING) this.secondBoard[i][j].piece?.calculatePossibleMoves(this)
            }
        }
        this.calculateKingsMoves()
    }

    /**
     * @returns true if there is a "check" (king under attack) on the current player
     */
    isKingUnderThreat(): boolean {
        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                if (this.board[i][j].piece !== null) {
                    if (this.board[i][j].piece?.type === PIECE_TYPE_KING && this.board[i][j].piece?.isWhite === this.isWhiteTurnToPlay && this.board[i][j].isThreatenBy.length > 0) {
                        for (const pieceThreatening of this.board[i][j].isThreatenBy) {
                            if (pieceThreatening.isWhite !== this.board[i][j].piece?.isWhite) {
                                return true
                            }
                        }
                    }
                }

                if (this.secondBoard[i][j].piece !== null) {
                    if (this.secondBoard[i][j].piece?.type === PIECE_TYPE_KING && this.secondBoard[i][j].piece?.isWhite === this.isWhiteTurnToPlay && this.secondBoard[i][j].isThreatenBy.length > 0) {
                        for (const pieceThreatening of this.secondBoard[i][j].isThreatenBy) {
                            if (pieceThreatening.isWhite !== this.secondBoard[i][j].piece?.isWhite) {
                                return true
                            }
                        }
                    }
                }
            }
        }
        return false
    }

    /**
     * Kings movement are the only one that can not move on a threatened square
     */
    calculateKingsMoves(): void {
        this.getKingOfColor(this.isWhiteTurnToPlay)?.calculatePossibleMoves(this) // re-calculate after calculating threats to prevent showing kings move to threaten squares
        this.addCastlingAsPossibleMoves()
    }

    /**
     * Castling is a specific move that requires many conditions:
     *
     * - The king must not have moved once
     * - The Tower must not have moved once
     * - The final position of the king and the tower must not be under threat (both boards)
     */
    addCastlingAsPossibleMoves(): void {
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
        if (!king) throw new Error(`Could not find ${this.isWhiteTurnToPlay ? 'white' : 'black'} king!`)

        const rowToCheck = this.isWhiteTurnToPlay ? 7 : 0
        if (king && king.position.row === rowToCheck && king.position.column === KING_INITIAL_COLUMN) {
            // check if squares are free in the main board and are not under threat on both boards
            let towerLeft: Piece | null = this.board[rowToCheck][0].piece
            if (
                bigCastlePossible &&
                towerLeft &&
                towerLeft.type === PIECE_TYPE_TOWER &&
                towerLeft.isWhite === this.isWhiteTurnToPlay &&
                this.board[rowToCheck][1].piece === null &&
                this.board[rowToCheck][2].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay) &&
                this.board[rowToCheck][3].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay) &&
                this.secondBoard[rowToCheck][2].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay) &&
                this.secondBoard[rowToCheck][3].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay)
            ) {
                bigCastlePossible = true
            } else bigCastlePossible = false

            let towerRight: Piece | null = this.board[rowToCheck][7].piece
            if (
                smallCastlePossible &&
                towerRight &&
                towerRight.type === PIECE_TYPE_TOWER &&
                towerRight.isWhite === this.isWhiteTurnToPlay &&
                this.board[rowToCheck][6].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay) &&
                this.board[rowToCheck][5].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay) &&
                this.secondBoard[rowToCheck][6].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay) &&
                this.secondBoard[rowToCheck][5].isEmptyAndNotThreatenByColor(!this.isWhiteTurnToPlay)
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

    /**
     * Retrieve the king of the desired color
     *
     * @param ofColorWhite true if the expected color is white
     * @returns the king of expected color
     */
    getKingOfColor(ofColorWhite: boolean): King | null {
        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                if (this.board[i][j].piece !== null) if (this.board[i][j].piece?.type === PIECE_TYPE_KING && this.board[i][j].piece?.isWhite === ofColorWhite) return this.board[i][j].piece
                if (this.secondBoard[i][j].piece !== null)
                    if (this.secondBoard[i][j].piece?.type === PIECE_TYPE_KING && this.secondBoard[i][j].piece?.isWhite === ofColorWhite) return this.secondBoard[i][j].piece
            }
        }
        return null
    }

    /**
     * Create a new Game object with the same values as "this"
     *
     * @returns the same game as a new object
     */
    cloneGame(): Game {
        const clone: Game = new Game()
        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                clone.board[i][j].setPieceOnSquare(this.board[i][j].piece ? (this.board[i][j].piece as Piece).clone() : null)
                clone.secondBoard[i][j].setPieceOnSquare(this.secondBoard[i][j].piece ? (this.secondBoard[i][j].piece as Piece).clone() : null)
            }
        }

        clone.isWhiteTurnToPlay = this.isWhiteTurnToPlay ? true : false
        clone.moveList = [...this.moveList]
        return clone
    }

    /**
     * Undo a move based on the move list
     *
     * A regex is used to parse the moves
     * it can re-create an eaten piece or undo a promotion
     */
    cancelLastMove(): void {
        if (this.moveList.length < 1) return

        const lastMoveParsed: ParsedMoveFromMoveList = this.parseMoveFromMoveList(this.moveList, this.moveList.length - 1)
        const pieceThatWasEaten: Piece | null = lastMoveParsed.isEatingAPiece
            ? this.getLastPieceThatWasOnSquare(this.board[lastMoveParsed.to.row][lastMoveParsed.to.column], this.isWhiteTurnToPlay)
            : null

        if (lastMoveParsed.initiatedOnMainBoard) {
            this.board[lastMoveParsed.from.row][lastMoveParsed.from.column].setPieceOnSquare(lastMoveParsed.piece)
            this.board[lastMoveParsed.to.row][lastMoveParsed.to.column].setPieceOnSquare(pieceThatWasEaten)
            this.secondBoard[lastMoveParsed.to.row][lastMoveParsed.to.column].setPieceOnSquare(null)
        } else {
            this.secondBoard[lastMoveParsed.from.row][lastMoveParsed.from.column].setPieceOnSquare(lastMoveParsed.piece)
            this.secondBoard[lastMoveParsed.to.row][lastMoveParsed.to.column].setPieceOnSquare(pieceThatWasEaten)
            this.board[lastMoveParsed.to.row][lastMoveParsed.to.column].setPieceOnSquare(null)
        }

        // for castling, move also the tower
        if (lastMoveParsed.move === BIG_CASTLING_SHORT_NAME || lastMoveParsed.move === SMALL_CASTLING_SHORT_NAME) {
            let deltaOfHorizontalSquares = lastMoveParsed.from.column - lastMoveParsed.to.column
            // a king moving by 2 squares can only be castling
            if (Math.abs(deltaOfHorizontalSquares) > 1) {
                let isBigCastle: boolean = deltaOfHorizontalSquares > 0 // positif = left of the king => big castling
                const tower: Tower = this.secondBoard[lastMoveParsed.to.row][isBigCastle ? 3 : 5].piece as Tower
                this.secondBoard[tower.position.row][tower.position.column].setPieceOnSquare(null) // empty square where tower currently stands
                this.board[tower.position.row][isBigCastle ? 0 : 7].setPieceOnSquare(tower) // move piece on the other board
            }
        }

        this.moveList.pop()
        this.calculateThreats()
        this.isWhiteTurnToPlay = !this.isWhiteTurnToPlay
        /* 
        @TODO
            Undo castlings
        */
    }

    /**
     * Replace a pawn with a new piece (Promotion)
     *
     * @param pawnToPromote
     * @param pieceNameToPromoteTo
     */
    promotePawn(pawnToPromote: Pawn, pieceNameToPromoteTo: string): boolean {
        let newPiece: Piece | null = getNewPieceFromName(pieceNameToPromoteTo, pawnToPromote.isWhite)

        if (newPiece === null) {
            this.cancelLastMove()
            return false
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

        return true
    }

    /**
     * Verify if there is no pat or checkmate
     *
     * @returns true if the game is over
     */
    isGameOver(): boolean {
        let isPat = true
        for (let i = 0; i < BOARD_ROWS; i++) {
            for (let j = 0; j < BOARD_COLUMNS; j++) {
                let pieceOnMainBoard: Piece | null = this.board[i][j].piece
                let pieceOnSecondBoard: Piece | null = this.secondBoard[i][j].piece
                if (
                    (pieceOnMainBoard !== null && pieceOnMainBoard.isWhite === this.isWhiteTurnToPlay && pieceOnMainBoard.possibleMoves.length > 0) ||
                    (pieceOnSecondBoard !== null && pieceOnSecondBoard.isWhite === this.isWhiteTurnToPlay && pieceOnSecondBoard.possibleMoves.length > 0)
                )
                    isPat = false
            }
        }
        /**
         * @TODO
         * checkmates
         */
        return isPat
    }

    /**
     * Retrieve which piece of the given color
     * has been lastly on the given square
     * by browsing the move list in reverse
     *
     * @param square
     * @param isWhite
     * @returns the last piece eaten on the square, or null
     */
    getLastPieceThatWasOnSquare(square: Square, isWhite: boolean): Piece | null {
        const moveListInReverse: string[] = this.moveList.toReversed()
        moveListInReverse.shift() // remove last move
        for (let i = 0; i < moveListInReverse.length; i++) {
            const parsedMove: ParsedMoveFromMoveList = this.parseMoveFromMoveList(moveListInReverse, i)
            if (square.position.row === parsedMove.to.row && square.position.column === parsedMove.to.column) {
                return getNewPieceFromShortName(parsedMove.promotion !== null ? parsedMove.promotion.getShortName() : parsedMove.piece.getShortName(), isWhite)
            }
        }
        return Game.getPieceOnInitialPositon(square.position) // It could be a piece that has not moved yet
    }

    /**
     * Load a game by executing a list of moves
     *
     * @param moveList
     */
    loadMoveList(moveList: string[]): void {
        moveList.forEach((move: string, index: number) => {
            const parsedMove: ParsedMoveFromMoveList = this.parseMoveFromMoveList(moveList, index)
            this.executeMove(parsedMove.piece, parsedMove.to)
            if (parsedMove.promotion !== null) {
                this.promotePawn(parsedMove.piece as Pawn, parsedMove.promotion.type)
            }
        })
        this.calculateThreats()
    }

    /**
     * Retrieve board, pieces and position from a historic move (parsed by regex)
     *
     * Either the move just happened, or is about to be executed.
     *
     * @param move
     * @returns The move parsed into an object of type ParsedMoveFromMoveList
     */
    parseMoveFromMoveList(moveList: string[], moveIndex: number): ParsedMoveFromMoveList {
        const move: string = moveList[moveIndex]
        const isAWhiteMove: boolean = moveIndex % 2 === 0
        let hasHappenedAlready = false

        // dealing with caslting
        if (move === BIG_CASTLING_SHORT_NAME || move === SMALL_CASTLING_SHORT_NAME) {
            const kingThatMoves: King | null = this.getKingOfColor(isAWhiteMove)
            if (!kingThatMoves) throw new Error(`Could not parse move "${move}". King not found. Is it ${isAWhiteMove ? 'white' : 'black'}'s turn ?`)
            hasHappenedAlready = kingThatMoves.position.column !== KING_INITIAL_COLUMN

            return {
                board: this.board,
                from: { row: kingThatMoves.position.row, column: KING_INITIAL_COLUMN },
                initiatedOnMainBoard: true,
                isEatingAPiece: false,
                move: move,
                moveAlreadyExecuted: hasHappenedAlready,
                piece: kingThatMoves,
                promotion: null,
                to: { row: kingThatMoves.position.row, column: hasHappenedAlready ? kingThatMoves.position.column : KING_INITIAL_COLUMN + (move === BIG_CASTLING_SHORT_NAME ? -2 : 2) },
            }
        }

        // parsing with normal moves
        const { board, piece, from, action, to, promotion } = REGEX_PARSE_MOVE.exec(move)?.groups as RegexParseMoveResult
        const pieceNameThatMove: string = piece ?? '' // it's a pawn by default
        if (board === undefined) throw new Error(`Could not parse move ${move}.`)

        const boardWhereMoveInitiated: Square[][] = board === MAIN_BOARD_SHORT_NAME ? this.board : this.secondBoard
        const boardWhereMoveFinalised: Square[][] = board === SECOND_BOARD_SHORT_NAME ? this.board : this.secondBoard

        if (from === undefined || to === undefined) throw new Error(`Could not parse move ${move}.`)

        const initialPosition: Position = fromCoordinatesToPosition(from)
        const finalPosition: Position = fromCoordinatesToPosition(to)
        const currentPieceAtInitialPosition: Piece | null = boardWhereMoveInitiated[initialPosition.row][initialPosition.column].piece // if the move did not happen yet, we will have the right piece
        const currentPieceAtFinalPosition: Piece | null = boardWhereMoveFinalised[finalPosition.row][finalPosition.column].piece // if the move did happen, we will have the right piece

        let pieceThatMoves: Piece | null = null
        if (currentPieceAtInitialPosition && currentPieceAtInitialPosition.isWhite === isAWhiteMove && currentPieceAtInitialPosition.getShortName() === pieceNameThatMove) {
            pieceThatMoves = currentPieceAtInitialPosition
        }

        if (currentPieceAtFinalPosition && currentPieceAtFinalPosition.isWhite === isAWhiteMove && currentPieceAtFinalPosition.getShortName() === pieceNameThatMove) {
            pieceThatMoves = currentPieceAtFinalPosition
            hasHappenedAlready = true
        }

        // potential promotion
        let replacement: Piece | null = null
        if (promotion !== undefined && promotion !== null) {
            replacement = getNewPieceFromShortName(promotion, isAWhiteMove)

            if (!replacement) throw new Error(`Could not parse move ${move}. Piece "${promotion}" for promotion not found.`)
            if (currentPieceAtFinalPosition && currentPieceAtFinalPosition.isWhite === replacement.isWhite && currentPieceAtFinalPosition.type === replacement.type) {
                pieceThatMoves = new Pawn(isAWhiteMove)
                pieceThatMoves.position = currentPieceAtFinalPosition.position
                pieceThatMoves.isOnMainBoard = currentPieceAtFinalPosition.isOnMainBoard
                hasHappenedAlready = true
            }
        }

        if (pieceThatMoves?.getShortName() !== pieceNameThatMove) {
            pieceThatMoves = getNewPieceFromShortName(pieceNameThatMove, isAWhiteMove)
        }

        if (pieceThatMoves === null) throw new Error(`Could not parse move ${move}. Piece not found.`)

        return {
            board: boardWhereMoveInitiated,
            from: initialPosition,
            initiatedOnMainBoard: board === MAIN_BOARD_SHORT_NAME,
            isEatingAPiece: action === 'x',
            move: move,
            moveAlreadyExecuted: hasHappenedAlready,
            piece: pieceThatMoves,
            promotion: replacement,
            to: finalPosition,
        }
    }

    static getPieceOnInitialPositon(initialPosition: Position): Piece | null {
        const tmpGame = new Game()
        tmpGame.initChessSet()
        return tmpGame.board[initialPosition.row][initialPosition.column].piece
    }
}
