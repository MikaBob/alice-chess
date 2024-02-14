import { callBackExecuteMoveType } from '@/pages'
import { DragNDropState, selectDragNDropState, setDragNDropState } from '../../src/store/DragNDropSlice'
import { Position, arePositionsIdentical, fromCoordinatesToPosition, fromPositionToCoordinates, isPositionInList } from '@/src/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { useGameContext } from '@/context/GameContext'
import Image from 'next/image'
import Piece from '@/src/Pieces/Piece'
import PieceComponent from '../Piece/PieceComponent'
import Square from '@/src/Square'
import styles from './tile.module.css'

interface TileProps {
    square: Square
    callBackExecuteMove: callBackExecuteMoveType
}

export default function TileComponent({ square, callBackExecuteMove }: TileProps) {
    const { game } = useGameContext()
    const dispatch = useDispatch()
    const dragNDropState: DragNDropState = useSelector(selectDragNDropState)

    const preventDrag = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault()
    }

    /**
     * Figure out the tile & dragged piece
     * Initialize & dispatch DragNDrop state
     */
    const pieceDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        if (e !== null && e.target instanceof HTMLElement) {
            const isPieceOnMainBoard: boolean | undefined = e.target.dataset.ismainboard === 'true'
            const targetCoordinates: string | undefined = e.target.dataset.coordinates
            if (targetCoordinates !== undefined && isPieceOnMainBoard !== undefined) {
                const targetPosition: Position = fromCoordinatesToPosition(targetCoordinates)
                const pieceDragged: Piece | null = isPieceOnMainBoard ? game.board[targetPosition.row][targetPosition.column].piece : game.secondBoard[targetPosition.row][targetPosition.column].piece
                if (pieceDragged !== null) {
                    dispatch(setDragNDropState({ isDragging: true, hoveredCoordinates: targetCoordinates, piece: pieceDragged } as DragNDropState))
                }
            }
        }
    }

    /**
     * Get the piece from dispatched DragNDrop state
     * Figure out the piece new coordinates
     * call back to validate the move
     */
    const pieceDropped = (e: React.DragEvent<HTMLDivElement>) => {
        if (e !== null && e.target instanceof HTMLElement) {
            const targetCoordinates: string | undefined = e.target.dataset.coordinates

            if (targetCoordinates !== undefined) {
                if (dragNDropState.piece !== null) {
                    const newPosition: Position = fromCoordinatesToPosition(targetCoordinates)

                    if (newPosition.row !== dragNDropState.piece.position.row || newPosition.column !== dragNDropState.piece.position.column) {
                        callBackExecuteMove(dragNDropState.piece, newPosition)
                    }
                }
                dispatch(setDragNDropState({ isDragging: false, hoveredCoordinates: null, piece: null } as DragNDropState))
            }
        }
    }

    /**
     * Update DragNDrop state with piece's new coordinates
     */
    const tileDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        dispatch(
            setDragNDropState({
                isDragging: true,
                hoveredCoordinates: fromPositionToCoordinates(square.position),
                piece: dragNDropState.piece,
            } as DragNDropState),
        )
    }

    /**
     * Change cursor's icon while dragging
     */
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.dropEffect = 'move'
    }

    /**
     * Component rendering
     */

    let isOriginalTileOfDraggedPiece: boolean = false
    let isTileAPossiblePosition: boolean = false
    if (dragNDropState.piece !== null) {
        isOriginalTileOfDraggedPiece = arePositionsIdentical(square.position, dragNDropState.piece.position)
        if (dragNDropState.piece.possibleMoves.length > 0) {
            if (isPositionInList(square.position, dragNDropState.piece.possibleMoves)) {
                isTileAPossiblePosition = true
            }
        }
    }

    const coordinates: string = fromPositionToCoordinates(square.position)
    const isDraggedPieceAboveTile: boolean = dragNDropState.isDragging ? coordinates === dragNDropState.hoveredCoordinates : false
    const isKingUnderThreat: boolean = square.piece?.type === 'King' && square.isThreatenedByColor(!square.piece?.isWhite)

    let cssClasses: string = "relative before:w-full before:h-full before:absolute before:content-[''] before:pointer-events-none "
    cssClasses += isOriginalTileOfDraggedPiece ? ' ' + styles.pieceOriginalTile : '' // Orange for current piece position
    cssClasses += isKingUnderThreat ? ' ' + styles.tileUnderThreat : '' // Red for the king's tile, when he is under threat
    cssClasses += isTileAPossiblePosition ? ' ' + styles.piecePossibleMoves : '' // Green if the tile is a possible move
    cssClasses += isDraggedPieceAboveTile ? ' ' + styles.pieceDraggedOver : '' // Purple to show the current drop tile

    const tileImgPrefix: string = square.isWhite ? 'white' : 'black'
    return (
        <td>
            <div id={'tile_' + coordinates} className={cssClasses} onDragEnter={tileDragEnter} onDragOver={onDragOver} onDrop={pieceDropped}>
                <div className={styles.tileBackground + ' ' + (square.isOnMainBoard ? ' ' : styles.secondBoard)} onDragStart={preventDrag}>
                    <Image data-coordinates={coordinates} src={'/board/' + tileImgPrefix + '-tile.png'} alt={tileImgPrefix + ' tile'} width="100" height="100" />
                </div>
                {square.piece !== null && <PieceComponent piece={square.piece} onDragStart={pieceDragStart} preventDrag={preventDrag} />}
            </div>
        </td>
    )
}
