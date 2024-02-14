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
        <div className="basis-1/3 ml-auto">
            <h2 className="text-sm md:text-2xl font-bold underline mb-2">Console</h2>
            <div>
                <h3 className="font-bold text-sm md:text-base">{msg}</h3>
                <button className={styles.consoleButton + ' p-3 rounded-md font-semibold'} onClick={undoMove}>
                    Undo
                </button>
            </div>
        </div>
    )
}
