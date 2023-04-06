import Square from '@/src/Square';
import styles from './board.module.css';
import TileComponent from '../Tile/TileComponent';
import { useGameContext } from '@/context/GameContext';

interface BoardProps {}

export default function BoardComponent({}: BoardProps) {
    const { game } = useGameContext();

    return (
        <table className={styles.board}>
            <tbody>
                {game.board.map((squares: Square[], index: number) => {
                    return (
                        <tr key={index} className={styles.row}>
                            {squares.map((square: Square, index2: number) => {
                                return <TileComponent key={index2} square={square} />;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
