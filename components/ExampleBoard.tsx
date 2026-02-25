import { Box } from "@mantine/core";
import Board from "./Board";

export default function ExampleBoard({ style }: { style?: React.CSSProperties }) {
    return (
        <Box style={style}>
            <Board
                board={["X", null, "O", null, "X", null, "O", null, null]}
                currentTurn="X"
                status="playing"
                winner="X"
                onPlay={() => { }}
                isMyTurn={true}
                turnTime={false}
            />
        </Box>
    )
}