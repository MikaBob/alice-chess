export const fromPositionToCoordniate = (position: number[]): string => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    return '' + letters[position[1]] + (position[0] - 8) * -1;
};
