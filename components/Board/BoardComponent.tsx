import Square from '@/src/Square'
import styles from './board.module.css'
import TileComponent from '../Tile/TileComponent'
import { useGameContext } from '@/context/GameContext'

interface BoardProps {
    isMainBoard?: boolean
    callBackExecuteMove: any
}

export default function BoardComponent({ isMainBoard, callBackExecuteMove }: BoardProps) {
    const { game } = useGameContext()
    const board = isMainBoard ? game.board : game.secondBoard
    return (
        <div className={styles.board + ' mr-3'}>
            <table>
                <tbody>
                    {board.map((squares: Square[], index: number) => {
                        return (
                            <tr key={index} className={styles.row}>
                                {squares.map((square: Square, index2: number) => {
                                    return <TileComponent key={index2} square={square} callBackExecuteMove={callBackExecuteMove} />
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
