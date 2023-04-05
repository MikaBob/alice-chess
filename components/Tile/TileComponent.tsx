import Image from 'next/image';
import PieceComponent from '../Piece/PieceComponent';
import Square from '@/src/Square';
import styles from './tile.module.css';
import { fromCoordinatesToPosition, fromPositionToCoordinates } from '@/src/Utils';
import { useState } from 'react';
import Piece from '@/src/Pieces/Piece';
import Game from '@/src/Game';

interface TileProps {
    square: Square;
    game: Game;
}

let draggedPiece: Piece | null = null;
export default function TileComponent({ square, game }: TileProps) {
    const coordinates: string = fromPositionToCoordinates(square.position);
    const tileColor: string = square.isWhite ? 'white' : 'black';
    const [cssClasses, setCssClasses] = useState(styles.tile);

    function pieceDragStart(e: React.DragEvent<HTMLDivElement>) {
        const targetCoordinates: string = e.target.dataset.coordinates;
        const targetPosition: number[] = fromCoordinatesToPosition(targetCoordinates);
        const piece: Piece | null = game.board[targetPosition[0]][targetPosition[1]].piece;
        if (piece !== null) {
            draggedPiece = piece;
            setCssClasses(styles.tile + ' ' + styles.pieceDraggedOver + ' ' + styles.pieceOriginalTile);
        }
        //console.log('pieceDragStart', draggedPiece);
    }

    function pieceDragEnd(e: React.DragEvent<HTMLDivElement>) {
        setCssClasses(styles.tile);
        draggedPiece = null;
        //console.log('pieceDragEnd', draggedPiece);
    }

    function piecedropped(e: any) {
        const targetCoordinates: string = e.target.dataset.coordinates;
        setCssClasses(styles.tile);
        //console.log('dropped', targetCoordinates);
    }

    function tileDragEnter(e: React.DragEvent<HTMLDivElement>) {
        //console.log('tileDragEnter', draggedPiece);
        if (draggedPiece !== null && coordinates !== fromPositionToCoordinates(draggedPiece.position)) {
            setCssClasses(styles.tile + ' ' + styles.pieceDraggedOver);
        }
    }

    function tileDragLeave(e: React.DragEvent<HTMLDivElement>) {
        //console.log('tileDragLeave', draggedPiece);
        const targetCoordinates: string = e.target.dataset.coordinates;
        if (draggedPiece !== null && fromPositionToCoordinates(draggedPiece.position) !== targetCoordinates) setCssClasses(styles.tile);
    }

    function onDragOver(e: any) {
        e.preventDefault();
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
    }

    return (
        <td>
            <div id={'tile_' + coordinates} className={cssClasses} onDragEnter={tileDragEnter} onDragLeave={tileDragLeave} onDragOver={onDragOver} onDrop={piecedropped}>
                <div className={styles.tileBackground}>
                    <Image data-coordinates={coordinates} src={'/board/' + tileColor + '-tile.png'} alt={tileColor + ' tile'} width="100" height="100" />
                </div>
                {square.piece !== null && <PieceComponent piece={square.piece} onDragStart={pieceDragStart} onDragEnd={pieceDragEnd} />}
            </div>
        </td>
    );
}
