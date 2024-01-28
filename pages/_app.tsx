import './globals.css'
import { GameProvider } from '@/context/GameContext'
import { Provider } from 'react-redux'
import { wrapper } from '../src/store/Store'
import type { AppProps } from 'next/app'

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
