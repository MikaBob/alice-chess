import Image from 'next/image'
import PieceComponent from '../Piece/PieceComponent'
import Square from '@/src/Square'
import styles from './tile.module.css'
import { Position, fromCoordinatesToPosition, fromPositionToCoordinates } from '@/src/Utils'
import { useState } from 'react'
import Piece from '@/src/Pieces/Piece'
import { useGameContext } from '@/context/GameContext'
import { DragNDropState, selectDragNDropState, setDragNDropState } from '../../src/store/DragNDropSlice'
import { useDispatch, useSelector } from 'react-redux'

interface TileProps {
    square: Square
    callBackExecuteMove: any
}

let draggedPiece: Piece | null = null
export default function TileComponent({ square, callBackExecuteMove }: TileProps) {
    const { game } = useGameContext()
    const coordinates: string = fromPositionToCoordinates(square.position)
    const tileColor: string = square.isWhite ? 'white' : 'black'
    const [cssClasses, setCssClasses] = useState(styles.tile)

    const dragNDropState: DragNDropState = useSelector(selectDragNDropState)
    const dispatch = useDispatch()

    function pieceDragStart(e: React.DragEvent<HTMLDivElement>) {
        if (e !== null && e.target instanceof HTMLElement) {
            const isPieceOnMainBoard: boolean | undefined = e.target.dataset.ismainboard === 'true'
            const targetCoordinates: string | undefined = e.target.dataset.coordinates
            if (targetCoordinates !== undefined && isPieceOnMainBoard !== undefined) {
                const targetPosition: Position = fromCoordinatesToPosition(targetCoordinates)
                const piece: Piece | null = isPieceOnMainBoard ? game.board[targetPosition.row][targetPosition.column].piece : game.secondBoard[targetPosition.row][targetPosition.column].piece
                if (piece !== null) {
                    draggedPiece = piece
                    setCssClasses(styles.tile + ' ' + styles.pieceOriginalTile)
                }
            }
        }
        //console.log('pieceDragStart', draggedPiece);
    }

    function pieceDropped(e: any) {
        const targetCoordinates: string = e.target.dataset.coordinates
        setCssClasses(styles.tile)

        if (draggedPiece !== null) {
            const newPosition: Position = fromCoordinatesToPosition(targetCoordinates)

            if (newPosition.row !== draggedPiece.position.row || newPosition.column !== draggedPiece.position.column) {
                callBackExecuteMove(draggedPiece, newPosition)
            }
            //console.log('piecedropped', draggedPiece, targetCoordinates);
        }
        dispatch(setDragNDropState({ isDragging: false, hoveredCoordinates: null } as DragNDropState))
    }

    function tileDragEnter(e: React.DragEvent<HTMLDivElement>) {
        //console.log('tileDragEnter', draggedPiece);
        if (draggedPiece !== null && coordinates !== fromPositionToCoordinates(draggedPiece.position)) {
            //setCssClasses(styles.tile + ' ' + styles.pieceDraggedOver)
        }
        dispatch(setDragNDropState({ isDragging: true, hoveredCoordinates: fromPositionToCoordinates(square.position) } as DragNDropState))
    }

    function tileDragLeave(e: React.DragEvent<HTMLDivElement>) {
        //console.log('tileDragLeave', draggedPiece);
        if (e !== null && e.target instanceof HTMLElement) {
            const targetCoordinates: string | undefined = e.target.dataset.coordinates
            if (targetCoordinates !== undefined) {
                if (draggedPiece !== null && fromPositionToCoordinates(draggedPiece.position) !== targetCoordinates) setCssClasses(styles.tile)
            }
        }
    }

    function onDragOver(e: any) {
        e.preventDefault()
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.dropEffect = 'move'
    }

    const isPieceAboveTile: boolean = dragNDropState.isDragging !== null ? coordinates === dragNDropState.hoveredCoordinates : false
    return (
        <td>
            <div
                id={'tile_' + coordinates}
                className={isPieceAboveTile ? cssClasses + ' ' + styles.pieceDraggedOver : cssClasses}
                onDragEnter={tileDragEnter}
                onDragLeave={tileDragLeave}
                onDragOver={onDragOver}
                onDrop={pieceDropped}
            >
                <div className={styles.tileBackground}>
                    <Image data-coordinates={coordinates} src={'/board/' + tileColor + '-tile.png'} alt={tileColor + ' tile'} width="100" height="100" />
                </div>
                {square.piece !== null && <PieceComponent piece={square.piece} onDragStart={pieceDragStart} />}
            </div>
        </td>
    )
}
