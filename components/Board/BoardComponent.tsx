import Square from '@/src/Square';
import styles from './board.module.css';
import TileComponent from '../Tile/TileComponent';
import { useGameContext } from '@/context/GameContext';

interface BoardProps {
    isSecondBoard?: boolean;
}

export default function BoardComponent({ isSecondBoard }: BoardProps) {
    const { game } = useGameContext();

    const board = isSecondBoard ? game.secondBoard : game.board;
    return (
        <div className={styles.board + ' mr-3'}>
            <table>
                <tbody>
                    {board.map((squares: Square[], index: number) => {
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
        </div>
    );
}
