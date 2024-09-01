import { useGameContext } from '@/context/GameContext'
import Game from '@/src/Game'
import { saveMoveListInLS } from '@/src/Utils'

export const BUTTON_TOGGLE_ROTATE_BOARDS_ID = 'toggleRotateBoards'
export const BUTTON_TOGGLE_AUTO_ROTATE_ID = 'toggleAutoRotate'
export const BUTTON_TOGGLE_BOARDS_ATTRIBUTE_ROTATES = 'shouldRotate'

interface ConsoleProps {}

export default function ConsoleComponent({}: ConsoleProps) {
    const { game, updateGame } = useGameContext()

    let msg = game.isWhiteTurnToPlay ? 'White' : 'Black'
    if (game.isCheckmate()) {
        msg = 'Checkmate. ' + msg + ' lost'
    } else if (game.isPat()) {
        msg = 'Pat. ' + msg + ' can not do any valid move'
    } else {
        msg += "'s turn"
    }

    const undoMove = () => {
        game.cancelLastMove()
        updateGame(game)
    }

    const resetBoard = () => {
        saveMoveListInLS([])
        const newGame = new Game()
        newGame.initChessSet()
        updateGame(newGame)
    }

    const toggleRotateBoards = () => {
        document.getElementById(BUTTON_TOGGLE_ROTATE_BOARDS_ID)?.toggleAttribute(BUTTON_TOGGLE_BOARDS_ATTRIBUTE_ROTATES)
        updateGame(game)
    }

    const toggleAutoRotate = () => {
        let autoRotateBtn: HTMLElement | null = document.getElementById(BUTTON_TOGGLE_AUTO_ROTATE_ID)
        if (!autoRotateBtn) return
        autoRotateBtn.toggleAttribute(BUTTON_TOGGLE_AUTO_ROTATE_ID)
        if (autoRotateBtn.hasAttribute(BUTTON_TOGGLE_AUTO_ROTATE_ID) ?? false) {
            autoRotateBtn.className = autoRotateBtn.className.replaceAll('bg-primary', 'bg-secondary')
            autoRotateBtn.className = autoRotateBtn.className.replaceAll('hover:bg-secondary', 'hover:bg-primary')
        } else {
            autoRotateBtn.className = autoRotateBtn.className.replaceAll('bg-secondary', 'bg-primary')
            autoRotateBtn.className = autoRotateBtn.className.replaceAll('hover:bg-primary', 'hover:bg-secondary')
        }
    }

    return (
        <div className="secondPart">
            <h2 className="text-sm md:text-2xl font-bold underline mb-2">Console</h2>
            <div className="h-52">
                <div>
                    <h3 className="font-bold text-sm md:text-base m-2">{msg}</h3>
                    <button className={'bg-primary hover:bg-secondary p-3 rounded-md font-semibold'} onClick={undoMove}>
                        Undo last move
                    </button>
                    <button className={'bg-primary hover:bg-secondary p-3 rounded-md font-semibold ml-2'} onClick={resetBoard}>
                        Reset boards
                    </button>
                    <button id={BUTTON_TOGGLE_ROTATE_BOARDS_ID} className={'bg-primary hover:bg-secondary p-3 rounded-md font-semibold ml-2'} onClick={toggleRotateBoards}>
                        Rotate boards
                    </button>
                    <button id={BUTTON_TOGGLE_AUTO_ROTATE_ID} className={'bg-primary hover:bg-secondary p-3 rounded-md font-semibold mt-2'} onClick={toggleAutoRotate}>
                        Auto rotate
                    </button>
                </div>
            </div>
        </div>
    )
}
