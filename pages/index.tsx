import Head from 'next/head';
import styles from './index.module.css';
import BoardComponent from '@/components/Board/BoardComponent';

interface HomeProps {}

export default function Home({}: HomeProps) {
    return (
        <>
            <Head>
                <title>Alice Chess</title>
                <meta name="description" content="Online Alice chess" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.main}>
                <h1 className="text-3xl font-bold underline">Alice chess: a chess variant</h1>
                <div className="grid grid-cols-2 gap-4 mt-3">
                    <BoardComponent />
                    <BoardComponent isSecondBoard={true} />
                </div>
            </main>
        </>
    );
}
