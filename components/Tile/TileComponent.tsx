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
    const coordinates: string = fromPositionToCoordinates(square.position)
    const tileColor: string = square.isWhite ? 'white' : 'black'

    const dragNDropState: DragNDropState = useSelector(selectDragNDropState)
    const dispatch = useDispatch()

    function pieceDragStart(e: React.DragEvent<HTMLDivElement>) {
        //console.log('pieceDragStart')
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

    function pieceDropped(e: any) {
        //console.log('piecedropped')
        const targetCoordinates: string = e.target.dataset.coordinates

        if (dragNDropState.piece !== null) {
            const newPosition: Position = fromCoordinatesToPosition(targetCoordinates)

            if (newPosition.row !== dragNDropState.piece.position.row || newPosition.column !== dragNDropState.piece.position.column) {
                callBackExecuteMove(dragNDropState.piece, newPosition)
            }
        }
        dispatch(setDragNDropState({ isDragging: false, hoveredCoordinates: null, piece: null } as DragNDropState))
    }

    function tileDragEnter(e: React.DragEvent<HTMLDivElement>) {
        //console.log('tileDragEnter', dragNDropState)
        dispatch(
            setDragNDropState({
                isDragging: true,
                hoveredCoordinates: fromPositionToCoordinates(square.position),
                piece: dragNDropState.piece,
            } as DragNDropState),
        )
    }

    function tileDragLeave(e: React.DragEvent<HTMLDivElement>) {
        //console.log('tileDragLeave')
        /*         if (e !== null && e.target instanceof HTMLElement) {
            const targetCoordinates: string | undefined = e.target.dataset.coordinates
            if (targetCoordinates !== undefined) {
                if (dragNDropState.piece !== null && fromPositionToCoordinates(dragNDropState.piece.position) !== targetCoordinates) {
                }
            }
        } */
    }

    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.dropEffect = 'move'
    }

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
    const isPieceAboveTile: boolean = dragNDropState.isDragging ? coordinates === dragNDropState.hoveredCoordinates : false
    const isTileUnderThreat: boolean = square.isThreatenBy.length > 0

    let cssClasses: string = styles.tile
    cssClasses += isOriginalTileOfDraggedPiece ? ' ' + styles.pieceOriginalTile : ''
    cssClasses += isTileAPossiblePosition ? ' ' + styles.piecePossibleMoves : ''
    cssClasses += isPieceAboveTile ? ' ' + styles.pieceDraggedOver : ''
    cssClasses += isTileUnderThreat && square.piece?.type === 'King' ? ' ' + styles.tileUnderThreat : ''

    return (
        <td>
            <div id={'tile_' + coordinates} className={cssClasses} onDragEnter={tileDragEnter} onDragLeave={tileDragLeave} onDragOver={onDragOver} onDrop={pieceDropped}>
                <div className={styles.tileBackground}>
                    <Image data-coordinates={coordinates} src={'/board/' + tileColor + '-tile.png'} alt={tileColor + ' tile'} width="100" height="100" />
                </div>
                {square.piece !== null && <PieceComponent piece={square.piece} onDragStart={pieceDragStart} />}
            </div>
        </td>
    )
}
