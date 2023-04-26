import Game from '@/src/Game';
import { ReactNode, createContext, useContext, useState } from 'react';

type GameContextType = {
    game: Game;
    updateGame: () => void;
};

const gameContextDefaultValues: GameContextType = {
    game: new Game(),
    updateGame: () => {},
};

const GameContext = createContext<GameContextType>(gameContextDefaultValues);

export function useGameContext() {
    return useContext(GameContext);
}

type GameProviderProps = {
    children: ReactNode;
};

export function GameProvider({ children }: GameProviderProps) {
    const [game, setGame] = useState<Game>(gameContextDefaultValues.game);

    const updateGame = () => {
        setGame(game);
        console.log('update game', game);
    };

    return <GameContext.Provider value={{ game, updateGame }}> {children} </GameContext.Provider>;
}
