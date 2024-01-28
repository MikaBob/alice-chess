//import fs from 'fs';

import { Position } from '../Utils'
import Game, { BOARD_COLUMNS, BOARD_ROWS } from '../Game'
import Square from '../Square'

export default class Piece {
    type: string
    position: Position
    img: string
    //imgB64: string;
    isWhite: boolean
    isOnMainBoard: boolean
    possibleMoves: Position[]

    constructor(type: string, img: string, isWhite: boolean) {
        this.type = type
        this.position = { row: -1, column: -1 }
        this.isWhite = isWhite
        this.isOnMainBoard = true
        this.img = (this.isWhite ? 'white/' : 'black/') + img + '.png'
        //this.imgB64 = Buffer.from(fs.readFileSync('./public/board/' + this.img, { encoding: 'binary' })).toString('base64');
        this.possibleMoves = []
    }

    calculatePossibleMoves(game: Game): void {
        throw new Error(`Piece ${this.type} must extend function getPossibleMoves()!`)
    }

    addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(square: Square): boolean {
        if (square.hasSquareAPieceOfDifferentColorOrIsEmpty(this)) {
            this.possibleMoves.push(square.position)
            square.isThreatenBy.push(this)
        }
        return !(square.piece === null || (square.piece.type === 'King' && square.piece.isWhite !== this.isWhite)) // ignore enemy king to continue threats behind him
    }

    checkBoundariesAndOppositeBoard(rowToCheck: number, columnToCheck: number, oppositeBoard: Square[][]): boolean {
        if (rowToCheck > -1 && rowToCheck < BOARD_ROWS && columnToCheck > -1 && columnToCheck < BOARD_COLUMNS) {
            if (oppositeBoard[rowToCheck][columnToCheck].piece === null) {
                return true
            }
        }
        return false
    }

    createNewPieceOfSameType(): Piece {
        throw new Error(`Piece ${this.type} must extend function createNewPieceOfSameType()!`)
    }

    clone(): Piece {
        let clone: Piece = this.createNewPieceOfSameType()

        clone.position = { row: this.position.row, column: this.position.column }
        clone.isOnMainBoard = this.isOnMainBoard
        clone.img = this.img
        //this.imgB64 = Buffer.from(fs.readFileSync('./public/board/' + this.img, { encoding: 'binary' })).toString('base64');
        clone.possibleMoves = structuredClone(this.possibleMoves)
        return clone
    }

    getShortName(): string {
        throw new Error(`Piece ${this.type} must extend function getShortName()!`)
    }
}
