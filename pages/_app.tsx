import '@/styles/globals.css';
import { GetServerSideProps } from 'next';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return { props: { data: [] } };
};
