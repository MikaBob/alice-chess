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
        this.initChessSet();
    }

    public initChessSet() {
        // black
        this.board[0][0].piece = new Tower([0, 0], false);
        this.board[0][7].piece = new Tower([0, 7], false);

        this.board[0][1].piece = new Knight([0, 1], false);
        this.board[0][6].piece = new Knight([0, 6], false);

        this.board[0][2].piece = new Bishop([0, 2], false);
        this.board[0][5].piece = new Bishop([0, 5], false);

        this.board[0][3].piece = new Queen([0, 3], false);
        this.board[0][4].piece = new King([0, 4], false);

        for (let i = 0; i < 8; i++) {
            this.board[1][i].piece = new Pawn([1, i], false);
        }

        // white
        this.board[7][0].piece = new Tower([7, 0], true);
        this.board[7][7].piece = new Tower([7, 7], true);

        this.board[7][1].piece = new Knight([7, 1], true);
        this.board[7][6].piece = new Knight([7, 6], true);

        this.board[7][2].piece = new Bishop([7, 2], true);
        this.board[7][5].piece = new Bishop([7, 5], true);

        this.board[7][3].piece = new Queen([7, 3], true);
        this.board[7][4].piece = new King([7, 4], true);

        for (let i = 0; i < 8; i++) {
            this.board[6][i].piece = new Pawn([1, i], true);
        }
    }
}
