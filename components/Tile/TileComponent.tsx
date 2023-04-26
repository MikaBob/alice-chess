import Image from 'next/image';
import PieceComponent from '../Piece/PieceComponent';
import Square from '@/src/Square';
import styles from './tile.module.css';
import { Position, fromCoordinatesToPosition, fromPositionToCoordinates } from '@/src/Utils';
import { useState } from 'react';
import Piece from '@/src/Pieces/Piece';
import { useGameContext } from '@/context/GameContext';

interface TileProps {
    square: Square;
    callBackExecuteMove: any;
}

let draggedPiece: Piece | null = null;
export default function TileComponent({ square, callBackExecuteMove }: TileProps) {
    const { game } = useGameContext();
    const coordinates: string = fromPositionToCoordinates(square.position);
    const tileColor: string = square.isWhite ? 'white' : 'black';
    const [cssClasses, setCssClasses] = useState(styles.tile);

    function pieceDragStart(e: React.DragEvent<HTMLDivElement>) {
        if (e !== null && e.target instanceof HTMLElement) {
            const isPieceOnMainBoard: boolean | undefined = e.target.dataset.ismainboard === 'true';
            const targetCoordinates: string | undefined = e.target.dataset.coordinates;
            if (targetCoordinates !== undefined && isPieceOnMainBoard !== undefined) {
                const targetPosition: Position = fromCoordinatesToPosition(targetCoordinates);
                const piece: Piece | null = isPieceOnMainBoard ? game.board[targetPosition.row][targetPosition.column].piece : game.secondBoard[targetPosition.row][targetPosition.column].piece;
                if (piece !== null) {
                    draggedPiece = piece;
                    setCssClasses(styles.tile + ' ' + styles.pieceDraggedOver + ' ' + styles.pieceOriginalTile);
                }
            }
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

        if (draggedPiece !== null) {
            const newPosition: Position = fromCoordinatesToPosition(targetCoordinates);
            callBackExecuteMove(draggedPiece, newPosition);
            //console.log('piecedropped', draggedPiece, targetCoordinates);
        }
    }

    function tileDragEnter(e: React.DragEvent<HTMLDivElement>) {
        //console.log('tileDragEnter', draggedPiece);
        if (draggedPiece !== null && coordinates !== fromPositionToCoordinates(draggedPiece.position)) {
            setCssClasses(styles.tile + ' ' + styles.pieceDraggedOver);
        }
    }

    function tileDragLeave(e: React.DragEvent<HTMLDivElement>) {
        //console.log('tileDragLeave', draggedPiece);
        if (e !== null && e.target instanceof HTMLElement) {
            const targetCoordinates: string | undefined = e.target.dataset.coordinates;
            if (targetCoordinates !== undefined) {
                if (draggedPiece !== null && fromPositionToCoordinates(draggedPiece.position) !== targetCoordinates) setCssClasses(styles.tile);
            }
        }
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
