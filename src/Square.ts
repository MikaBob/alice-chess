import Piece from './Pieces/Piece';

export default class Square {
    position: number[];
    isWhite: boolean;
    column: string;
    row: number;

    constructor(x: number, y: number, isWhite: boolean) {
        this.position = [x, y];
        this.isWhite = isWhite;
        this.column = this.fromPositionToColumn(x);
        this.row = 8 - y; // first row is at the bottom
    }

    public fromPositionToColumn(positionX: number): string {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        return letters[positionX];
    }
}
