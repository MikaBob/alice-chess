import { DragEventHandler } from 'react'
import { fromPositionToCoordinates } from '@/src/Utils'
import { useGameContext } from '@/context/GameContext'
import Image from 'next/image'
import Piece from '@/src/Pieces/Piece'

interface PieceProps {
    piece: Piece
    onDragStart: DragEventHandler
    preventDrag: DragEventHandler
}

export default function PieceComponent({ piece, onDragStart, preventDrag }: PieceProps) {
    const { game } = useGameContext()
    const coordinates: string = fromPositionToCoordinates(piece.position)

    const isYourTurn = game.isWhiteTurnToPlay === piece.isWhite
    // if it is your turn, activate drag&drop (onDragStart | OnMouseDown)
    return (
        <div id={'piece_' + coordinates} draggable={isYourTurn} onDragStart={isYourTurn ? onDragStart : preventDrag} className="absolute top-0">
            <Image
                className={isYourTurn ? '' : 'preventSelect'}
                data-coordinates={coordinates}
                data-ismainboard={piece.isOnMainBoard}
                src={'/board/' + piece.img}
                alt={piece.type}
                width="100"
                height="100"
            />
        </div>
    )
}
