import { Card, Center, Group, Stack } from "@mantine/core";
import Square from "./Square";
import SiteBadge from "./SiteBadge";

export default function Board({
    board,
    currentTurn,
    status,
    winner,
    onPlay,
    isMyTurn,
    turnTime = true,
}: {
    board: ("X" | "O" | null)[];
    currentTurn: "X" | "O";
    status: "waiting" | "playing" | "finished";
    winner?: "X" | "O" | "draw";
    onPlay: (position: number) => void;
    isMyTurn: boolean;
    turnTime?: boolean;
}) {
    function handleClick(i: number) {
        if (!isMyTurn) return;
        if (status !== "playing") return;
        if (board[i]) return;
        if (winner) return;

        onPlay(i);
    }

    let statusText;

    if (status === "waiting") {
        statusText = "Esperando por el oponente...";
    } else if (winner) {
        statusText =
            winner === "draw"
                ? "Empate!"
                : `Ganador: ${winner}`;
    } else {
        statusText = `Turno: ${currentTurn}`;
    }

    return (
        <Stack>
            {turnTime && (
                <Center>
                    <SiteBadge text={statusText} />
                </Center>
            )}


            <Card radius="md" p="md" withBorder>
                <Stack align="center" gap="xs">
                    {[0, 3, 6].map((rowStart) => (
                        <Group key={rowStart}>
                            {[0, 1, 2].map((offset) => {
                                const i = rowStart + offset;
                                return (
                                    <Square
                                        key={i}
                                        value={board[i]}
                                        onSquareClick={() => handleClick(i)}
                                    />
                                );
                            })}
                        </Group>
                    ))}
                </Stack>
            </Card>
        </Stack>
    );
}