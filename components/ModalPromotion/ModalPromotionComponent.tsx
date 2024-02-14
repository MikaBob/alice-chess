import { Pawn } from '@/src/Pieces/Pawn'
import Image from 'next/image'
import Piece from '@/src/Pieces/Piece'
import React from 'react'
import ReactDOM from 'react-dom'
import styles from './modalPromotion.module.css'

export const MODAL_ROOT_ELEMENT_ID = 'modal-root'

interface ModalPromotionProps {
    onClose: (pieceSelected: string) => void
    pawnToPromote: Pawn
}

export type ModalPromotionParametersType = {
    isVisible: boolean
    pawnToPromote: Pawn | null
}

export default function ModalPromotionComponent({ onClose, pawnToPromote }: ModalPromotionProps) {
    const handleCloseClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        onClose('')
    }

    const clickPossiblePromotion = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        onClose(e.currentTarget.dataset.pieceselectedforpromotion ?? '')
    }

    const modalContent: any = (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className={styles.modalWrapper + ' rounded-md p-3 border-2'}>
                <div className="flex text-2xl">
                    <h1 className="m-auto">Promotion selection</h1>
                    <a href="#" onClick={handleCloseClick}>
                        x
                    </a>
                </div>
                <div className="pt-2">
                    {pawnToPromote.getPossiblePromotions().map((possiblePromotion: Piece, index: number) => {
                        return (
                            <div key={index} className={styles.possiblePromotionRow + ' flex pt-2 w-full'} onClick={clickPossiblePromotion} data-pieceselectedforpromotion={possiblePromotion.type}>
                                <Image src={'/board/' + possiblePromotion.img} alt={possiblePromotion.type} width="100" height="100" />
                                <span className="m-auto">{possiblePromotion.type}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

    return ReactDOM.createPortal(modalContent, document.getElementById(MODAL_ROOT_ELEMENT_ID) as HTMLElement)
}
