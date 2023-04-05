import Square from '@/src/Square';
import styles from './board.module.css';
import TileComponent from '../Tile/TileComponent';
import Game from '@/src/Game';

interface BoardProps {
    game: Game;
}

export default function BoardComponent({ game }: BoardProps) {
    return (
        <table className={styles.board}>
            <tbody>
                {game.board.map((squares: Square[], index: number) => {
                    return (
                        <tr key={index} className={styles.row}>
                            {squares.map((square: Square, index2: number) => {
                                return <TileComponent key={index2} square={square} game={game} />;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
