import { Draggable } from 'react-beautiful-dnd';
import { fromPositionToCoordinates } from '@/src/Utils';
import Image from 'next/image';
import Piece from '@/src/Pieces/Piece';
import styles from './piece.module.css';

interface PieceProps {
    piece: Piece;
}

export default function PieceComponent({ piece }: PieceProps) {
    const piecePosition = piece.position[0] * 10 + piece.position[1];

    return (
        <Draggable draggableId={'piece_' + fromPositionToCoordinates(piece.position)} index={piecePosition}>
            {(draggableProvided) => (
                <div ref={draggableProvided.innerRef} className={styles.piece} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                    <Image src={'/board/' + piece.img} alt={piece.type} width="100" height="100" />
                </div>
            )}
        </Draggable>
    );
}
