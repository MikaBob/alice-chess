import { MODAL_ROOT_ELEMENT_ID } from '@/components/ModalPromotion/ModalPromotionComponent'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <div id={MODAL_ROOT_ELEMENT_ID}></div>
                <NextScript />
            </body>
        </Html>
    )
}
