/* eslint-disable react/jsx-key */
import Game from '@/src/Game';
import Square from '@/src/Square';
import styles from '@/styles/board.module.css';
import Tile from './tile';

export default function Board() {
    const game: Game = new Game();
    return (
        <table className={styles.board}>
            <tbody>
                {game.board.map((squares: Square[]) => {
                    return (
                        <tr className={styles.row}>
                            {squares.map((square: Square) => {
                                return <Tile square={square} />;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
