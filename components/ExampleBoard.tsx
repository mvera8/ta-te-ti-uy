import Board from "./Board";

export default function ExampleBoard() {
    return (
        <Board
            board={["X", null, "O", null, "X", null, "O", null, null]}
            currentTurn="X"
            status="playing"
            winner="X"
            onPlay={() => { }}
            isMyTurn={true}
        />
    )
}