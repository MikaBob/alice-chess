import { PIECE_TYPE_PAWN, Pawn } from '@/src/Pieces/Pawn'
import { Position } from '@/src/Utils'
import { useGameContext } from '@/context/GameContext'
import { useState } from 'react'
import BoardComponent from '@/components/Board/BoardComponent'
import Head from 'next/head'
import ModalPromotionComponent, { ModalPromotionParametersType } from '@/components/ModalPromotion/ModalPromotionComponent'
import Piece from '@/src/Pieces/Piece'
import ConsoleComponent from '@/components/Console/ConsoleComponent'
import MoveListComponent from '@/components/MoveList/MoveListComponent'

interface HomeProps {}

export type callBackExecuteMoveType = (pieceToMove: Piece, newPosition: Position) => void

export default function Home({}: HomeProps) {
    const { game } = useGameContext()
    const [modalPromotionParameters, setModalPromotionParameters] = useState({
        isVisible: false,
        pawnToPromote: null,
    } as ModalPromotionParametersType)

    const callBackExecuteMove: callBackExecuteMoveType = (pieceToMove: Piece, newPosition: Position) => {
        if (game.verifyMove(pieceToMove, newPosition)) {
            if (pieceToMove.type === PIECE_TYPE_PAWN && ((game.isWhiteTurnToPlay && newPosition.row === 0) || (!game.isWhiteTurnToPlay && newPosition.row === 7))) {
                setModalPromotionParameters({ isVisible: true, pawnToPromote: pieceToMove as Pawn })
            } else {
                setModalPromotionParameters({ isVisible: false, pawnToPromote: null })
            }
            game.executeMove(pieceToMove, newPosition)
            game.calculateThreats()
        }
        //console.log(game)
    }

    //console.log(game)

    const modalPromotionClosed = (pieceSelected: string) => {
        game.promotePawn(modalPromotionParameters.pawnToPromote as Pawn, pieceSelected)
        setModalPromotionParameters({ isVisible: false, pawnToPromote: null })
    }

    return (
        <>
            <Head>
                <title>Alice Chess</title>
                <meta name="description" content="Online Alice chess" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className=" min-h-screen max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl m-auto p-3">
                <h1 className="text-md md:text-3xl font-bold underline text-center">Alice chess: a chess variant</h1>
                <div className="flex flex-row mt-3 p-1 items-center">
                    <BoardComponent isMainBoard={true} callBackExecuteMove={callBackExecuteMove} />
                    <BoardComponent callBackExecuteMove={callBackExecuteMove} />
                </div>
                <div className="flex flex-row mt-3 p-1 ">
                    <MoveListComponent />
                    <ConsoleComponent />
                </div>
                {modalPromotionParameters.isVisible && <ModalPromotionComponent onClose={modalPromotionClosed} pawnToPromote={modalPromotionParameters.pawnToPromote as Pawn} />}
            </main>
        </>
    )
}
