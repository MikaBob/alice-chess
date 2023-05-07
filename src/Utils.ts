import { BOARD_ROWS } from './Game'

export const COLUMN_NAME = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']

export type Position = {
    row: number
    column: number
}

export const fromPositionToCoordinates = (position: Position): string => {
    return '' + COLUMN_NAME[position.column] + Math.abs(position.row - BOARD_ROWS)
}

export const fromCoordinatesToPosition = (coordinates: string): Position => {
    const letter: string = coordinates[0]
    const row: number = Math.abs(Number(coordinates[1]) - BOARD_ROWS)
    return { row: row, column: COLUMN_NAME.indexOf(letter) }
}

export const arePositionsIdentical = (positionA: Position, positionB: Position): boolean => {
    return positionA.row === positionB.row && positionA.column === positionB.column
}

export const isPositionInList = (positionToCheck: Position, listOfPositions: Position[]): boolean => {
    let isInList: boolean = false
    listOfPositions.map((possiblePosition: Position) => {
        if (arePositionsIdentical(positionToCheck, possiblePosition)) {
            isInList = true
        }
    })
    return isInList
}
