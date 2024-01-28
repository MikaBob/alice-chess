import { DragEventHandler } from 'react'
import { fromPositionToCoordinates } from '@/src/Utils'
import { useGameContext } from '@/context/GameContext'
import Image from 'next/image'
import Piece from '@/src/Pieces/Piece'
import styles from './piece.module.css'

interface PieceProps {
    piece: Piece
    onDragStart: DragEventHandler
}

export default function PieceComponent({ piece, onDragStart }: PieceProps) {
    const { game } = useGameContext()
    const coordinates: string = fromPositionToCoordinates(piece.position)

    function onMouseDown(e: any) {
        e.preventDefault()
        return false
    }

    if (game.isWhiteTurnToPlay === piece.isWhite) {
        // if it is your turn, activate drag&drop (onDragStart | OnMouseDown)
        return (
            <div id={'piece_' + coordinates} draggable="true" onDragStart={onDragStart} className={styles.piece}>
                <Image data-coordinates={coordinates} data-ismainboard={piece.isOnMainBoard} src={'/board/' + piece.img} alt={piece.type} width="100" height="100" />
            </div>
        )
    } else {
        return (
            <div id={'piece_' + coordinates} draggable="false" className={styles.piece} onMouseDown={onMouseDown}>
                <Image data-coordinates={coordinates} data-ismainboard={piece.isOnMainBoard} src={'/board/' + piece.img} alt={piece.type} width="100" height="100" />
            </div>
        )
    }
}
