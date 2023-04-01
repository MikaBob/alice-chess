import { DragDropContext } from 'react-beautiful-dnd';
import Square from '@/src/Square';
import styles from './board.module.css';
import TileComponent from '../Tile/TileComponent';
import { useGameContext } from '@/context/GameContext';
import { fromCoordinatesToPosition } from '@/src/Utils';

export default function BoardComponent() {
    const { game } = useGameContext();

    const onDragEnd = (result: any) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const positionSource = fromCoordinatesToPosition(source.droppableId);
        const positionDestination = fromCoordinatesToPosition(destination.droppableId);

        game.executeMove(positionSource, positionDestination);
    };

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
