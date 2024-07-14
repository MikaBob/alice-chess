import { Html, Head, Main, NextScript } from 'next/document'
import { MODAL_ROOT_ELEMENT_ID } from '@/components/ModalPromotion/ModalPromotionComponent'

export default function Document() {
    // favicon requires to add basePath -_-
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" type="image/x-icon" href="/alice-chess/favicon.ico" />
            </Head>
            <body>
                <Main />
                <div id={MODAL_ROOT_ELEMENT_ID}></div>
                <NextScript />
            </body>
        </Html>
    )
}
