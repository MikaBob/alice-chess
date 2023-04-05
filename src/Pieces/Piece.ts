import fs from 'fs';

export default class Piece {
    type: string;
    position: number[];
    img: string;
    //imgB64: string;
    isWhite: boolean;
    constructor(type: string, position: number[], img: string, isWhite: boolean) {
        this.type = type;
        this.position = position;
        this.isWhite = isWhite;
        this.img = (this.isWhite ? 'white/' : 'black/') + img;
        //this.imgB64 = Buffer.from(fs.readFileSync('./public/board/' + this.img, { encoding: 'binary' })).toString('base64');
    }
}
