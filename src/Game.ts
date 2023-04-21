import { Bishop } from './Pieces/Bishop';
import { King } from './Pieces/King';
import { Knight } from './Pieces/Knight';
import { Pawn } from './Pieces/Pawn';
import Piece from './Pieces/Piece';
import { Queen } from './Pieces/Queen';
import { Tower } from './Pieces/Tower';
import Square from './Square';

export default class Game {
    board: Square[][];
    secondBoard: Square[][];
    isWhiteTurnToPlay: boolean;

    constructor() {
        this.board = [];
        this.secondBoard = [];
        let isWhiteTile = 0;
        for (let i = 0; i < 8; i++) {
            this.board[i] = [];
            this.secondBoard[i] = [];
            for (let j = 0; j < 8; j++) {
                this.board[i][j] = new Square(i, j, isWhiteTile % 2 === 0);
                this.secondBoard[i][j] = new Square(i, j, isWhiteTile % 2 === 0);
                isWhiteTile++;
            }
            isWhiteTile++; // alternate at each rows
        }
        this.initChessSet();
        this.isWhiteTurnToPlay = true;
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
            this.board[6][i].piece = new Pawn([6, i], true);
        }
    }

    public executeMove(positionFrom: number[], positionTo: number[]) {
        const pieceMoved: Piece | null = this.board[positionFrom[0]][positionFrom[1]].piece;
        //console.log('before', positionFrom, this.board[positionFrom[0]][positionFrom[1]], positionTo, this.board[positionTo[0]][positionTo[1]], pieceMoved, this.isWhiteTurnToPlay);

        if (pieceMoved !== null && pieceMoved.isWhite === this.isWhiteTurnToPlay) {
            this.board[positionTo[0]][positionTo[1]].setPieceOnTile(pieceMoved);
            this.board[positionFrom[0]][positionFrom[1]].setPieceOnTile(null);

            this.isWhiteTurnToPlay = !this.isWhiteTurnToPlay;
        }
        //console.log('after', positionFrom, this.board[positionFrom[0]][positionFrom[1]], positionTo, this.board[positionTo[0]][positionTo[1]], pieceMoved, this.isWhiteTurnToPlay);
    }
}
