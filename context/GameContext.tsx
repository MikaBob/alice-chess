import Game from '@/src/Game';
import { createContext, useContext } from 'react';

export interface GameContextProps {
    game: Game;
}

const GameContext = createContext({
    game: new Game(),
} as GameContextProps);

export function useGameContext() {
    return useContext(GameContext);
}
