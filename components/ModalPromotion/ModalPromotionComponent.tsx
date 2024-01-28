import { Pawn } from '@/src/Pieces/Pawn'
import Image from 'next/image'
import Piece from '@/src/Pieces/Piece'
import React from 'react'
import ReactDOM from 'react-dom'
import styles from './modalPromotion.module.css'

export const MODAL_ROOT_ELEMENT_ID = 'modal-root'

interface ModalPromotion {
    onClose: (pieceSelected: string)=>void,
    pawnToPromote: Pawn
}

export type ModalPromotionParametersType = {
    isVisible: boolean
    pawnToPromote: Pawn | null
}

export default function ModalPromotionComponent({ onClose, pawnToPromote }: ModalPromotion) {
    const handleCloseClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        onClose('')
    }

    const clickPossiblePromotion = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        onClose(e.currentTarget.dataset.pieceselectedforpromotion ?? '')
    }

    const modalContent: any  = (
      <div className={styles.modalOverlay} >
            <div className={styles.modalWrapper}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h1>Promotion selection</h1>
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    <div className={styles.modalBody}>
                        {
                            pawnToPromote.getPossiblePromotions().map((possiblePromotion: Piece, index: number) => {
                                return (
                                    <div key={index} className={styles.possiblePromotionRow} onClick={clickPossiblePromotion} data-pieceselectedforpromotion={possiblePromotion.type}>
                                        <Image src={'/board/' + possiblePromotion.img} alt={possiblePromotion.type} width="100" height="100" />
                                        <span>{possiblePromotion.type}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )

    return ReactDOM.createPortal(
      modalContent,
      document.getElementById(MODAL_ROOT_ELEMENT_ID) as HTMLElement
    )
}
