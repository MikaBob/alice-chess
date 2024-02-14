import { useGameContext } from '@/context/GameContext'

interface MoveListProps {}

export default function MoveListComponent({}: MoveListProps) {
    const { game } = useGameContext()
    return (
        <div className="basis-2/3">
            <h2 className="text-sm md:text-2xl font-bold underline mb-2">History</h2>
            <div className="overflow-y-auto grid grid-cols-2 gap-4 mt-3">
                <ul className="list-disc pl-4">
                    <h3 className="font-bold text-sm md:text-base">White</h3>
                    {game.moveList.map((move: string, index: number) => {
                        if (index % 2 === 0) return <li key={index}>{move}</li>
                    })}
                </ul>
                <ul className="list-disc pl-2">
                    <h3 className="font-bold text-sm md:text-base">Black</h3>
                    {game.moveList.map((move: string, index: number) => {
                        if (index % 2 === 1) return <li key={index}>{move}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}
