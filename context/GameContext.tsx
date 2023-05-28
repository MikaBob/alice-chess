import Game from '@/src/Game'
import { ReactNode, createContext, useContext, useState } from 'react'

type GameContextType = {
    game: Game
    updateGame: () => void
}

const game = new Game()
game.initChessSet()

const gameContextDefaultValues: GameContextType = {
    game: game,
    updateGame: () => {},
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

    const updateGame = () => {
        setGame(game)
    }

    return <GameContext.Provider value={{ game, updateGame }}> {children} </GameContext.Provider>
}
