import { DragDropContext } from 'react-beautiful-dnd';
import Game from '@/src/Game';
import Square from '@/src/Square';
import styles from '@/styles/board.module.css';
import TileComponent from './TileComponent';
import { fromPositionToCoordniate } from '@/src/Utils';

export default function BoardComponent() {
    const onDragEnd = (result: any) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = source.droppableId;
        const dInd = destination.droppableId;
    };
    const game: Game = new Game();
    return (
        <table className={styles.board}>
            <DragDropContext onDragEnd={onDragEnd}>
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
            </DragDropContext>
        </table>
    );
}
