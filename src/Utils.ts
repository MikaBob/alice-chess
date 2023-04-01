const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const fromPositionToCoordinates = (position: number[]): string => {
    return '' + letters[position[1]] + Math.abs(position[0] - 8);
};

export const fromCoordinatesToPosition = (coordinatesWithtype: string): number[] => {
    const coordinates: string = coordinatesWithtype.split('_')[1];
    const letter: string = coordinates[0];
    const row: number = Math.abs(Number(coordinates[1]) - 8);
    return [row, letters.indexOf(letter)];
};
