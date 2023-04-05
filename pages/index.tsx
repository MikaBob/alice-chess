import Head from 'next/head';
import styles from '@/styles/index.module.css';
import BoardComponent from '@/components/Board/BoardComponent';
import Game from '@/src/Game';

interface HomeProps {
    gameInJson: string;
}

export default function Home({ gameInJson }: HomeProps) {
    const game: Game = JSON.parse(gameInJson);

    return (
        <>
            <Head>
                <title>Alice Chess</title>
                <meta name="description" content="Online Alice chess" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.main}>
                <h1 className="text-3xl font-bold underline">Alice chess: a chess variant</h1>
                <BoardComponent game={game} />
            </main>
        </>
    );
}

export async function getStaticProps() {
    const game = new Game();
    return {
        props: {
            gameInJson: JSON.stringify(game),
        },
    };
}
