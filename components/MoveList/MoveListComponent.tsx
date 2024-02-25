import { useGameContext } from '@/context/GameContext'

interface MoveListProps {}

export default function MoveListComponent({}: MoveListProps) {
    const { game } = useGameContext()
    return (
        <div className="firstPart pr-4 w-1/2">
            <h2 className="text-sm md:text-2xl font-bold underline mb-2">History</h2>
            <div className="h-52 overflow-y-auto grid grid-cols-2 gap-4 mt-3">
                <div className="px-4">
                    <h3 className="font-bold text-sm md:text-base">White</h3>
                    <ul className="list-disc">
                        {game.moveList.map((move: string, index: number) => {
                            if (index % 2 === 0) return <li key={index}>{move}</li>
                        })}
                    </ul>
                </div>
                <div className="px-4">
                    <h3 className="font-bold text-sm md:text-base">Black</h3>
                    <ul className="list-disc">
                        {game.moveList.map((move: string, index: number) => {
                            if (index % 2 === 1) return <li key={index}>{move}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
