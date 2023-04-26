import Head from 'next/head';
import styles from './index.module.css';
import BoardComponent from '@/components/Board/BoardComponent';
import Piece from '@/src/Pieces/Piece';
import { useState } from 'react';
import { Position, fromPositionToCoordinates } from '@/src/Utils';
import { useGameContext } from '@/context/GameContext';

interface HomeProps {}

export default function Home({}: HomeProps) {
    const { game } = useGameContext();
    const [history, setHistory] = useState('');

    const callBackExecuteMove = (pieceToMove: Piece, newPosition: Position) => {
        if (game.executeMove(pieceToMove, newPosition)) {
            setHistory(history + fromPositionToCoordinates(newPosition));
        }
    };

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
                    <BoardComponent isMainBoard={true} callBackExecuteMove={callBackExecuteMove} />
                    <BoardComponent callBackExecuteMove={callBackExecuteMove} />
                </div>
            </main>
        </>
    );
}
