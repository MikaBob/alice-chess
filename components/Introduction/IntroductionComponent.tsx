import Link from 'next/link'

interface IntroductionProps {}

export default function IntroductionComponent({}: IntroductionProps) {
    return (
        <div className="partDivider mt-2 ">
            <div className="firstPart">
                <h2 className="text-sm md:text-2xl font-bold underline mb-2">Rules</h2>
                <p>
                    Same as normal chess, except after a move the piece will pass to the 2nd board.
                    <br />A piece can not move on a tile when the opposite equivalent tile is not empty.
                    <br />
                    You can only take piece on the board the move starts.
                    <br />
                    Rules in details at{' '}
                    <Link className="text-secondary underline" href={'https://www.chessvariants.com/other.dir/alice.html'}>
                        chessvariants.com
                    </Link>
                </p>
            </div>
            <div className="secondPart">
                <h2 className="text-sm md:text-2xl font-bold underline mb-2">Gameplay</h2>
                <p>
                    When dragging a piece, green tiles are the possible moves.
                    <br /> The purple tile is where you are currently aiming. <br />
                    You can drag from one board and drop at the other board
                    <br />
                    If you can not make a move; either it is not your turn, or the move is not possible.
                </p>
            </div>
        </div>
    )
}
