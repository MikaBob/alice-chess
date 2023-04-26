import { Bishop } from './Pieces/Bishop';
import { King } from './Pieces/King';
import { Knight } from './Pieces/Knight';
import { Pawn } from './Pieces/Pawn';
import Piece from './Pieces/Piece';
import { Queen } from './Pieces/Queen';
import { Tower } from './Pieces/Tower';
import Square from './Square';
import { Position } from './Utils';

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
                this.secondBoard[i][j] = new Square(i, j, isWhiteTile % 2 === 0, false);
                isWhiteTile++;
            }
            isWhiteTile++; // alternate at each rows
        }
        this.initChessSet();
        this.isWhiteTurnToPlay = true;
    }

    public initChessSet() {
        // black
        this.board[0][0].piece = new Tower({ row: 0, column: 0 }, false);
        this.board[0][7].piece = new Tower({ row: 0, column: 7 }, false);

        this.board[0][1].piece = new Knight({ row: 0, column: 1 }, false);
        this.board[0][6].piece = new Knight({ row: 0, column: 6 }, false);

        this.board[0][2].piece = new Bishop({ row: 0, column: 2 }, false);
        this.board[0][5].piece = new Bishop({ row: 0, column: 5 }, false);

        this.board[0][3].piece = new Queen({ row: 0, column: 3 }, false);
        this.board[0][4].piece = new King({ row: 0, column: 4 }, false);

        for (let i = 0; i < 8; i++) {
            this.board[1][i].piece = new Pawn({ row: 1, column: i }, false);
        }

        // white
        this.board[7][0].piece = new Tower({ row: 7, column: 0 }, true);
        this.board[7][7].piece = new Tower({ row: 7, column: 7 }, true);

        this.board[7][1].piece = new Knight({ row: 7, column: 1 }, true);
        this.board[7][6].piece = new Knight({ row: 7, column: 6 }, true);

        this.board[7][2].piece = new Bishop({ row: 7, column: 2 }, true);
        this.board[7][5].piece = new Bishop({ row: 7, column: 5 }, true);

        this.board[7][3].piece = new Queen({ row: 7, column: 3 }, true);
        this.board[7][4].piece = new King({ row: 7, column: 4 }, true);

        for (let i = 0; i < 8; i++) {
            this.board[6][i].piece = new Pawn({ row: 6, column: i }, true);
        }
    }

    public executeMove(pieceToMove: Piece, positionTo: Position): boolean {
        //console.log('before', pieceToMove.isWhite, this.isWhiteTurnToPlay, this.board[pieceToMove.position.row][pieceToMove.position.column], positionTo, pieceToMove, this.isWhiteTurnToPlay);

        if (pieceToMove.isWhite === this.isWhiteTurnToPlay) {
            if (pieceToMove.isOnMainBoard) {
                this.board[pieceToMove.position.row][pieceToMove.position.column].setPieceOnTile(null);
                this.secondBoard[positionTo.row][positionTo.column].setPieceOnTile(pieceToMove);
            } else {
                this.secondBoard[pieceToMove.position.row][pieceToMove.position.column].setPieceOnTile(null);
                this.board[positionTo.row][positionTo.column].setPieceOnTile(pieceToMove);
            }

            this.isWhiteTurnToPlay = !this.isWhiteTurnToPlay;
            //console.log('after', pieceToMove.isWhite, this.isWhiteTurnToPlay, this.board[pieceToMove.position.row][pieceToMove.position.column], positionTo, pieceToMove, this.isWhiteTurnToPlay);
            return true;
        }
        return false;
    }
}
