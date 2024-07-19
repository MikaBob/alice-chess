import { callBackExecuteMoveType } from '@/pages'
import { useGameContext } from '@/context/GameContext'
import Square from '@/src/Square'
import TileComponent from '../Tile/TileComponent'
import { COLUMN_NAME } from '@/src/Utils'
import { BUTTON_TOGGLE_BOARDS_ATTRIBUTE_ROTATES, BUTTON_TOGGLE_BOARDS_ID } from '../Console/ConsoleComponent'

interface BoardProps {
    isMainBoard?: boolean
    callBackExecuteMove: callBackExecuteMoveType
}

export default function BoardComponent({ isMainBoard, callBackExecuteMove }: BoardProps) {
    const { game } = useGameContext()
    const shallowGame = game.cloneGame()
    const columnNames = [...COLUMN_NAME]
    const board = isMainBoard ? shallowGame.board : shallowGame.secondBoard

    let shouldRotateBoards = null
    if (typeof document !== 'undefined') {
        shouldRotateBoards = document.getElementById(BUTTON_TOGGLE_BOARDS_ID)?.hasAttribute(BUTTON_TOGGLE_BOARDS_ATTRIBUTE_ROTATES)
        if (shouldRotateBoards) {
            board.reverse()
            columnNames.reverse()
        }
    }

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
                                    {shouldRotateBoards ? 8 - rowIndex : 1 + rowIndex}
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        {columnNames.map((columnLetter: string, colunmIndex: number) => {
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
