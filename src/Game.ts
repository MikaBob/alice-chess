import { Pawn } from './Pieces/Pawn';
import { Tower } from './Pieces/Tower';
import { Knight } from './Pieces/Knight';
import Square from './Square';
import { Bishop } from './Pieces/Bishop';
import { Queen } from './Pieces/Queen';
import { King } from './Pieces/King';

export default class Game {
    board: Square[][];

    constructor() {
        this.board = [];
        let isWhiteTile = 0;
        for (let i = 0; i < 8; i++) {
            this.board[i] = [];
            for (let j = 0; j < 8; j++) {
                this.board[i][j] = new Square(i, j, isWhiteTile % 2 === 0);
                isWhiteTile++;
            }
            isWhiteTile++; // alternate at each rows
        }
    }
}
