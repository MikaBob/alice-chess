import { BOARD_ROWS } from './Game'
import { PIECE_TYPE_BISHOP, Bishop } from './Pieces/Bishop'
import { PIECE_TYPE_KING, King } from './Pieces/King'
import { PIECE_TYPE_KNIGHT, Knight } from './Pieces/Knight'
import { PIECE_TYPE_PAWN, Pawn } from './Pieces/Pawn'
import { PIECE_TYPE_QUEEN, Queen } from './Pieces/Queen'
import { PIECE_TYPE_TOWER, Tower } from './Pieces/Tower'
import Piece from './Pieces/Piece'

export const COLUMN_NAME = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']

export type Position = {
    row: number
    column: number
}

/**
 * @param position
 * @returns position as coordinates. {row: 1, column: 4} => e7
 */
export const fromPositionToCoordinates = (position: Position): string => {
    return '' + COLUMN_NAME[position.column] + Math.abs(position.row - BOARD_ROWS)
}

/**
 * @param coordinates
 * @returns coordinates as a position. B4 => {row: 5, column: 1}
 */
export const fromCoordinatesToPosition = (coordinates: string): Position => {
    const letter: string = coordinates[0]
    const row: number = Math.abs(Number(coordinates[1]) - BOARD_ROWS)
    return { row: row, column: COLUMN_NAME.indexOf(letter.toUpperCase()) }
}

/**
 * @param positionA
 * @param positionB
 * @returns true if both positions have the same rows and the same columns
 */
export const arePositionsIdentical = (positionA: Position, positionB: Position): boolean => {
    return positionA.row === positionB.row && positionA.column === positionB.column
}

/**
 * @param positionToCheck
 * @param listOfPositions
 * @returns true if the given position has identical values as at leat one of the given list of positions
 */
export const isPositionInList = (positionToCheck: Position, listOfPositions: Position[]): boolean => {
    let isInList: boolean = false
    listOfPositions.map((possiblePosition: Position) => {
        if (arePositionsIdentical(positionToCheck, possiblePosition)) {
            isInList = true
        }
    })
    return isInList
}

/**
 * @param pieceName
 * @param isWhite
 * @returns A new specialized piece based on the given name and color (true = white)
 */
export const getNewPieceFromName = (pieceName: string, isWhite: boolean): Piece | null => {
    switch (pieceName) {
        case PIECE_TYPE_PAWN:
            return new Pawn(isWhite)
        case PIECE_TYPE_KNIGHT:
            return new Knight(isWhite)
        case PIECE_TYPE_BISHOP:
            return new Bishop(isWhite)
        case PIECE_TYPE_TOWER:
            return new Tower(isWhite)
        case PIECE_TYPE_QUEEN:
            return new Queen(isWhite)
        case PIECE_TYPE_KING:
            return new King(isWhite)
        default:
            return null
    }
}

/**
 * Same as getNewPieceFromName, but with short names from the move list
 * @param pieceShortName
 * @param isWhite
 * @returns A new specialized piece based on the given short name and color (true = white)
 */
export const getNewPieceFromShortName = (pieceShortName: string, isWhite: boolean): Piece | null => {
    switch (pieceShortName) {
        case new Pawn(isWhite).getShortName():
            return new Pawn(isWhite)
        case new Knight(isWhite).getShortName():
            return new Knight(isWhite)
        case new Bishop(isWhite).getShortName():
            return new Bishop(isWhite)
        case new Tower(isWhite).getShortName():
            return new Tower(isWhite)
        case new Queen(isWhite).getShortName():
            return new Queen(isWhite)
        case new King(isWhite).getShortName():
            return new King(isWhite)
        default:
            return null
    }
}
