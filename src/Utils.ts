export const COLUMN_NAME = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export type Position = {
    row: number
    column: number
}

export const fromPositionToCoordinates = (position: Position): string => {
    return '' + COLUMN_NAME[position.column] + Math.abs(position.row - 8)
}

export const fromCoordinatesToPosition = (coordinates: string): Position => {
    const letter: string = coordinates[0]
    const row: number = Math.abs(Number(coordinates[1]) - 8)
    return { row: row, column: COLUMN_NAME.indexOf(letter) }
}
