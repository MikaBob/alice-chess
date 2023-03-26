import Head from 'next/head';
import styles from '@/styles/index.module.css';
import Board from '@/components/board';

export default function Home() {
    return (
        <>
            <Head>
                <title>Alice CHess</title>
                <meta name="description" content="Online Alice chess" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.main}>
                <h1 className="text-3xl font-bold underline">Alice chess: a chess variant</h1>
            </main>
        </>
    );
}
