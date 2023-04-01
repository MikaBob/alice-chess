import { Droppable } from 'react-beautiful-dnd';
import { fromPositionToCoordniate } from '@/src/Utils';
import Image from 'next/image';
import PieceComponent from './PieceComponent';
import Square from '@/src/Square';
import styles from '@/styles/tile.module.css';

interface TileProps {
    square: Square;
}

export default function TileComponent({ square }: TileProps) {
    const tileColor: string = square.isWhite ? 'white' : 'black';
    return (
        <td>
            <Droppable droppableId={'tile_' + fromPositionToCoordniate(square.position)}>
                {(droppableProvided) => (
                    <div className={styles.tile} ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                        <div className={styles.tileBackground}>
                            <Image src={'/board/' + tileColor + '-tile.png'} alt={tileColor + ' tile'} width="100" height="100" />
                        </div>
                        {square.piece !== undefined && <PieceComponent piece={square.piece} />}
                    </div>
                )}
            </Droppable>
        </td>
    );
}
