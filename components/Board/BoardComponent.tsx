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
        <div className={isMainBoard ? 'firstPart' : 'secondPart basis-1/3'}>
            <table className={'border-2 border-black ' + (isMainBoard ? 'float-left' : 'float-right')}>
                <tbody>
                    {board.map((squares: Square[], rowIndex: number) => {
                        return (
                            <tr key={rowIndex}>
                                {squares.map((square: Square, colunmIndex: number) => {
                                    return <TileComponent key={colunmIndex} square={square} callBackExecuteMove={callBackExecuteMove} />
                                })}
                                <td key={rowIndex} className="border-2 border-black text-center px-2">
                                    {8 - rowIndex}
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        {COLUMN_NAME.map((columnLetter: string, colunmIndex: number) => {
                            return (
                                <td key={colunmIndex} className="border-2 border-black text-center">
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
