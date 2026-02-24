import { Button } from "@mantine/core";
import { IconX, IconCircle } from "@tabler/icons-react";

export default function Square({
    value,
    onSquareClick,
}: {
    value: string | null;
    onSquareClick: () => void;
}) {
    const color =
        value === "X"
            ? "grape"
            : value === "O"
                ? "cyan"
                : undefined;

    return (
        <Button
            variant="light"
            color={color ?? 'gray'}
            p={0}
            onClick={onSquareClick}
            size="lg"
            style={{
                width: "70px",
                height: "70px",
                border: `1px solid ${color ?? 'transparent'}`,
            }}
        >
            {value === "X" ? (
                <IconX size={40} stroke={3} />
            ) : value === "O" ? (
                <IconCircle size={36} stroke={3} />
            ) : null}
        </Button>
    );
}