import { ReactNode, createContext, useContext, useState } from 'react'
import Game from '@/src/Game'
import { loadMoveListFromLS } from '@/src/Utils'

type GameContextType = {
    game: Game
    updateGame: (oldGame: Game) => void
}

const game = new Game()
game.initChessSet()

const gameContextDefaultValues: GameContextType = {
    game: game,
    updateGame: (oldGame: Game) => {
        return oldGame
    },
}

const GameContext = createContext<GameContextType>(gameContextDefaultValues)

export function useGameContext() {
    return useContext(GameContext)
}

type GameProviderProps = {
    children: ReactNode
}

export function GameProvider({ children }: GameProviderProps) {
    const [game, setGame] = useState<Game>(gameContextDefaultValues.game)

    const updateGame = (oldGame: Game) => {
        const newGame = oldGame.cloneGame()
        setGame(newGame)
        return newGame
    }

    return <GameContext.Provider value={{ game, updateGame }}> {children} </GameContext.Provider>
}
