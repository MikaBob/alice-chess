# Alice chess

Alice chess is a chess variant invented in 1953 by V. R. Parton which employs two chessboards rather than one.

Rules are the same as standard chess, with the particularity that at the completion of a move, transferring to the corresponding square on the opposite board.

1. A move must be legal on the board where it is played.

2. A piece can only move or capture if the corresponding destination square on the other board is vacant.

3. After moving, the piece is transfered to the corresponding square on the other board.

Wiki https://en.wikipedia.org/wiki/Alice_chess

Better rule explanation https://www.chessvariants.com/other.dir/alice.html

# Want to play ?

So far only local games available at the [GitHub page of the repo](https://mikabob.github.io/alice-chess/)

# Code explanation

All technical logic (i.e. is this move valid ?) resides in `src`, whereas all rendering logic (i.e. coloring squares depending on mouse activity) resides in `components`

Using Next.JS, so far only SSG, we have [components](https://github.com/MikaBob/alice-chess/tree/main/components) that render a "game".

A game is 2 boards and a move list.
Boards are made out of 8\*8 squares, each square have a color and potentially a piece.
Each piece type (Bishop, Knight, etc...) has different movement mechanic.

For the components, we have a similar structure. Board => Tiles (represent squares) => Piece (or not), with extra components like modal & console to interaction with the user.

The game is shared accross all components by using "context". The Drag and Drop of pieces is managed on the "store" level.

# Development progresion

-   To do

    -   Detect checkmates
    -   Animate moves
    -   Turn boards upside down
    -   En passant & Undo en passant
    -   Refactoring
        -   Interfaces for Pieces
        -   CallBackExecuteMove

-   Done
    -   ~~Display 1st boards with pieces~~
    -   ~~Drag and drop pieces~~
    -   ~~Eat pieces on drop~~
    -   ~~2nd board with change of board upon moves (alice moves)~~
    -   ~~Limit pieces to their movements~~
    -   ~~Previsualisation of possible moves~~
    -   ~~Prevent forbidden moves~~
    -   ~~Historic of moves~~
    -   ~~Castling~~
    -   ~~Promoting with a modal~~
    -   ~~Game over~~
    -   ~~Console~~
    -   ~~Undo move~~
    -   ~~Undo Promotion & Castling~~
    -   ~~Save game in LocalStorage~~
    -   ~~Reset boards~~
    -   ~~See other board's tile content in transparency~~
