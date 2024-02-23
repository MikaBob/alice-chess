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
        <div className="basis-1/2 ml-auto">
            <h2 className="text-sm md:text-2xl font-bold underline mb-2">Console</h2>
            <div>
                <div>
                    <h3 className="font-bold text-sm md:text-base m-2">{msg}</h3>
                    <button className={'bg-primary p-3 rounded-md font-semibold'} onClick={undoMove}>
                        Undo last move
                    </button>
                </div>
            </div>
        </div>
    )
}
