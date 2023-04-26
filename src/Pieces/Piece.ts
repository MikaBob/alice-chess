//import fs from 'fs';

import { Position } from '../Utils';

export default class Piece {
    type: string;
    position: Position;
    img: string;
    //imgB64: string;
    isWhite: boolean;
    isOnMainBoard: boolean;
    constructor(type: string, position: Position, img: string, isWhite: boolean) {
        this.type = type;
        this.position = position;
        this.isWhite = isWhite;
        this.isOnMainBoard = true;
        this.img = (this.isWhite ? 'white/' : 'black/') + img;
        //this.imgB64 = Buffer.from(fs.readFileSync('./public/board/' + this.img, { encoding: 'binary' })).toString('base64');
    }
}
