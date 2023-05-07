//import fs from 'fs';

import Game from '../Game'
import Square from '../Square'
import { Position } from '../Utils'

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
        this.img = (this.isWhite ? 'white/' : 'black/') + img
        //this.imgB64 = Buffer.from(fs.readFileSync('./public/board/' + this.img, { encoding: 'binary' })).toString('base64');
        this.possibleMoves = []
    }

    calculatePossibleMoves(game: Game): void {
        throw new Error(`Piece ${this.type} must extend function getPossibleMoves()!`)
    }

    addSquareToPossibleMoveAndReturnTrueIfSquareNotEmpty(square: Square): boolean {
        if (square.isSquarePossibleMoveForPiece(this)) {
            this.possibleMoves.push(square.position)
        }
        return square.piece !== null
    }
}
