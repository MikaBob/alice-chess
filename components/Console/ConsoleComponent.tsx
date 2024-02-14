import { useGameContext } from '@/context/GameContext'
import styles from './console.module.css'

interface ConsoleProps {}

export default function ConsoleComponent({}: ConsoleProps) {
    const { game, updateGame } = useGameContext()
    const msg = game.isGameOver() ? 'Game Over' : (game.isWhiteTurnToPlay ? 'White' : 'Black') + "'s turn"

    function undoMove() {
        game.cancelLastMove()
        updateGame(game)
    }

    return (
        <div className={styles.consoleContainer + 'max-h-64 w-auto p-3 grid grid-cols-2 gap-4 mt-3'}>
            <div className="w-1/2 p-2">
                <h2 className="text-xl font-bold underline mb-2">History</h2>
                <div className="max-h-48 overflow-y-auto grid grid-cols-2 gap-4 mt-3">
                    <ul className="list-disc pl-4">
                        <h3 className="font-bold">White</h3>
                        {game.moveList.map((move: string, index: number) => {
                            if (index % 2 === 0) return <li key={index}>{move}</li>
                        })}
                    </ul>
                    <ul className="list-disc pl-2">
                        <h3 className="font-bold">Black</h3>
                        {game.moveList.map((move: string, index: number) => {
                            if (index % 2 === 1) return <li key={index}>{move}</li>
                        })}
                    </ul>
                </div>
            </div>
            <div className="w-1/2 p-2">
                <h2 className="text-xl font-bold underline mb-2">Console</h2>
                <div>
                    <h3 className="font-bold">{msg}</h3>
                    <button className={styles.consoleButton + ' p-3 rounded-md font-semibold'} onClick={undoMove}>
                        Undo
                    </button>
                </div>
            </div>
        </div>
    )
}
