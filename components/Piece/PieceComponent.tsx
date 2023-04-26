import Image from 'next/image';
import Piece from '@/src/Pieces/Piece';
import styles from './piece.module.css';
import { DragEventHandler } from 'react';
import { fromPositionToCoordinates } from '@/src/Utils';

interface PieceProps {
    piece: Piece;
    onDragStart: DragEventHandler;
    onDragEnd: DragEventHandler;
}

export default function PieceComponent({ piece, onDragStart, onDragEnd }: PieceProps) {
    const coordinates: string = fromPositionToCoordinates(piece.position);

    return (
        <div id={'piece_' + coordinates} draggable="true" onDragStart={onDragStart} onDragEnd={onDragEnd} className={styles.piece}>
            <Image data-coordinates={coordinates} data-ismainboard={piece.isOnMainBoard} src={'/board/' + piece.img} alt={piece.type} width="100" height="100" />
        </div>
    );
}
