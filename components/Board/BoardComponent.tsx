import { callBackExecuteMoveType } from '@/pages'
import { useGameContext } from '@/context/GameContext'
import Square from '@/src/Square'
import TileComponent from '../Tile/TileComponent'
import { COLUMN_NAME } from '@/src/Utils'

interface BoardProps {
    isMainBoard?: boolean
    callBackExecuteMove: callBackExecuteMoveType
}

export default function BoardComponent({ isMainBoard, callBackExecuteMove }: BoardProps) {
    const { game } = useGameContext()
    const board = isMainBoard ? game.board : game.secondBoard
    return (
        <div className={isMainBoard ? 'basis-2/3' : 'basis-1/3 ml-auto'}>
            <table className={'border-2 border-black ' + (isMainBoard ? 'float-left' : 'float-right')}>
                <tbody>
                    {board.map((squares: Square[], index: number) => {
                        return (
                            <tr key={index}>
                                {squares.map((square: Square, index2: number) => {
                                    return <TileComponent key={index2} square={square} callBackExecuteMove={callBackExecuteMove} />
                                })}
                                <td key={index} className="border-2 border-black text-center px-2">
                                    {8 - index}
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        {COLUMN_NAME.map((columnLetter: string, index: number) => {
                            return (
                                <td key={index} className="border-2 border-black text-center">
                                    {columnLetter}
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
