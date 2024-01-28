import { Html, Head, Main, NextScript } from 'next/document'
import { MODAL_ROOT_ELEMENT_ID } from '@/components/ModalPromotion/ModalPromotionComponent'

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
