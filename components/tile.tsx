import Square from '@/src/Square';
import styles from '@/styles/tile.module.css';
import Image from 'next/image';

interface TileProps {
    square: Square;
}

export default function Tile({ square }: TileProps) {
    const tileColor: string = square.isWhite ? 'white' : 'black';
    return (
        <td>
            <div className={styles.tile}>
                <div className={styles.tileBackground}>
                    <Image src={'/board/' + tileColor + '-tile.png'} alt={tileColor + ' tile'} width="100" height="100" />
                </div>
                {square.piece !== undefined && (
                    <div className={styles.piece}>
                        <Image src={'/board/' + square.piece.img} alt={square.piece.type} width="100" height="100" />
                    </div>
                )}
            </div>
        </td>
    );
}
