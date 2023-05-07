import Image from 'next/image'
import Piece from '@/src/Pieces/Piece'
import styles from './piece.module.css'
import { DragEventHandler } from 'react'
import { fromPositionToCoordinates } from '@/src/Utils'
import { useGameContext } from '@/context/GameContext'

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

    // if it is your turn, activate drag&drop (onDragStart | OnMouseDown)
    if (game.isWhiteTurnToPlay === piece.isWhite) {
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
