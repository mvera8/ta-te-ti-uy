import { Box } from "@mantine/core";
import Board from "./Board";

export default function ExampleBoard({ className }: { className?: string }) {
    return (
        <Box className={className}>
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