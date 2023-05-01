import './globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../src/store/Store'
import { GameProvider } from '@/context/GameContext'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
    const { store } = wrapper.useWrappedStore(pageProps)
    return (
        <Provider store={store}>
            <GameProvider>
                <Component {...pageProps} />
            </GameProvider>
        </Provider>
    )
}
